import os
from PIL import Image
import numpy as np
from numpy.typing import NDArray
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import keras
from keras import layers
import matplotlib.pyplot as plt
import pandas as pd

from ..params import fine_tune_epochs, loss, fine_tune_num_layers


le = LabelEncoder()

def gerar_grafico(df: pd.DataFrame, x_label: str, y_label: str, title: str, nome_arq: str):
    df.plot()
    plt.title(title)
    plt.xlabel(x_label)
    plt.ylabel(y_label)
    plt.savefig(f'cnn_classifier_bird_drone/images/images_treino/{nome_arq}.png', format='png', dpi=300, bbox_inches='tight')
    plt.close()


def load_imgs_arr_labels(folder: str):
    imgs_arr = []
    for filename in os.listdir(folder):
        img_path = os.path.join(folder, filename)
        img = Image.open(img_path)
        imgs_arr.append(np.array(img))

    label = folder.split('/')[-1]
    return np.array(imgs_arr), np.array([label] * len(imgs_arr))


def run():
    print('Reading images...')
    imgs_arr: NDArray = None
    imgs_labels: NDArray = None
    for path in os.listdir('cnn_classifier_bird_drone/tmp/processed_imgs'):
        arr, labels = load_imgs_arr_labels(f'cnn_classifier_bird_drone/tmp/processed_imgs/{path}')
        if imgs_arr is None:
            imgs_arr, imgs_labels = arr, labels
        else:
            imgs_arr = np.concatenate([imgs_arr, arr])
            imgs_labels = np.concatenate([imgs_labels, labels])

    print('Encoding labels...')
    encoded_imgs_labels = le.fit_transform(imgs_labels)

    train_imgs_arr, test_imgs_arr, train_labels, test_labels = train_test_split(
        imgs_arr, encoded_imgs_labels, test_size=0.2)

    print('Creating model...')
    num_classes = len(os.listdir('cnn_classifier_bird_drone/imgs'))
    input_shape = train_imgs_arr.shape[1:]

    print('Loading model with ImageNet weights...')
    vgg16_conv_base = keras.applications.vgg16.VGG16(input_shape=input_shape,
                                                     # We will supply our own top.
                                                     include_top=False,
                                                     weights='imagenet',
                                                     )

    # Set all layers in the convolutional base to Trainable (will FREEZE initial layers further below).
    vgg16_conv_base.trainable = True

    # Specify the number of layers to fine tune at the end of the convolutional base.
    num_layers = len(vgg16_conv_base.layers)

    # Freeze the initial layers in the convolutional base.
    for model_layer in vgg16_conv_base.layers[:num_layers - fine_tune_num_layers]:
        model_layer.trainable = False

    inputs = keras.Input(shape=input_shape)

    x = keras.applications.vgg16.preprocess_input(inputs)

    x = vgg16_conv_base(x)

    x = layers.Dropout(0.2)(x)
    x = layers.Flatten()(x)
    x = layers.Dense(128, activation='relu')(x)

    # The final `Dense` layer with the number of classes.
    outputs = layers.Dense(num_classes, activation='softmax')(x)

    # The final model.
    model_vgg16_finetune = keras.Model(inputs, outputs)

    model_vgg16_finetune.compile(optimizer=keras.optimizers.Adam(
        learning_rate=0.0001), loss=loss, metrics=['accuracy'])

    print('Training model...')
    history = model_vgg16_finetune.fit(
        train_imgs_arr, train_labels, epochs=fine_tune_epochs, validation_split=0.2)

    _, test_acc = model_vgg16_finetune.evaluate(test_imgs_arr, test_labels)
    print('\nTest accuracy:', test_acc)
    # Extrair apenas as métricas de acurácia e perda do histórico de treinamento
    df_treino_desempenho = pd.DataFrame(history.history)

    # Gráfico da perda
    df_loss = df_treino_desempenho[['loss', 'val_loss']]
    gerar_grafico(df_loss, 'Época', 'Perda', 'Perda do modelo', 'loss_cnn_classifier_bird_drone')

    # Gráfico da acurácia
    df_accuracy = df_treino_desempenho[['accuracy', 'val_accuracy']]
    gerar_grafico(df_accuracy, 'Época', 'Acurácia', 'Acurácia do modelo', 'accuracy_cnn_classifier_bird_drone')
    print('Exporting model...')
    model_vgg16_finetune.save('cnn_classifier_bird_drone/tmp/fine_tunel_model.keras')




if __name__ == '__main__':
    run()