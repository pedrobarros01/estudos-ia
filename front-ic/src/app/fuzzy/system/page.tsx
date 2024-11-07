"use client";
import Card from "@/components/Card";

import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useState } from "react";
import { BodyFuzzySystem, ResponseFuzzySysten } from "@/types/apiTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostPredictVelocity } from "@/services/fuzzy/apiSystem";




export default function SystemFuzzy() {
    
    const [resultadoPredict, setResultadoPredict] = useState<ResponseFuzzySysten | null>(null);
    
    const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm<BodyFuzzySystem>();


    const onSubmit: SubmitHandler<BodyFuzzySystem> = async (dadosForm: BodyFuzzySystem) => {
        try {
            const data = await PostPredictVelocity(dadosForm);
            setResultadoPredict(data);
        } catch (error) {
          console.log(error);
        }
      };



    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Fuzzy System usado em controle de velocidade de um ventilador
            </Title>
            <br />
            <Section titulo="Sobre o Sistema Fuzzy e o Controle de Velocidade de um Ventilador">
                <p>
                    Um sistema de controle Fuzzy, ou sistema de lógica difusa, é uma abordagem baseada em regras que permite a modelagem de sistemas complexos com variáveis contínuas e linguagens aproximadas. No caso do controle de velocidade de um ventilador, as variáveis de entrada típicas são a temperatura ambiente e a umidade relativa do ar. A partir dessas entradas, o sistema Fuzzy ajusta a velocidade do ventilador de maneira a garantir um ambiente confortável.
                </p>
                <br />
                <p>
                    O sistema de controle é baseado em um conjunto de regras que refletem o comportamento desejado. Por exemplo, se a temperatura for alta e a umidade for baixa, a regra pode determinar que a velocidade do ventilador seja alta. Por outro lado, em uma situação de baixa temperatura e alta umidade, a velocidade pode ser reduzida para evitar desconforto.
                </p>
                <br />
                <p>
                    As regras são representadas de forma linguística e são processadas por um motor de inferência Fuzzy, que utiliza funções de pertinência para avaliar as entradas. Essas funções atribuem graus de pertinência aos valores de temperatura e umidade em categorias como "baixa", "média" e "alta". O resultado é uma saída difusa que, após ser defuzzificada, resulta em um valor preciso de velocidade para o ventilador.
                </p>
                <br />
                <p>
                    Este tipo de controle é vantajoso por sua capacidade de lidar com incertezas e variabilidades nos dados, oferecendo um ajuste suave e contínuo que se assemelha ao julgamento humano. Dessa forma, o sistema Fuzzy para controle de ventilador contribui para o conforto ambiental ao ajustar automaticamente a velocidade do aparelho com base nas condições atuais de temperatura e umidade.
                </p>
            </Section>
            <Section titulo="Sobre o Desempenho de Treino do C-means">
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/fuzzy_system_challenge/images_treino/fuzzy_predict.png" alt="Gráfico de predição do sistema fuzzy" width={1920} height={1080} />
                        <figcaption>Gráfico de predição do sistema fuzzy</figcaption>
                    </figure>
                </div>
            </Section>
            <Section titulo="Explicação do Código do Sistema Fuzzy para Controle de Velocidade">
                <p>
                    O código fornecido utiliza lógica fuzzy para simular o controle da velocidade com base em duas variáveis de entrada: temperatura e umidade. Vamos dividir o código em partes e explicar cada uma delas.
                </p>
                <br />
                <h3>1. Carregamento das Bibliotecas e Funções</h3>
                <br />
                <p className="ml-4">
                    O código importa as bibliotecas necessárias: <code>numpy</code> para manipulação de arrays, <code>skfuzzy</code> para lógica fuzzy, <code>matplotlib</code> para visualização e <code>joblib</code> para salvar o modelo treinado.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        import numpy as np<br/>
                        import skfuzzy as fuzz<br/>
                        from skfuzzy import control as ctrl<br/>
                        import matplotlib.pyplot as plt<br/>
                        import joblib
                    </code>
                </div>

                <h3>2. Definição das Variáveis de Entrada e Saída</h3>
                <br />
                <p className="ml-4">
                    Definem-se as variáveis de entrada e saída do sistema fuzzy. As variáveis de entrada são <code>temperatura</code> e <code>umidade</code>, e a variável de saída é <code>velocidade</code>. Essas variáveis são definidas com o intervalo de 0 a 100.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        temperatura = ctrl.Antecedent(np.arange(0, 101, 1), 'temperatura')<br/>
                        umidade = ctrl.Antecedent(np.arange(0, 101, 1), 'umidade')<br/>
                        velocidade = ctrl.Consequent(np.arange(0, 101, 1), 'velocidade')
                    </code>
                </div>

                <h3>3. Definição das Funções de Pertinência</h3>
                <br />
                <p className="ml-4">
                    As funções de pertinência são criadas para cada variável. Elas definem como os valores dessas variáveis serão mapeados para os diferentes graus de pertinência fuzzy.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        temperatura['baixa'] = fuzz.trimf(temperatura.universe, [0, 0, 40])<br/>
                        temperatura['media'] = fuzz.trimf(temperatura.universe, [20, 50, 80])<br/>
                        temperatura['alta'] = fuzz.trimf(temperatura.universe, [60, 100, 100])<br/>
                        umidade['baixa'] = fuzz.trimf(umidade.universe, [0, 0, 50])<br/>
                        umidade['media'] = fuzz.trimf(umidade.universe, [30, 50, 70])<br/>
                        umidade['alta'] = fuzz.trimf(umidade.universe, [60, 100, 100])<br/>
                        velocidade['lenta'] = fuzz.trimf(velocidade.universe, [0, 0, 50])<br/>
                        velocidade['media'] = fuzz.trimf(velocidade.universe, [25, 50, 75])<br/>
                        velocidade['rapida'] = fuzz.trimf(velocidade.universe, [50, 100, 100])
                    </code>
                </div>

                <h3>4. Definição das Regras Fuzzy</h3>
                <br />
                <p className="ml-4">
                    As regras fuzzy são definidas para determinar a relação entre a temperatura, a umidade e a velocidade. Por exemplo, se a temperatura for baixa e a umidade também, a velocidade será lenta.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        regra1 = ctrl.Rule(temperatura['baixa'] & umidade['baixa'], velocidade['lenta'])<br/>
                        regra2 = ctrl.Rule(temperatura['media'] & umidade['baixa'], velocidade['media'])<br/>
                        regra3 = ctrl.Rule(temperatura['alta'] | umidade['alta'], velocidade['rapida'])<br/>
                        regra4 = ctrl.Rule(temperatura['media'] & umidade['media'], velocidade['media'])<br/>
                        regra5 = ctrl.Rule(temperatura['baixa'] & umidade['alta'], velocidade['lenta'])
                    </code>
                </div>

                <h3>5. Criação do Sistema de Controle Fuzzy</h3>
                <br />
                <p className="ml-4">
                    O sistema de controle fuzzy é criado utilizando as regras definidas anteriormente. O modelo é então salvo usando o <code>joblib.dump</code>, permitindo o reuso do simulador sem necessidade de treinar novamente.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        controle_velocidade = ctrl.ControlSystem([regra1, regra2, regra3, regra4, regra5])<br/>
                        simulador = ctrl.ControlSystemSimulation(controle_velocidade)<br/>
                        joblib.dump(simulador, 'fuzzy_system_challenge/modelo/simulador_fuzzy.pkl')
                    </code>
                </div>

                <h3>6. Simulação para Amostras de Temperatura e Umidade</h3>
                <br />
                <p className="ml-4">
                    A simulação é realizada para 100 amostras de temperatura e umidade aleatórias. O simulador é usado para calcular a velocidade predita com base nas amostras de entrada.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        temperatura_samples = np.random.randint(0, 101, 100)<br/>
                        umidade_samples = np.random.randint(0, 101, 100)<br/>
                        velocidade_real = np.random.randint(0, 101, 100)<br/>
                        velocidade_predita = []<br/>
                        for temp, umid in zip(temperatura_samples, umidade_samples):<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;simulador.input['temperatura'] = temp<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;simulador.input['umidade'] = umid<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;simulador.compute()<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;velocidade_predita.append(simulador.output['velocidade'])
                    </code>
                </div>

                <h3>7. Visualização dos Resultados</h3>
                <br />
                <p className="ml-4">
                    Após a simulação, o código gera um gráfico comparando a velocidade real com a velocidade predita. O gráfico é salvo e exibido para análise visual dos resultados.
                </p>
                <br />
                <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
                    <code className="ml-6">
                        plt.plot(velocidade_real, label='Velocidade Real')<br/>
                        plt.plot(velocidade_predita, label='Velocidade Predita', linestyle='--')<br/>
                        plt.legend()<br/>
                        plt.xlabel('Amostra')<br/>
                        plt.ylabel('Velocidade')<br/>
                        plt.title('Comparação entre Velocidade Real e Predita')<br/>
                        plt.savefig(f'fuzzy_system_challenge/images/images_treino/fuzzy_predict.png', format='png', dpi=300, bbox_inches='tight')<br/>
                        plt.show()
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
