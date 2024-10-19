from ...utils.pre_process import extract_datassets_train_test
from ...Models.Models import *
import datetime
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
import os

class Predict:
    def __init__(self) -> None:
        len_treino, datasset, self.datasset_treino_features, self.datasset_treino_target, self.datasset_teste_features, self.datasset_teste_target  = extract_datassets_train_test()
        
        self.datas = datasset['Timer_day'][len_treino + 1:].reset_index(drop=True)
        self.modelo_arquivo = 'nvidia_tensorflow_deep/modelo/modelo.h5'
        self.modelo = load_model(self.modelo_arquivo)
    
    def get_relatorio_acuracia(self) -> TrainReportRegressor:
        predictions = self.modelo.predict(self.datasset_teste_features)
        mse = mean_squared_error(self.datasset_teste_target, predictions)
        mae = mean_absolute_error(self.datasset_teste_target, predictions)
        r2 = r2_score(self.datasset_teste_target, predictions)
        mape = np.mean(np.abs((self.datasset_teste_target - predictions) / self.datasset_teste_target)) * 100
        
        return TrainReportRegressor(mse=mse, mae=mae, r2=r2, mape=mape)

    def previsoes_user(self, predict: PredictNvidiaBody) -> PredictUser:
        limit_day = datetime.date(2024, 4, 24)
        sub = predict.date - limit_day
        print(sub.days)
        timer_day = 6117 + sub.days

        df_predict = pd.DataFrame([[predict.open, predict.high, predict.low, 
                                predict.adj_close, predict.volume, timer_day]])
        scaler = MinMaxScaler()
        features_scaled = scaler.fit_transform(df_predict)
        features_scaled = features_scaled.reshape(1, -1)
        predicts = self.modelo.predict(features_scaled)
        
        return PredictUser(predict=predicts[0][0]*1000)

    def previsoes_base(self):
        predictions = self.modelo.predict(self.datasset_teste_features)
        datasset_teste_target_values = self.datasset_teste_target.values  # Convertendo para array

        plt.figure(figsize=(12, 6))
        plt.plot(self.datas, datasset_teste_target_values, label='Real', marker='o')
        plt.plot(self.datas, predictions, label='Previsto', marker='x')
        plt.xticks(rotation=45)
        plt.title('Comparação entre valores reais e previstos')
        plt.xlabel('Data')
        plt.ylabel('Preço de Fechamento')
        plt.legend()
        plt.savefig('nvidia_tensorflow_deep/images/images_teste/previsao_nvidia.png', format='png',  dpi=300, bbox_inches='tight')

'''if __name__ == '__main__':
    model = Predict()
    model.previsoes_base()
    print(model.get_relatorio_acuracia())
    prev = PredictNvidiaBody(date=datetime.date(2024, 4, 25), open=839.500000, high=840.820007, low=791.830017, adj_close=796.770020, volume=50961600)
    print(model.previsoes_user(prev))'''



