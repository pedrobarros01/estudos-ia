from fastapi import FastAPI
from .nvidia_tensorflow_deep.app.routes import router_tensorflow
from .nvidia_pytorch_deep.app.routes import router_pytorch
from fastapi.staticfiles import StaticFiles
api = FastAPI()
api.include_router(router_tensorflow)
api.include_router(router_pytorch)
api.mount('/nvidia_tensorflow_deep/images_treino', StaticFiles(directory='nvidia_tensorflow_deep/images/images_treino'), name='nvidia_tensorflow_deep_images')
api.mount('/nvidia_pytorch_deep/images_treino', StaticFiles(directory='nvidia_pytorch_deep/images/images_treino'), name='nvidia_pytorch_deep_images')
@api.get('/')
async def hello():
    return {'mensagem':"Ola"}
