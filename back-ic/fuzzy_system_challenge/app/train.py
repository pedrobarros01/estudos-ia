import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import matplotlib.pyplot as plt
import joblib

def train():
    print('ola')
    # 2.1 - Definir as variáveis de entrada e saída
    temperatura = ctrl.Antecedent(np.arange(0, 101, 1), 'temperatura')
    umidade = ctrl.Antecedent(np.arange(0, 101, 1), 'umidade')
    velocidade = ctrl.Consequent(np.arange(0, 101, 1), 'velocidade')

    # 3.1 - Criar funções de pertinência para temperatura
    temperatura['baixa'] = fuzz.trimf(temperatura.universe, [0, 0, 40])
    temperatura['media'] = fuzz.trimf(temperatura.universe, [20, 50, 80])
    temperatura['alta'] = fuzz.trimf(temperatura.universe, [60, 100, 100])

    # Criar funções de pertinência para umidade
    umidade['baixa'] = fuzz.trimf(umidade.universe, [0, 0, 50])
    umidade['media'] = fuzz.trimf(umidade.universe, [30, 50, 70])
    umidade['alta'] = fuzz.trimf(umidade.universe, [60, 100, 100])

    # Criar funções de pertinência para velocidade
    velocidade['lenta'] = fuzz.trimf(velocidade.universe, [0, 0, 50])
    velocidade['media'] = fuzz.trimf(velocidade.universe, [25, 50, 75])
    velocidade['rapida'] = fuzz.trimf(velocidade.universe, [50, 100, 100])

    # 4.1 - Definir as regras
    regra1 = ctrl.Rule(temperatura['baixa'] & umidade['baixa'], velocidade['lenta'])
    regra2 = ctrl.Rule(temperatura['media'] & umidade['baixa'], velocidade['media'])
    regra3 = ctrl.Rule(temperatura['alta'] | umidade['alta'], velocidade['rapida'])
    regra4 = ctrl.Rule(temperatura['media'] & umidade['media'], velocidade['media'])
    regra5 = ctrl.Rule(temperatura['baixa'] & umidade['alta'], velocidade['lenta'])

    # 5.1 - Criar sistema de controle
    controle_velocidade = ctrl.ControlSystem([regra1, regra2, regra3, regra4, regra5])
    simulador = ctrl.ControlSystemSimulation(controle_velocidade)
    joblib.dump(simulador, 'fuzzy_system_challenge/modelo/simulador_fuzzy.pkl')
    # Amostras de teste para temperatura e umidade

    temperatura_samples = np.random.randint(0, 101, 100)
    umidade_samples = np.random.randint(0, 101, 100)
    velocidade_real = np.random.randint(0, 101, 100)

    velocidade_predita = []

    # Simular para cada amostra de temperatura e umidade
    for temp, umid in zip(temperatura_samples, umidade_samples):
        simulador.input['temperatura'] = temp
        simulador.input['umidade'] = umid
        simulador.compute()
        velocidade_predita.append(simulador.output['velocidade'])

    # 7.1 - Exibir o gráfico de comparação
    plt.plot(velocidade_real, label='Velocidade Real')
    plt.plot(velocidade_predita, label='Velocidade Predita', linestyle='--')
    plt.legend()
    plt.xlabel('Amostra')
    plt.ylabel('Velocidade')
    plt.title('Comparação entre Velocidade Real e Predita')
    plt.savefig(f'fuzzy_system_challenge/images/images_treino/fuzzy_predict.png', format='png', dpi=300, bbox_inches='tight')


if __name__ == '__main__':
    train()