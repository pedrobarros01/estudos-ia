"use client";
import Card from "@/components/Card";

import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BodyFuzzySystem, MetricasNeuralFuzzy, ResponseFuzzySysten } from "@/types/apiTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetMetricas, PredictNeuralFuzzy } from "@/services/fuzzy/apiNeural";




export default function NeuralFuzzy() {
    
    const [resultadoPredict, setResultadoPredict] = useState<ResponseFuzzySysten | null>(null);
    const [desempenho, setDesempenho] = useState<MetricasNeuralFuzzy>();
    const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm<BodyFuzzySystem>();


    const onSubmit: SubmitHandler<BodyFuzzySystem> = async (dadosForm: BodyFuzzySystem) => {
        try {
            const data = await PredictNeuralFuzzy(dadosForm);
            setResultadoPredict(data);
        } catch (error) {
          console.log(error);
        }
      };
      const fetch = async () => {
        try {
          const data = await GetMetricas();
          setDesempenho(data);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        fetch();
      }, [])



    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Neural Fuzzy para controle de velocidade de um ventilador
            </Title>
            <br />
            <Section titulo="Sobre o Sistema Neuro-Fuzzy e o Controle de Velocidade de um Ventilador">
                <p>
                    O sistema Neuro-Fuzzy é uma combinação de redes neurais artificiais e sistemas de controle Fuzzy. Ele integra a capacidade de aprendizado das redes neurais com a modelagem linguística e aproximada dos sistemas Fuzzy, permitindo uma adaptação dinâmica às condições ambientais. No caso do controle de velocidade de um ventilador, as variáveis de entrada típicas são a temperatura ambiente e a umidade relativa do ar. O sistema Neuro-Fuzzy ajusta a velocidade do ventilador de forma inteligente e adaptativa, baseando-se não apenas em regras predefinidas, mas também aprendendo a partir de dados históricos.
                </p>
                <br />
                <p>
                    O sistema é composto por um conjunto de regras Fuzzy que são ajustadas automaticamente pela rede neural, permitindo que o controle se torne mais preciso com o tempo. Por exemplo, se a temperatura for alta e a umidade for baixa, a rede pode aprender que a velocidade do ventilador deve ser alta. Em uma situação de baixa temperatura e alta umidade, a rede pode ajustar a regra para reduzir a velocidade, com base nos padrões aprendidos a partir dos dados de entrada.
                </p>
                <br />
                <p>
                    As regras Fuzzy no sistema Neuro-Fuzzy são inicialmente definidas com base no conhecimento humano ou em um conjunto de dados representativo. Contudo, a rede neural é capaz de ajustar essas regras ao longo do tempo, utilizando algoritmos de aprendizado supervisionado ou não supervisionado. As entradas de temperatura e umidade são avaliadas com funções de pertinência, que atribuem graus de pertinência a essas variáveis em categorias como "baixa", "média" e "alta". O motor de inferência Fuzzy processa essas entradas e gera uma saída difusa, que é então defuzzificada para obter um valor preciso de velocidade do ventilador.
                </p>
                <br />
                <p>
                    A principal vantagem do sistema Neuro-Fuzzy é sua capacidade de aprender e se adaptar a novas condições de operação. Isso o torna mais flexível e eficaz do que sistemas baseados apenas em regras fixas. Ao combinar o poder de aprendizado das redes neurais com a abordagem intuitiva dos sistemas Fuzzy, o sistema Neuro-Fuzzy para controle de ventilador pode proporcionar um ajuste automático e eficiente da velocidade, melhorando o conforto ambiental e a eficiência energética.
                </p>
            </Section>
            <Section titulo="Sobre o Desempenho de Treino do neuro fuzzy">
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/neuro_fuzzy_challenge/images_treino/neuro_fuzzy_predict.png" alt="Gráfico de predição do neuro fuzzy" width={1920} height={1080} />
                        <figcaption>Gráfico de predição do neuro fuzzy</figcaption>
                    </figure>
                </div>
            </Section>
            {desempenho && 
            <Section titulo="Sobre as metricas do neuro fuzzy">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card titulo="Mean Squared Error" conteudo={desempenho.mse_final} />
                <Card titulo="Peso medio dos neuronios" conteudo={desempenho.peso_medio_final} />
                </div>
            </Section>}
            
            <Section titulo="Explicação do Código do Sistema Neuro Fuzzy para Controle de Velocidade">
                <p>
                    O código fornecido utiliza um modelo **ANFIS (Adaptive Neuro Fuzzy Inference System)** para simular o controle da velocidade com base em duas variáveis de entrada: temperatura e umidade. Vamos dividir o código em partes e explicar cada uma delas.
                </p>
                <br />
                <h3>1. Carregamento das Bibliotecas e Funções</h3>
                <br />
                <p className="ml-4">
                    O código importa as bibliotecas necessárias: <code>numpy</code> para manipulação de arrays, <code>matplotlib</code> para visualização, <code>joblib</code> para salvar o modelo treinado, e <code>json</code> para salvar os parâmetros de normalização e métricas de treinamento.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        import numpy as np<br/> teste
                        import matplotlib.pyplot as plt<br/>
                        import joblib<br/>
                        import json
                    </code>
                </div>

                <h3>2. Definição da Classe ANFIS</h3>
                <br />
                <p className="ml-4">
                    O código define a classe <code>ANFIS</code>, que implementa o sistema neuro fuzzy para controle de velocidade. Essa classe contém métodos para calcular as funções de pertinência, realizar a propagação das entradas e ajustar os parâmetros do modelo durante o treinamento.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                <code className="ml-6">
            class ANFIS:<br/>
            &nbsp;&nbsp;&nbsp;def __init__(self, n_inputs, n_rules, learning_rate=0.01):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.n_inputs = n_inputs<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.n_rules = n_rules<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.learning_rate = learning_rate<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.fuzzy_learning_rate = 0.001<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Inicialização de parâmetros fuzzy<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.means = np.random.uniform(0.25, 0.75, (n_inputs, n_rules))<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.sigmas = np.random.uniform(0.1, 0.3, (n_inputs, n_rules))<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.weights = np.random.uniform(-0.1, 0.1, n_rules)<br/>
            &nbsp;&nbsp;&nbsp;def gaussian_membership(self, x, mean, sigma):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return np.exp(-0.5 * ((x - mean) / sigma) ** 2)<br/>

            &nbsp;&nbsp;&nbsp;def forward(self, X):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberships = np.ones((X.shape[0], self.n_rules))<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for i in range(self.n_inputs):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for j in range(self.n_rules):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberships[:, j] *= self.gaussian_membership(X[:, i], self.means[i, j], self.sigmas[i, j])<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberships_sum = memberships.sum(axis=1, keepdims=True)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;memberships_sum[memberships_sum == 0] = 1<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;firing_strengths = memberships / memberships_sum<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;output = np.dot(firing_strengths, self.weights)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return output, firing_strengths<br/>

            &nbsp;&nbsp;&nbsp;def train(self, X, y, epochs=100):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for epoch in range(epochs):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;outputs, firing_strengths = self.forward(X)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;errors = y - outputs<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for j in range(self.n_rules):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.weights[j] += self.learning_rate * np.dot(errors, firing_strengths[:, j])<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for i in range(self.n_inputs):<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grad_mean = (errors * self.weights[j] * firing_strengths[:, j] * (X[:, i] - self.means[i, j]) / (self.sigmas[i, j] ** 2)).mean()<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;grad_sigma = (errors * self.weights[j] * firing_strengths[:, j] * ((X[:, i] - self.means[i, j]) ** 2 - self.sigmas[i, j] ** 2) / (self.sigmas[i, j] ** 3)).mean()<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.means[i, j] += self.fuzzy_learning_rate * grad_mean<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.sigmas[i, j] += self.fuzzy_learning_rate * grad_sigma<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.sigmas[i, j] = max(self.sigmas[i, j], 0.1)<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;print(f"Epoch [epoch + 1]/[epochs], MSE: [mse:.4f]")<br/>

        </code>
                </div>

                <h3>3. Simulação de Dados para Treinamento e Normalização</h3>
                <br />
                <p className="ml-4">
                    Dados simulados de temperatura e umidade são criados e normalizados para a faixa [0, 1] para o treinamento do modelo. Além disso, os parâmetros de normalização (mínimos e máximos) são salvos em um arquivo JSON para futuras previsões.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        temperaturas = np.random.uniform(20, 40, 100)<br/>
                        umidades = np.random.uniform(30, 90, 100)<br/>
                        velocidades = 2.5 * temperaturas + 0.5 * umidades<br/>
                        X = np.vstack((temperaturas, umidades)).T<br/>
                        normalization_params = &#91<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"X_min": X.min(axis=0).tolist(),<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"X_max": X.max(axis=0).tolist(),<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"y_min": velocidades.min().tolist(),<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;"y_max": velocidades.max().tolist()<br/>
                        &#93;<br/>
                        X = (X - X_min) / (X_max - X_min)<br/>
                        y = (velocidades - y_min) / (y_max - y_min)
                    </code>
                </div>

                <h3>4. Treinamento do Modelo ANFIS</h3>
                <br />
                <p className="ml-4">
                    O modelo ANFIS é treinado usando os dados normalizados. Durante o treinamento, o modelo ajusta seus parâmetros para minimizar o erro entre as saídas preditas e as reais. Após o treinamento, os parâmetros do modelo são salvos em um arquivo JSON.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        anfis = ANFIS(n_inputs=2, n_rules=3)<br/>
                        anfis.train(X, y, epochs=100)<br/>
                        params = anfis.get_parameters()<br/>
                        with open("neuro_fuzzy_challenge/modelo/anfis_parameters.json", "w") as json_file:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;json.dump(params, json_file)<br/>
                        with open("neuro_fuzzy_challenge/modelo/normalization_params.json", "w") as json_file:<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;json.dump(normalization_params, json_file)
                    </code>
                </div>

                <h3>5. Simulação de Resultados com o Modelo ANFIS</h3>
                <br />
                <p className="ml-4">
                    Após o treinamento, o modelo é usado para realizar previsões de velocidade com base nos dados de entrada. A saída predita é comparada com a velocidade real gerada nos dados simulados.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        outputs, _ = anfis.forward(X)<br/>
                        plt.plot(y, label='Velocidade Real')<br/>
                        plt.plot(outputs, label='Velocidade Predita', linestyle='--')<br/>
                        plt.legend()<br/>
                        plt.xlabel('Amostra')<br/>
                        plt.ylabel('Velocidade')<br/>
                        plt.title('Comparação entre Velocidade Real e Predita')<br/>
                        plt.savefig('neuro_fuzzy_challenge/images/images_treino/neuro_fuzzy_predict.png')<br/>
                    </code>
                </div>

                <h3>6. Salvamento e Visualização dos Resultados</h3>
                <br />
                <p className="ml-4">
                    O gráfico comparando a velocidade real com a velocidade predita é salvo como uma imagem. Isso permite a visualização do desempenho do modelo e a análise de sua capacidade de previsão.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        plt.show()  # Exibir o gráfico
                    </code>
                </div>
            </Section>


            <Section titulo="Agora é sua vez!">
                <div className="md:grid md:grid-cols-2 md:gap-4">
                <div>
                    <h3>Digite as Entradas Solicitadas:</h3>
                    <form
                    className="w-full md:w-4/5 mt-2 grid gap-y-3 "
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <label>
                        Temperatura:
                        <br />
                        <input
                        className="w-full text-zinc-900 rounded-sm px-2 py-1"
                        type="number"
                        {...register("temperature", { required: true })}
                        />
                    </label>
                    <label>
                        Umidade:
                        <br />
                        <input
                        className="w-full text-zinc-900 rounded-sm px-2 py-1"
                        type="number"
                        {...register("humidity", { required: true })}
                        />
                    </label>
                    <button className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3 py-1">
                        Enviar!
                    </button>
                    </form>
                    </div>
                    <div className="mt-5 md:mt-12">
                    {resultadoPredict && (
                        <Card
                        titulo="Velocidade:"
                        conteudo={`${resultadoPredict.velocity}`}
                      />
                    )}
                </div>
                </div>
            </Section>


            <Section titulo="Confira nosso Código!">
                <a
                    href="https://github.com/pedrobarros01/estudos-ia"
                    target="_blank"
                    className="font-light hover:text-red-800 underline text-zinc-100 italic"
                >
                    Acesse aqui o nosso repositório no GitHub!
                </a>
            </Section>
        </main>
    );
}
