from ..utils.pre_process import transform_colum_date_datasset
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt
import os
class Model:
    def __init__(self) -> None:
        self.nome_base_dados = 'database/NVIDIA/NVDA.csv'
        database_completa = pd.read_csv(self.nome_base_dados, sep=',')
        datasset = transform_colum_date_datasset(database_completa)
        total_datasset = len(datasset['Timer_day'])
        print(total_datasset)
        len_treino = round(0.8*total_datasset)
        features = datasset[['Open', 'High', 'Low', 'Adj Close', 'Volume', 'Timer_day']].copy()
        target = datasset[['Close']].copy()
        scaler = MinMaxScaler()
        features_scaled = scaler.fit_transform(features)
        # Separar em treino e teste
        self.datasset_treino_features = features_scaled[:len_treino + 1].copy()
        self.datasset_treino_target = target[:len_treino + 1].copy()
        #Salvar Teste
        self.datasset_teste_features = features_scaled[len_treino + 1:].copy()
        datasset_teste_features_df = pd.DataFrame(self.datasset_teste_features, columns=['Open', 'High', 'Low', 'Adj Close', 'Volume', 'Timer_day'])
        self.datasset_teste_target = target[len_treino + 1:].copy()

        if not os.path.exists('database/NVIDIA/teste.csv'):
            df_teste = pd.concat([datasset_teste_features_df, self.datasset_teste_target], axis=1)
            df_teste.to_csv('database/NVIDIA/teste.csv', index=False)

    def __gerar_grafico(self, df: pd.DataFrame, x_label: str, y_label: str, title: str, nome_arq: str):
        df.plot()
        plt.title(nome_arq)
        plt.xlabel(x_label)
        plt.ylabel(y_label)
        plt.savefig(f'nvidia-tensorflow-deep/images/images_treino/{nome_arq}.png', format='png', dpi=300, bbox_inches='tight')
        plt.close()
        
    def train(self):
        model = Sequential()
        model.add(Dense(264, activation='relu', input_shape=(self.datasset_treino_features.shape[1],)))
        model.add(Dropout(0.3))
        model.add(Dense(128, activation='relu'))
        model.add(Dropout(0.2))
        model.add(Dense(1, activation='linear'))

        model.compile(optimizer='rmsprop', loss='mean_squared_error', metrics=['mse', 'mae'])
        history = model.fit(self.datasset_treino_features, self.datasset_treino_target, epochs=50, batch_size=32, validation_split=0.2)
        results = model.evaluate(self.datasset_teste_features, self.datasset_teste_target)
        df_treino_desempenho = pd.DataFrame(history.history)
        df_loss = df_treino_desempenho[['loss', 'val_loss']]
        self.__gerar_grafico(df_loss, 'Época', 'Perda', 'Perda do modelo', 'perda_nvidia_tensorflow')
        df_mae = df_treino_desempenho[['mae', 'val_mae']]
        self.__gerar_grafico(df_mae, 'Época', 'MAE', 'MAE do modelo', 'mae_nvidia_tensorflow')
        df_mse = df_treino_desempenho[['mse', 'val_mse']]
        self.__gerar_grafico(df_mse, 'Época', 'MSE', 'MSE do modelo', 'mse_nvidia_tensorflow')
        model.save('nvidia-tensorflow-deep/modelo/modelo.h5')

    
if __name__ == '__main__':
    model = Model()
    model.train()
    #loss: 5.5880 - mae: 1.7931 - mse: 5.5880 - val_loss: 1136.1262 - val_mae: 27.5228 - val_mse: 1136.1262