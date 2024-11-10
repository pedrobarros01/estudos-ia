import os
from PIL import Image
from ..params import img_size, color_mode
from .utils import clear_folder


def preprocess_imgs(src: str, dest: str):
    for filename in os.listdir(src):
        if filename.endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
            img_path = os.path.join(src, filename)
            with Image.open(img_path) as img:
                img = img.convert(color_mode)
                img = img.resize((img_size, img_size))

                output_path = os.path.join(
                    dest, f'{os.path.splitext(filename)[0]}.jpg')

                img.save(output_path, 'JPEG')


def run():
    clear_folder('cnn_classifier_bird_drone/tmp')

    os.mkdir('cnn_classifier_bird_drone/tmp/processed_imgs')
    for folder in os.listdir('cnn_classifier_bird_drone/imgs'):
        os.mkdir(f'cnn_classifier_bird_drone/tmp/processed_imgs/{folder}')
        preprocess_imgs(f'cnn_classifier_bird_drone/imgs/{folder}', f'cnn_classifier_bird_drone/tmp/processed_imgs/{folder}')



if __name__ == '__main__':
    run()
