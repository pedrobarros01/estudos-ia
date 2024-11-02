from fastapi import APIRouter, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import StreamingResponse
from fastapi import FastAPI, File, UploadFile
from ...Models.Models import *
from ..cnn_classifier.predict import run
import os

router_cnn = APIRouter()

@router_cnn.post('/cnn_classifier_cat_lion_tiger/prever', status_code=201, tags=['cnn_classifier_cat_lion_tiger'])
async def predict(file: UploadFile):
    try:
        file_location = os.path.join('cnn_classifier_cat_lion_tiger/predict_imgs', file.filename)
        # Salva o arquivo na pasta especificada
        with open(file_location, "wb") as buffer:
            buffer.write(await file.read())
        prev = run('model.h5')
        return prev
    except Exception as e:
        return HTTPException(status_code=500, detail=e.__str__())
