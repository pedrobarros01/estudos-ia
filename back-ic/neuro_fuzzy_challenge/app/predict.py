import numpy as np
import matplotlib.pyplot as plt
import joblib
from ...Models.Models import ResponseSystemFuzzy
from .train import ANFIS
import json

# Função de predição usando o modelo e parâmetros de normalização salvos
def predict(temperatura, umidade) -> ResponseSystemFuzzy:
    # Carregar o modelo e os parâmetros de normalização
    with open("neuro_fuzzy_challenge/modelo/anfis_parameters.json", "r") as json_file:
        params = json.load(json_file)

    with open("neuro_fuzzy_challenge/modelo/normalization_params.json", "r") as json_file:
        normalization_params = json.load(json_file)

    anfis = ANFIS(n_inputs=2, n_rules=3)
    anfis.set_parameters(params)
    # Normalizar as entradas usando os parâmetros salvos
    temperatura_norm = (temperatura - normalization_params["X_min"][0]) / (normalization_params["X_max"][0] - normalization_params["X_min"][0])
    umidade_norm = (umidade - normalization_params["X_min"][1]) / (normalization_params["X_max"][1] - normalization_params["X_min"][1])
    
    # Formatar as entradas como vetor
    X_new = np.array([[temperatura_norm, umidade_norm]])
    
    # Fazer a predição
    velocidade_predita_norm, _ = anfis.forward(X_new)
    
    # Desnormalizar a saída
    velocidade_predita = velocidade_predita_norm[0] * (normalization_params["y_max"] - normalization_params["y_min"]) + normalization_params["y_min"]
    return ResponseSystemFuzzy(velocity=velocidade_predita)