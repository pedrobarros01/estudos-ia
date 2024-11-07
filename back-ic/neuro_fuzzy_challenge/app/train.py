import numpy as np
import matplotlib.pyplot as plt
import joblib
import json

class ANFIS:
    def __init__(self, n_inputs, n_rules, learning_rate=0.01):  # Taxa de aprendizado menor
        self.n_inputs = n_inputs
        self.n_rules = n_rules
        self.learning_rate = learning_rate
        self.fuzzy_learning_rate = 0.001  # Taxa de aprendizado separada para funções de pertinência

        # Inicializar parâmetros fuzzy (médias e desvios padrão para funções de pertinência)
        self.means = np.random.uniform(0.25, 0.75, (n_inputs, n_rules))
        self.sigmas = np.random.uniform(0.1, 0.3, (n_inputs, n_rules))

        # Inicializar pesos com valores pequenos para evitar explosão
        self.weights = np.random.uniform(-0.1, 0.1, n_rules)

    def gaussian_membership(self, x, mean, sigma):
        return np.exp(-0.5 * ((x - mean) / sigma) ** 2)

    def forward(self, X):
        memberships = np.ones((X.shape[0], self.n_rules))
        for i in range(self.n_inputs):
            for j in range(self.n_rules):
                memberships[:, j] *= self.gaussian_membership(X[:, i], self.means[i, j], self.sigmas[i, j])

        memberships_sum = memberships.sum(axis=1, keepdims=True)
        memberships_sum[memberships_sum == 0] = 1  # Evitar divisão por zero
        firing_strengths = memberships / memberships_sum

        # Saída ponderada
        output = np.dot(firing_strengths, self.weights)
        return output, firing_strengths

    def train(self, X, y, epochs=100):
        for epoch in range(epochs):
            outputs, firing_strengths = self.forward(X)
            errors = y - outputs

            # Atualização dos pesos e parâmetros fuzzy
            for j in range(self.n_rules):
                self.weights[j] += self.learning_rate * np.dot(errors, firing_strengths[:, j])
                self.weights[j] = np.clip(self.weights[j], -1, 1)  # Limitar peso para evitar crescimento excessivo

                for i in range(self.n_inputs):
                    grad_mean = (errors * self.weights[j] * firing_strengths[:, j] * (X[:, i] - self.means[i, j]) / (self.sigmas[i, j] ** 2)).mean()
                    grad_sigma = (errors * self.weights[j] * firing_strengths[:, j] * ((X[:, i] - self.means[i, j]) ** 2 - self.sigmas[i, j] ** 2) / (self.sigmas[i, j] ** 3)).mean()

                    # Atualizar mean e sigma com uma taxa de aprendizado menor
                    self.means[i, j] += self.fuzzy_learning_rate * grad_mean
                    self.sigmas[i, j] += self.fuzzy_learning_rate * grad_sigma
                    self.sigmas[i, j] = max(self.sigmas[i, j], 0.1)

            mse = (errors ** 2).mean()
            print(f"Epoch {epoch + 1}/{epochs}, MSE: {mse:.4f}, Peso Médio: {self.weights.mean():.4f}")
        # Salvar MSE e Peso Médio final em um JSON
        metrics = {
            "mse_final": mse,
            "peso_medio_final": self.weights.mean()
        }
        with open("neuro_fuzzy_challenge/modelo/training_metrics.json", "w") as json_file:
            json.dump(metrics, json_file, indent=4)

    def get_parameters(self):
        return {
            "means": self.means.tolist(),
            "sigmas": self.sigmas.tolist(),
            "weights": self.weights.tolist(),
        }
    
    def set_parameters(self, params):
        self.means =  np.array(params["means"])
        self.sigmas =  np.array(params["sigmas"])
        self.weights =  np.array(params["weights"])


def main():
    # Simulação de Dados para Treinamento com Normalização
    temperaturas = np.random.uniform(20, 40, 100)
    umidades = np.random.uniform(30, 90, 100)
    velocidades = 2.5 * temperaturas + 0.5 * umidades

    X = np.vstack((temperaturas, umidades)).T

    # Salvar os parâmetros de normalização
    normalization_params = {
    "X_min": X.min(axis=0).tolist(),
    "X_max": X.max(axis=0).tolist(),
    "y_min": velocidades.min().tolist(),
    "y_max": velocidades.max().tolist()
}
    X_min = np.array(normalization_params["X_min"])
    X_max = np.array(normalization_params["X_max"])
    y_min = np.array(normalization_params["y_min"])
    y_max = np.array(normalization_params["y_max"])
    # Normalização para [0, 1]
    X = (X - X_min) / (X_max - X_min)
    y = (velocidades - y_min) / (y_max - y_min)

    # Treinamento do Modelo
    anfis = ANFIS(n_inputs=2, n_rules=3)
    anfis.train(X, y, epochs=100)

    # Salvar o modelo e os parâmetros de normalização neuro_fuzzy_challenge/modelo/anfis_model.pkl
    params = anfis.get_parameters()
    with open("neuro_fuzzy_challenge/modelo/anfis_parameters.json", "w") as json_file:
        json.dump(params, json_file)

    with open("neuro_fuzzy_challenge/modelo/normalization_params.json", "w") as json_file:
        json.dump(normalization_params, json_file)
    


    # Visualização dos Resultados
    outputs, _ = anfis.forward(X)
    plt.plot(y, label='Velocidade Real')
    plt.plot(outputs, label='Velocidade Predita', linestyle='--')
    plt.legend()
    plt.xlabel('Amostra')
    plt.ylabel('Velocidade')
    plt.title('Comparação entre Velocidade Real e Predita')
    plt.savefig('neuro_fuzzy_challenge/images/images_treino/neuro_fuzzy_predict.png')  # Salvar a figura como imagem

if __name__ == '__main__':
    main()