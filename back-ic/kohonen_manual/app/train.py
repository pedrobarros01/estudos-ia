import pandas as pd
import numpy as np
import matplotlib.pyplot as plt



def train():
    # Dados sobre qualidade de vinhos
    df = pd.read_csv('kohonen_manual/app/WineQT.csv')
    X = df.drop(['quality', 'Id'], axis=1).values  # Remover a coluna 'quality' e 'Id' de X
    y = df['quality'].values

    X_min = X.min(axis=0)
    X_max = X.max(axis=0)
    X_scaled = (X - X_min) / (X_max - X_min)


    grid_x, grid_y = 8, 8  # Tamanho do mapa SOM
    input_len = X_scaled.shape[1]
    sigma = 1.0  # Raio de vizinhança
    learning_rate = 0.5  # Taxa de aprendizado
    num_iterations = 50


    weights = np.random.rand(grid_x, grid_y, input_len)
    def euclidean_distance(a, b):
        return np.sqrt(np.sum((a - b) ** 2))

    def find_bmu(x):
        bmu_idx = np.argmin([[euclidean_distance(x, weights[i, j]) for j in range(grid_y)] for i in range(grid_x)])
        return divmod(bmu_idx, grid_y)
    
    def update_weights(x, bmu, iteration, num_iterations):
        learning_decay = learning_rate * (1 - iteration / num_iterations)
        sigma_decay = sigma * (1 - iteration / num_iterations)

        for i in range(grid_x):
            for j in range(grid_y):
                neuron_distance = euclidean_distance(np.array([i, j]), np.array(bmu))
                if neuron_distance <= sigma_decay:
                    influence = np.exp(-neuron_distance**2 / (2 * sigma_decay**2))
                    weights[i, j] += learning_decay * influence * (x - weights[i, j])
    
    for iteration in range(num_iterations):
        for sample in X_scaled:
            bmu = find_bmu(sample)
            update_weights(sample, bmu, iteration, num_iterations)

    colors = plt.cm.tab10(np.linspace(0, 1, 11))

    plt.figure(figsize=(8, 8))

    for i, sample in enumerate(X_scaled):
        bmu = find_bmu(sample)
        plt.plot(bmu[1] + 0.5, bmu[0] + 0.5, marker='o', markerfacecolor='None',
                markeredgecolor=colors[y[i]], markersize=8, markeredgewidth=2)

    plt.xticks(np.arange(grid_x + 1))
    plt.yticks(np.arange(grid_y + 1))
    plt.grid(True)
    plt.savefig(f'kohonen_manual/images/images_treino/map_kohonen_manual.png', format='png', dpi=300, bbox_inches='tight')
    plt.show()

if __name__ == '__main__':
    train()
