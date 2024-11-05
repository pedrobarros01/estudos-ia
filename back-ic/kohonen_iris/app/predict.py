import numpy as np
import matplotlib.pyplot as plt
from minisom import MiniSom
from sklearn.datasets import load_iris
from sklearn.preprocessing import MinMaxScaler
import joblib
from ...Models.Models import BodyIris


def predict(data: BodyIris):
    # Carregar o scaler
    scaler = joblib.load('kohonen_iris/modelo/scaler.joblib')

    # Carregar o modelo SOM
    som = joblib.load('kohonen_iris/modelo/som_model.joblib')

    featured_scaler = scaler.transform(np.array([data.sepal_length, data.sepal_width, data.petal_length, data.petal_width]).reshape(1, -1))

    winner = som.winner(featured_scaler[0])

    data = load_iris()
    X = data.data
    y = data.target
    labels = data.target_names

    scaler_aux = MinMaxScaler()
    X_scaled = scaler_aux.fit_transform(X)
    colors = ['r', 'g', 'b']  # Cores para cada classe
    markers = ['o', 's', 'D']  # Formatos para cada classe

    plt.figure(figsize=(10, 10))
    for i, x in enumerate(X_scaled):
        winner_aux = som.winner(x)  # Encontra o neurônio vencedor
        plt.plot(winner_aux[0] + 0.5, winner_aux[1] + 0.5,
                marker=markers[y[i]],
                markerfacecolor='None',
                markeredgecolor=colors[y[i]],
                markersize=12,
                markeredgewidth=2)
    plt.plot(winner[0] + 0.5, winner[1] + 0.5,
             marker='X', color='black', markersize=18, label='Nova Amostra')

    plt.grid()
    plt.title("Self-Organizing Map (SOM)")
    plt.legend(loc='upper right')
    plt.savefig('kohonen_iris/images/images_teste/map_kohonen_com_predicao.png', format='png', dpi=300, bbox_inches='tight')