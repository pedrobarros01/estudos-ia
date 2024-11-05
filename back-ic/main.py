from fastapi import FastAPI
from .nvidia_tensorflow_deep.app.routes import router_tensorflow
from .nvidia_pytorch_deep.app.routes import router_pytorch
from .cnn_classifier_cat_lion_tiger.app.routes import router_cnn
from .k_means_country.app.routes import router_kmeans
from .fuzzy_c_means_customer.app.routes import router_fuzzy_cmeans
from .kohonen_iris.app.routes import router_kohonen_iris
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware


api = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
api.include_router(router_kohonen_iris)
api.include_router(router_fuzzy_cmeans)
api.include_router(router_kmeans)
api.include_router(router_cnn)
api.include_router(router_tensorflow)
api.include_router(router_pytorch)

api.mount('/kohonen_iris/images_treino', StaticFiles(directory='kohonen_iris/images/images_treino'), name='kohonen_iris')
api.mount('/c_means_customer/images_treino', StaticFiles(directory='fuzzy_c_means_customer/images/images_treino'), name='c_means_customer_images')
api.mount('/k_means_country/images_treino', StaticFiles(directory='k_means_country/images/images_treino'), name='k_means_country_images')
api.mount('/cnn_classifier_cat_lion_tiger/images_treino', StaticFiles(directory='cnn_classifier_cat_lion_tiger/images/images_treino'), name='cnn_classifier_cat_lion_tiger_images')
api.mount('/nvidia_tensorflow_deep/images_treino', StaticFiles(directory='nvidia_tensorflow_deep/images/images_treino'), name='nvidia_tensorflow_deep_images')
api.mount('/nvidia_pytorch_deep/images_treino', StaticFiles(directory='nvidia_pytorch_deep/images/images_treino'), name='nvidia_pytorch_deep_images')
@api.get('/')
async def hello():
    return {'mensagem':"Ola"}
