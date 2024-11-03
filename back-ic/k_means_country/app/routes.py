from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import ResultKmeans
import json
router_kmeans = APIRouter()

@router_kmeans.get('/k_means_country/get-desempenho-treino', status_code=200, tags=['k_means_country'])
async def get_desempenho() -> ResultKmeans:
    try:
        with open("k_means_country/modelo/best_k_and_silhouette.json", "r") as json_file:
            metrics = json.load(json_file)
        return ResultKmeans(**metrics)
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())
