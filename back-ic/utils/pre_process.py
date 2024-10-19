import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import numpy as np
def create_sequences(features, target, seq_length=10):
    x, y = [], []
    for i in range(len(features) - seq_length):
        x.append(features[i:i + seq_length])
        y.append(target.iloc[i + seq_length].values)  # Obtém o valor correspondente
    return np.array(x), np.array(y)

def extract_datassets_train_test_pytorch():
    nome_base_dados = 'database/NVIDIA/NVDA.csv'
    database_completa = pd.read_csv(nome_base_dados, sep=',')
    datasset = transform_colum_date_datasset(database_completa)

    total_datasset = len(datasset['Timer_day'])
    len_treino = round(0.8 * total_datasset)

    features = datasset[['Open', 'High', 'Low', 'Adj Close', 'Volume', 'Timer_day']].copy()
    target = datasset[['Close']].copy()
    timer_day = datasset['Timer_day'].values

    scaler = MinMaxScaler()
    features_scaled = scaler.fit_transform(features)

    # Criando janelas para treino e teste
    treino_feat, treino_tgt = create_sequences(features_scaled[:len_treino + 1], target[:len_treino + 1])
    teste_feat, teste_tgt = create_sequences(features_scaled[len_treino:], target[len_treino:])
    print(teste_feat)
    return len_treino, timer_day[len_treino + 10:], treino_feat, treino_tgt, teste_feat, teste_tgt

def transform_colum_date_datasset(datasset: pd.DataFrame):
    datasset_copy = datasset.copy()
    datasset_copy['Date'] = pd.to_datetime(datasset_copy['Date'])
    dates_idx = pd.DatetimeIndex(datasset_copy['Date'])
    idx = [i + 1 for i, d in enumerate(dates_idx)]
    datasset_copy['Timer_day'] = idx
    return datasset_copy

def extract_datassets_train_test():
    nome_base_dados = 'database/NVIDIA/NVDA.csv'
    database_completa = pd.read_csv(nome_base_dados, sep=',')
    datasset = transform_colum_date_datasset(database_completa)
    total_datasset = len(datasset['Timer_day'])
    len_treino = round(0.8*total_datasset)
    features = datasset[['Open', 'High', 'Low', 'Adj Close', 'Volume', 'Timer_day']].copy()
    target = datasset[['Close']].copy()
    scaler = MinMaxScaler()
    features_scaled = scaler.fit_transform(features)
    # Separar em treino e teste
    datasset_treino_features = features_scaled[:len_treino + 1].copy()
    datasset_treino_target = target[:len_treino + 1].copy()
    #Salvar Teste
    datasset_teste_features = features_scaled[len_treino + 1:].copy()
    datasset_teste_target = target[len_treino + 1:].copy()
    return len_treino, datasset, datasset_treino_features, datasset_treino_target, datasset_teste_features, datasset_teste_target