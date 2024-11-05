import numpy as np
import matplotlib.pyplot as plt
from minisom import MiniSom
from sklearn.datasets import load_iris
from sklearn.preprocessing import MinMaxScaler
import joblib

def train():
    data = load_iris()
    X = data.data
    y = data.target
    labels = data.target_names
    print('a')
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)

    som = MiniSom(x=8, y=8, input_len=X_scaled.shape[1], sigma=1.0, learning_rate=0.5)
    som.random_weights_init(X_scaled)  # Inicializa pesos

    num_iterations = 100
    som.train_random(X_scaled, num_iterations)

    colors = ['r', 'g', 'b']  # Cores para cada classe
    markers = ['o', 's', 'D']  # Formatos para cada classe

    plt.figure(figsize=(10, 10))
    for i, x in enumerate(X_scaled):
        winner = som.winner(x)  # Encontra o neurônio vencedor
        plt.plot(winner[0] + 0.5, winner[1] + 0.5,
                marker=markers[y[i]],
                markerfacecolor='None',
                markeredgecolor=colors[y[i]],
                markersize=12,
                markeredgewidth=2)

    plt.xticks(np.arange(8))
    plt.yticks(np.arange(8))
    plt.grid()
    plt.title("Self-Organizing Map (SOM)")
    plt.savefig(f'kohonen_iris/images/images_treino/map_kohonen.png', format='png', dpi=300, bbox_inches='tight')
    joblib.dump(som, 'kohonen_iris/modelo/som_model.joblib')
    joblib.dump(scaler, 'kohonen_iris/modelo/scaler.joblib')



if __name__ == '__main__':
    train()
