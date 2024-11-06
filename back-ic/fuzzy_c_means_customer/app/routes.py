from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import ResultKmeans, PredictCMeans, ResultCMeans
from .predict import predict_user_cluster
import json
router_fuzzy_cmeans = APIRouter()

@router_fuzzy_cmeans.get('/c_means_customer/get-desempenho-treino', status_code=200, tags=['c_means_customer'])
async def get_desempenho() -> ResultKmeans:
    try:
        with open("fuzzy_c_means_customer/modelo/best_k_and_silhouette_fcm.json", "r") as json_file:
            metrics = json.load(json_file)
        return ResultKmeans(**metrics)
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())
    


@router_fuzzy_cmeans.post('/c_means_customer/prever', status_code=201, tags=['c_means_customer'])
async def predict(user_prev: PredictCMeans) -> ResultCMeans:
    try:
        
        prev = predict_user_cluster(user_prev.total_price, user_prev.quantity)
        return prev
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())
