import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import matplotlib.pyplot as plt
import joblib
from ...Models.Models import ResponseSystemFuzzy

def predict(temperature, humidity) -> ResponseSystemFuzzy:
    simulador_carregado = joblib.load('fuzzy_system_challenge/modelo/simulador_fuzzy.pkl')
    simulador_carregado.input['temperatura'] = temperature
    simulador_carregado.input['umidade'] = humidity
    simulador_carregado.compute()
    velocidade_predita = simulador_carregado.output['velocidade']
    return ResponseSystemFuzzy(velocity=velocidade_predita)