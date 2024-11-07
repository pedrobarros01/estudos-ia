import joblib
from sklearn.preprocessing import StandardScaler
import numpy as np
from ...Models.Models import ResultCMeans

def predict_user_cluster(total_price, quantity) -> ResultCMeans:
    # Carregar o modelo Fuzzy C-Means salvo
    model_path = "fuzzy_c_means_customer/modelo/best_fcm_model.joblib"
    fcm_model = joblib.load(model_path)

    # Carregar e aplicar o scaler usado anteriormente
    scaler_path = "fuzzy_c_means_customer/modelo/scaler.joblib"  # Supondo que o scaler foi salvo após o treinamento
    scaler = joblib.load(scaler_path)

    # Escalar os dados do usuário
    user_data = np.array([[total_price, quantity]])
    user_data_scaled = scaler.transform(user_data)

    # Prever o cluster do usuário
    user_cluster = fcm_model.predict(user_data_scaled)[0]

    # Definir a interpretação dos clusters
    if user_cluster == 1:
        cluster_description = "Cliente que pega e paga pouco"
    else:
        cluster_description = "Cliente que pega e paga muito"
    return ResultCMeans(cluster=user_cluster, tipo=cluster_description)

