"use client";
import Card from "@/components/Card";

import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PredicaoCluster } from "@/types/apiTypes";
import { getPredicaoKmeans } from "@/services/cluster/apiClusters";


export default function Kmeans() {
    const [predicao, setPredicao] = useState<PredicaoCluster>({best_k : 0, best_silhouette_score: 0});

    const fetchPredicao = async () => {
        try {
            const resultado = await getPredicaoKmeans();
            setPredicao(resultado)
        } catch (error) {
            console.log("houve um erro!")
        }
    }

    useEffect(()=> {
        fetchPredicao()
    }, [])



    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
                Cluster com K-Means
            </Title>
            <br />
            <Section titulo="Sobre o K-means e a Base de Dados usada">
                <p className="">
                    O algoritmo de clusterização K-means foi utilizado para agrupar
                    conjuntos de dados em categorias distintas, por meio de uma técnica
                    eficiente de aprendizado não supervisionado. Essa abordagem permite
                    que pontos de dados semelhantes fiquem próximos entre si, enquanto
                    pontos mais diferentes são agrupados separadamente. O K-means é
                    amplamente utilizado em várias áreas de análise de dados, pois facilita
                    a identificação de padrões e agrupamentos naturais nos dados.
                </p>
                <br />
                <p>
                    Com o K-means, os dados são organizados em clusters bem definidos,
                    sendo cada cluster representado por um centroide que minimiza a
                    distância entre os pontos de dados no grupo. Este algoritmo é ideal
                    para tarefas como segmentação de clientes, análise de padrões e
                    descoberta de grupos semelhantes, proporcionando uma maneira
                    poderosa e intuitiva de explorar e compreender grandes conjuntos de dados
                    sem a necessidade de rótulos predefinidos.
                </p>
                <br />
                <p>
                    Neste projeto, foi utilizada uma base de dados sobre o nível de
                    desigualdade em 169 países, fornecendo informações valiosas para
                    identificar padrões de disparidade econômica e social entre diferentes
                    regiões. Com o K-means, foi possível agrupar países com características
                    de desigualdade similares, facilitando a análise comparativa e destacando
                    tendências regionais ou globais. Essa abordagem ajuda a visualizar e
                    interpretar melhor os dados de desigualdade, fornecendo insights que
                    podem apoiar estudos e políticas públicas voltadas para a redução das
                    disparidades.
                </p>
            </Section>
            <Section titulo="Sobre o Desempenho de Treino do K-means">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card titulo="Melhor Número de Quantidade de Clusters" conteudo={predicao?.best_k} />
                    <Card titulo="Melhor Score Silhouette" conteudo={predicao?.best_silhouette_score} />
                </div>
                <br/>
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/k_means_country/images_treino/clusters_kmeans.png" alt="Imagem dos Clusters" width={1920} height={1080} />
                        <figcaption>Imagem dos Clusters</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/k_means_country/images_treino/correlation_matrix.png" alt="Imagem das matrizes correlacionadas" width={1920} height={1080} />
                        <figcaption>Imagem das matrizes correlacionadas</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/k_means_country/images_treino/elbow_plot_kmeans.png" alt="gráfico elbow" width={1920} height={1080} />
                        <figcaption>Gráfico Elbow</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/k_means_country/images_treino/silhouette_plot_kmeans.png" alt="gráfico silhouette" width={1920} height={1080} />
                        <figcaption>Gráfico Silhouette</figcaption>
                    </figure>
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
