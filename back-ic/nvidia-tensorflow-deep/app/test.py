from ..utils.pre_process import transform_colum_date_datasset
from Models.TrainReportRegressor import TrainReportRegressor
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
        self.nome_base_dados = 'database/NVIDIA/NVDA.csv'
        database_completa = pd.read_csv(self.nome_base_dados, sep=',')
        datasset = transform_colum_date_datasset(database_completa)
        total_datasset = len(datasset['Timer_day'])
        len_treino = round(0.8*total_datasset)

        self.datas = datasset['Timer_day'][len_treino + 1:].reset_index(drop=True)
        self.modelo_arquivo = 'nvidia-tensorflow-deep/modelo/modelo.h5'
        features = datasset[['Open', 'High', 'Low', 'Adj Close', 'Volume', 'Timer_day']].copy()
        target = datasset[['Close']].copy()
        scaler = MinMaxScaler()
        features_scaled = scaler.fit_transform(features)
        # Separar em treino e teste
        self.datasset_treino_features = features_scaled[:len_treino + 1].copy()
        self.datasset_treino_target = target[:len_treino + 1].copy()
        #Salvar Teste
        self.datasset_teste_features = features_scaled[len_treino + 1:].copy()
        self.datasset_teste_target = target[len_treino + 1:].copy()
        self.modelo = load_model(self.modelo_arquivo)
    
    def get_relatorio_acuracia(self) -> TrainReportRegressor:
        predictions = self.modelo.predict(self.datasset_teste_features)
        mse = mean_squared_error(self.datasset_teste_target, predictions)
        mae = mean_absolute_error(self.datasset_teste_target, predictions)
        r2 = r2_score(self.datasset_teste_target, predictions)
        mape = np.mean(np.abs((self.datasset_teste_target - predictions) / self.datasset_teste_target)) * 100
        return TrainReportRegressor(mse=mse, mae=mae, r2=r2, mape=mape)

    def predict_user(self):
        pass

    def previsoes_base(self):
        predictions = self.modelo.predict(self.datasset_teste_features)
        datasset_teste_target_values = self.datasset_teste_target.values  # Convertendo para array
        print(len(predictions))

        plt.figure(figsize=(12, 6))
        plt.plot(self.datas, datasset_teste_target_values, label='Real', marker='o')
        plt.plot(self.datas, predictions, label='Previsto', marker='x')
        plt.xticks(rotation=45)
        plt.title('Comparação entre valores reais e previstos')
        plt.xlabel('Data')
        plt.ylabel('Preço de Fechamento')
        plt.legend()
        plt.savefig('nvidia-tensorflow-deep/images/images_teste/previsao_nvidia.png', format='png',  dpi=300, bbox_inches='tight')

if __name__ == '__main__':
    model = Predict()
    model.previsoes_base()
    print(model.get_relatorio_acuracia().r2)



