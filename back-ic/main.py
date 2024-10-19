from fastapi import FastAPI
from .nvidia_tensorflow_deep.app.routes import router_tensorflow
from fastapi.staticfiles import StaticFiles
api = FastAPI()
api.include_router(router_tensorflow)
api.mount('/nvidia_tensorflow_deep/images_treino', StaticFiles(directory='nvidia_tensorflow_deep/images/images_treino'), name='nvidia_tensorflow_deep_images')
@api.get('/')
async def hello():
    return {'mensagem':"Ola"}
