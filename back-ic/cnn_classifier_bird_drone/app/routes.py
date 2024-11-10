from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, File, UploadFile
from ...Models.Models import *
from ..cnn_classifier.predict import run
import os

router_cnn_bird = APIRouter()

@router_cnn_bird.post('/cnn_classifier_bird_drone/prever', status_code=201, tags=['cnn_classifier_bird_drone'])
async def predict(file: UploadFile):
    try:
        file_location = os.path.join('cnn_classifier_bird_drone/predict_imgs', file.filename)
        # Salva o arquivo na pasta especificada
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
        prev = run('fine_tunel_model.keras')
        return prev
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())