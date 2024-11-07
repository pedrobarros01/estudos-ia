"use client";
import Section from "@/components/Section";
import Title from "@/components/Title";
import Image from "next/image";

export default function WithoutMinisom() {

    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Redes de Kohonen - SOM Manual
            </Title>
            <br />
            <Section titulo="Sobre a Rede de Kohonen e a Base de Dados de Vinho">
                <p className="">
                    A Rede de Kohonen, ou Mapa Auto-Organizável (Self-Organizing Map - SOM), é uma rede neural não supervisionada que organiza dados complexos em clusters baseados em similaridades, permitindo a visualização e análise de padrões em dados de alta dimensionalidade. No projeto, implementamos uma Rede de Kohonen manualmente para realizar a segmentação e análise de dados da base de vinhos, utilizando características relevantes como acidez fixa, acidez volátil, ácido cítrico, açúcar residual, cloretos, dióxido de enxofre livre, dióxido de enxofre total, densidade, pH, sulfatos, teor alcoólico, qualidade e um identificador único (ID).
                </p>
                <br />
                <p>
                    Ao realizar a implementação manual da Rede de Kohonen, trabalhamos com uma matriz de pesos conectada a uma grade de neurônios. Cada neurônio representa uma região de similaridade entre as amostras da base de dados, e os dados são projetados para essa grade, com cada neurônio "competindo" para se tornar o representante das amostras com características semelhantes. Esse processo de organização facilita a compreensão de como os diferentes atributos influenciam na qualidade do vinho, segmentando amostras em clusters distintos.
                </p>
                <br />
                <p>
                    A aplicação da Rede de Kohonen na base de dados de vinho revelou agrupamentos que correspondem a perfis de vinhos de acordo com suas características físico-químicas e qualidade. Os neurônios da grade da rede capturaram variações em características como acidez e teor alcoólico, formando regiões onde vinhos de qualidades similares se agruparam. Esse tipo de visualização oferece insights sobre a relação entre as variáveis químicas e a classificação de qualidade, tornando a Rede de Kohonen uma ferramenta eficaz para análises exploratórias e segmentação de dados em áreas onde padrões e relações entre características são difíceis de identificar visualmente.
                </p>
            </Section>


            <Section titulo="Sobre o Desempenho de Treino do C-means">
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/kohonen_manual/images_treino/map_kohonen_manual.png" alt="Mapa de Kohonen com a base de dados de vinho" width={1920} height={1080} />
                        <figcaption>Mapa de Kohonen com a base de dados de vinho</figcaption>
                    </figure>
                </div>
            </Section>
    <Section titulo="Explicação do Código da Rede de Kohonen para Análise de Qualidade de Vinhos">
    <p>
        O código fornecido treina uma Rede de Kohonen para segmentar dados de vinhos com base em características físico-químicas. Vamos dividir o código em partes e explicar cada uma delas.
    </p>
    <br />
    <h3>1. Carregamento e Pré-processamento dos Dados</h3>
    <br />
    <p className="ml-4">
        O primeiro passo é carregar a base de dados contendo informações sobre vinhos, removendo as colunas 'quality' e 'Id' de X (dados de entrada), e normalizando os dados.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
        <code className="ml-6" >
            df = pd.read_csv('kohonen_manual/app/WineQT.csv')<br/>
            X = df.drop(['quality', 'Id'], axis=1).values  # Remover a coluna 'quality' e 'Id' de X<br/>
            y = df['quality'].values<br/>
            X_min = X.min(axis=0)<br/>
            X_max = X.max(axis=0)<br/>
            X_scaled = (X - X_min) / (X_max - X_min)
        </code>

    </div>
    

    <h3>2. Definição da Estrutura da Rede e Parâmetros</h3>
    <br />
    <p className="mt-4">
        Aqui, é definido o tamanho da grade do mapa (8x8), o número de características de entrada e os parâmetros de treinamento, como o raio de vizinhança (sigma), a taxa de aprendizado e o número de iterações.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        grid_x, grid_y = 8, 8  # Tamanho do mapa SOM<br/>
        input_len = X_scaled.shape[1]<br/>
        sigma = 1.0  # Raio de vizinhança<br/>
        learning_rate = 0.5  # Taxa de aprendizado<br/>
        num_iterations = 50
    </code>

    </div>
    

    <h3>3. Inicialização dos Pesos Aleatórios</h3>
    <br />
    <p className="ml-4">
        Inicializa-se uma matriz de pesos aleatórios que representará os neurônios da rede. A matriz tem dimensões (8, 8, número de características), já que a rede é 2D com 8x8 neurônios e cada neurônio tem um vetor de pesos correspondente ao número de características.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
        <code className="ml-6">
            weights = np.random.rand(grid_x, grid_y, input_len)
        </code>
    </div>

    <h3>4. Função de Distância Euclidiana</h3>
    <br />
    <p className="ml-4">
        A função <code>euclidean_distance</code> calcula a distância entre dois pontos no espaço vetorial, que será utilizada para determinar o melhor neurônio (BMU - Best Matching Unit) para cada amostra.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        def euclidean_distance(a, b):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;return np.sqrt(np.sum((a - b) ** 2))
    </code>
    </div>

    <h3>5. Encontrando o BMU (Best Matching Unit)</h3>
    <br />
    <p className="ml-4">
        A função <code>find_bmu</code> percorre todos os neurônios da grade e encontra o neurônio cujo vetor de pesos tem a menor distância em relação à amostra de entrada.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        def find_bmu(x):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;bmu_idx = np.argmin([[euclidean_distance(x, weights[i, j]) for j in range(grid_y)] for i in range(grid_x)])<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;return divmod(bmu_idx, grid_y)
    </code>
    </div>

    <h3>6. Atualização dos Pesos dos Neurônios</h3>
    <br />
    <p className="ml-4">
        A função <code>update_weights</code> ajusta os pesos dos neurônios com base na distância ao BMU e a taxa de aprendizado decrescente ao longo das iterações. Esse ajuste permite que os neurônios se "aproximem" das amostras de dados durante o treinamento.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        def update_weights(x, bmu, iteration, num_iterations):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;learning_decay = learning_rate * (1 - iteration / num_iterations)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;sigma_decay = sigma * (1 - iteration / num_iterations)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;for i in range(grid_x):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for j in range(grid_y):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;neuron_distance = euclidean_distance(np.array([i, j]), np.array(bmu))<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if neuron_distance &lt;= sigma_decay:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;influence = np.exp(-neuron_distance**2 / (2 * sigma_decay**2))<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;weights[i, j] += learning_decay * influence * (x - weights[i, j])
    </code>
    </div>

    <h3>7. Treinamento da Rede</h3>
    <br />
    <p className="ml-4">
        O laço <code>for iteration in range(num_iterations):</code> percorre o número de iterações, ajustando os pesos a cada ciclo. Dentro de cada iteração, a cada amostra é calculado o BMU e os pesos são atualizados.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        for iteration in range(num_iterations):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;for sample in X_scaled:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bmu = find_bmu(sample)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;update_weights(sample, bmu, iteration, num_iterations)
    </code>
    </div>

    <h3>8. Visualização dos Resultados</h3>
    <br />
    <p className="ml-4">
        Após o treinamento, a visualização é gerada plotando os BMUs para cada amostra de vinho, usando cores diferentes para indicar a qualidade. Isso permite uma análise visual dos agrupamentos formados pela Rede de Kohonen.
    </p>
    <br />
    <div className="bg-zinc-800 flex justify-start rounded-lg py-3 mb-4">
    <code className="ml-6">
        colors = plt.cm.tab10(np.linspace(0, 1, 11))<br></br>
        plt.figure(figsize=(8, 8))<br></br>
        for i, sample in enumerate(X_scaled):<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;bmu = find_bmu(sample)<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;plt.plot(bmu[1] + 0.5, bmu[0] + 0.5, marker='o', markerfacecolor='None',<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;markeredgecolor=colors[y[i]], markersize=8, markeredgewidth=2)<br></br>
        plt.xticks(np.arange(grid_x + 1))<br/>
        plt.yticks(np.arange(grid_y + 1))<br/>
        plt.grid(True)<br/>
        plt.savefig(f'kohonen_manual/images/images_treino/map_kohonen_manual.png', format='png', dpi=300, bbox_inches='tight')<br/>
        plt.show()
    </code>
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
