import os
from PIL import Image
import numpy as np
from numpy.typing import NDArray
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from keras import layers, models
import matplotlib.pyplot as plt
import pandas as pd

from params import epochs, optimizer, loss


le = LabelEncoder()

def gerar_grafico(df: pd.DataFrame, x_label: str, y_label: str, title: str, nome_arq: str):
    df.plot()
    plt.title(title)
    plt.xlabel(x_label)
    plt.ylabel(y_label)
    plt.savefig(f'images/images_treino/{nome_arq}.png', format='png', dpi=300, bbox_inches='tight')
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
    for path in os.listdir('tmp/processed_imgs'):
        arr, labels = load_imgs_arr_labels(f'tmp/processed_imgs/{path}')
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
    num_classes = len(os.listdir('imgs'))
    input_shape = train_imgs_arr.shape[1:]
    model = models.Sequential()

    model.add(layers.Rescaling(1. / 255, input_shape=input_shape))
    data_augmentation = models.Sequential(
        [
            layers.RandomFlip("horizontal"),
            layers.RandomRotation(0.1),
            layers.RandomZoom(0.1),
        ]
    )
    model.add(data_augmentation)

    # Camadas de convolução
    model.add(layers.Conv2D(16, 3, activation='relu'))
    model.add(layers.MaxPooling2D())
    model.add(layers.Conv2D(32, 3, activation='relu'))
    model.add(layers.MaxPooling2D())
    model.add(layers.Conv2D(64, 3, activation='relu'))
    model.add(layers.MaxPooling2D())

    model.add(layers.Dropout(0.2))
    # Linearização de array de output
    model.add(layers.Flatten())
    # Camadas finais densas
    model.add(layers.Dense(128, activation='relu'))
    model.add(layers.Dense(num_classes, activation='softmax'))

    model.compile(optimizer=optimizer, loss=loss, metrics=['accuracy'])

    print('Training model...')
    history = model.fit(train_imgs_arr, train_labels, epochs=epochs, validation_split=0.2)

    # Avaliação final do modelo no conjunto de teste
    _, test_acc = model.evaluate(test_imgs_arr, test_labels)
    print('\nTest accuracy:', test_acc)

    # Extrair apenas as métricas de acurácia e perda do histórico de treinamento
    df_treino_desempenho = pd.DataFrame(history.history)

    # Gráfico da perda
    df_loss = df_treino_desempenho[['loss', 'val_loss']]
    gerar_grafico(df_loss, 'Época', 'Perda', 'Perda do modelo', 'loss_cnn_classifier')

    # Gráfico da acurácia
    df_accuracy = df_treino_desempenho[['accuracy', 'val_accuracy']]
    gerar_grafico(df_accuracy, 'Época', 'Acurácia', 'Acurácia do modelo', 'accuracy_cnn_classifier')
    print('Exporting model...')
    model.save('tmp/model.h5')



if __name__ == '__main__':
    run()
