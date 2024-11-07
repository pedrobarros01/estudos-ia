from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import BodySystemFuzzy, ResponseSystemFuzzy
from .predict import predict

router_fuzzy_system = APIRouter()

@router_fuzzy_system.post('/fuzzy_system_challenge/prever', status_code=201, tags=['fuzzy_system_challenge'])
async def predizer(user_prev: BodySystemFuzzy) -> ResponseSystemFuzzy:
    try:
        prev = predict(user_prev.temperature, user_prev.humidity)
        return prev
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())