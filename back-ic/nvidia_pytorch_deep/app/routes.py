from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import *
from .predict import PredictTorch
router_pytorch = APIRouter()


@router_pytorch.get('/nvidia_pytorch_deep/get-desempenho-treino', status_code=200, tags=['nvidia_pytorch_deep'])
async def get_desempenho() -> TrainReportRegressor:
    try:
        prev = PredictTorch()
        desempenho = prev.get_relatorio_acuracia()
        return desempenho
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())

@router_pytorch.post('/nvidia_pytorch_deep/prever', status_code=201, tags=['nvidia_pytorch_deep'])
async def predict(user_prev: PredictNvidiaBody) -> PredictUser:
    try:
        prev = PredictTorch()
        previsao = prev.previsoes_user(user_prev)
        return previsao
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())

@router_pytorch.get('/nvidia_pytorch_deep/previsao-base', tags=['nvidia_pytorch_deep'])
async def predict_base():
    try:
        prev = PredictTorch()
        prev.previsoes_base()
        path_image = 'nvidia_pytorch_deep/images/images_teste/previsao_nvidia.png'
        def iterfile():
            with open(path_image, mode="rb") as file:
                yield from file  # Lê o arquivo em pedaços
        
        return StreamingResponse(iterfile(), media_type="image/png")
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())
    
