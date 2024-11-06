from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from ...Models.Models import BodyIris
from .predict import predict
import json
router_kohonen_iris = APIRouter()

@router_kohonen_iris.post('/router_kohonen_iris/prever', status_code=201, tags=['router_kohonen_iris'])
async def prever(data: BodyIris):
    try:
        print(data)
        predict(data)
        path_image = 'kohonen_iris/images/images_teste/map_kohonen_com_predicao.png'
        def iterfile():
            with open(path_image, mode="rb") as file:
                yield from file  # Lê o arquivo em pedaços
        
        return StreamingResponse(iterfile(), media_type="image/png")
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())