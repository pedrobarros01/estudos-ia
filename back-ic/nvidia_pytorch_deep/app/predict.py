import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
from utils.pre_process import extract_datassets_train_test_pytorch
from Models.Models import *
import datetime
import pandas as pd
import numpy as np
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from .torch_model import PredictorModel
class PredictTorch:
    def __init__(self) -> None:
        len_treino, self.datas, self.datasset_treino_features, self.datasset_treino_target, \
        self.datasset_teste_features, self.datasset_teste_target = extract_datassets_train_test_pytorch()
        # Certifique-se de que o tamanho está correto
        print(f"Tamanho do conjunto de treino: {len(self.datasset_treino_features)}")
        print(f"Tamanho do conjunto de teste: {len(self.datasset_teste_features)}")
        
        print(f'len de daatas: {len(self.datas)}')
        self.modelo_arquivo = 'nvidia_pytorch_deep/modelo/modelo_torch.pth'
        
        # Carregando o modelo PyTorch
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.modelo = PredictorModel()
        state_dict = torch.load(self.modelo_arquivo)
        self.modelo.load_state_dict(state_dict)
        self.modelo.eval()  # Colocar o modelo em modo de avaliação

    def get_relatorio_acuracia(self) -> TrainReportRegressor:
        predictions = self._predict(self.datasset_teste_features)
        mse = mean_squared_error(self.datasset_teste_target, predictions)
        mae = mean_absolute_error(self.datasset_teste_target, predictions)
        r2 = r2_score(self.datasset_teste_target, predictions)
        mape = np.mean(np.abs((self.datasset_teste_target - predictions) / self.datasset_teste_target)) * 100

        return TrainReportRegressor(mse=mse, mae=mae, r2=r2, mape=mape)

    def _predict(self, features):
        """Executa a inferência no modelo PyTorch."""
        with torch.no_grad():
            features_tensor = torch.tensor(features, dtype=torch.float32).to(self.device)
            
            # Certifique-se de que as dimensões estão corretas
            if features_tensor.dim() == 2:  # Se for (batch_size, input_size)
                features_tensor = features_tensor.unsqueeze(0)  # Adiciona a dimensão seq_len

            output = self.modelo(features_tensor)
        return output.cpu().numpy()


    def previsoes_user(self, predict: PredictNvidiaBody) -> PredictUser:
        limit_day = datetime.date(2024, 4, 24)
        sub = predict.date - limit_day
        timer_day = 6117 + sub.days

        # Preparar entrada do usuário para previsão
        df_predict = pd.DataFrame([[predict.open, predict.high, predict.low, 
                                    predict.adj_close, predict.volume, timer_day]])
        scaler = MinMaxScaler()
        features_scaled = scaler.fit_transform(df_predict)
        features_scaled = features_scaled.reshape(1, -1)

        # Previsão usando PyTorch
        predicts = self._predict(features_scaled)
        return PredictUser(predict=predicts[0][0] * 1000)

    def previsoes_base(self):
        predictions = self._predict(self.datasset_teste_features)

        # Certifique-se de que predictions seja um vetor 1D
        predictions = predictions.flatten()  # Ou use predictions.ravel()
        
        # Verifique se o tamanho das previsões e dos dados é igual
        if len(self.datas) != len(predictions):
            raise ValueError(f"Tamanhos incompatíveis: datas {len(self.datas)}, previsões {len(predictions)}")

        plt.figure(figsize=(12, 6))
        plt.plot(self.datas, self.datasset_teste_target, label='Real', marker='o')
        plt.plot(self.datas, predictions, label='Previsto', marker='x')
        plt.xticks(rotation=45)
        plt.title('Comparação entre valores reais e previstos')
        plt.xlabel('Data')
        plt.ylabel('Preço de Fechamento')
        plt.legend()
        plt.savefig('nvidia_pytorch_deep/images/images_teste/previsao_nvidia.png', format='png', dpi=300, bbox_inches='tight')
# Exemplo de uso
if __name__ == '__main__':
    model = PredictTorch()
    model.previsoes_base()
    print(model.get_relatorio_acuracia())
    prev = PredictNvidiaBody(date=datetime.date(2024, 4, 25), open=839.500000, high=840.820007, 
                             low=791.830017, adj_close=796.770020, volume=50961600)
    print(model.previsoes_user(prev))
