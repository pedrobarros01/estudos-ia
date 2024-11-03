from pydantic import BaseModel
import datetime

class PredictNvidiaBody(BaseModel):
    date: datetime.date
    open: float
    high: float
    low: float
    adj_close: float
    volume: float

class TrainReportRegressor(BaseModel):
    mse: float
    mae: float
    r2: float
    mape: float

class PredictUser(BaseModel):
    predict: float


class PredictCNNClassifier(BaseModel):
    filename: str
    predict: str
    percent_predict: float

class ResultKmeans(BaseModel):
    best_k: float
    best_silhouette_score: float

