from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import BodySystemFuzzy, ResponseSystemFuzzy, PerfomanceNeuroFuzzy
from .predict import predict
import json

router_neuro_fuzzy = APIRouter()

@router_neuro_fuzzy.get('/neuro_fuzzy_challenge/get-desempenho-treino', status_code=200, tags=['neuro_fuzzy_challenge'])
async def get_desempenho() -> PerfomanceNeuroFuzzy:
    try:
        with open("neuro_fuzzy_challenge/modelo/training_metrics.json", "r") as json_file:
            metrics = json.load(json_file)
        return PerfomanceNeuroFuzzy(**metrics)
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())


@router_neuro_fuzzy.post('/neuro_fuzzy_challenge/prever', status_code=201, tags=['neuro_fuzzy_challenge'])
async def predizer(user_prev: BodySystemFuzzy) -> ResponseSystemFuzzy:
    try:
        prev = predict(user_prev.temperature, user_prev.humidity)
        return prev
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())