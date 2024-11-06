"use client";
import Card from "@/components/Card";

import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PredicaoCluster, ResponseClusterPredict } from "@/types/apiTypes";
import { creatNewPredict, getPredicaoCmeans } from "@/services/cluster/apiClusters";
import { SubmitHandler, useForm } from "react-hook-form";

type ParamsForm = {
    total_price: number,
    quantity: number
  }


export default function NvidiaPyTorch() {
    const [predicao, setPredicao] = useState<PredicaoCluster>({ best_k: 0, best_silhouette_score: 0 });
    const [resultadoPredict, setResultadoPredict] = useState<ResponseClusterPredict>();

    const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm<ParamsForm>();

    const fetchPredicao = async () => {
        try {
            const resultado = await getPredicaoCmeans();
            setPredicao(resultado)
        } catch (error) {
            console.log("houve um erro!")
        }
    }

    useEffect(() => {
        fetchPredicao()
    }, [])

    const onSubmit: SubmitHandler<ParamsForm> = async (dadosForm) => {
        try {
          const data = await creatNewPredict(dadosForm);
          setResultadoPredict(data);
        } catch (error) {
          console.log(error);
        }
      };



    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
                Cluster com C-Means
            </Title>
            <br />
            <Section titulo="Sobre o C-means e a Base de Dados usada">
                <p className="">
                    O algoritmo de clusterização C-means, uma variação do K-means que utiliza
                    lógica fuzzy, foi implementado para segmentar dados de clientes de um mercado.
                    Essa abordagem permite que um mesmo cliente pertença parcialmente a mais de um
                    cluster, refletindo comportamentos que podem se sobrepor. O C-means é bastante
                    eficaz na análise de dados complexos e na identificação de padrões onde as
                    fronteiras entre os grupos não são tão rígidas.
                </p>
                <br />
                <p>
                    Através do C-means, os dados dos clientes foram organizados em clusters
                    sobrepostos, de modo que cada cliente apresenta um grau de associação com
                    cada cluster. Esse método é ideal para tarefas de segmentação onde os clientes
                    têm características e comportamentos variados, como preferências de compra,
                    frequência de visita e valor gasto, facilitando a criação de estratégias de
                    marketing personalizadas.
                </p>
                <br />
                <p>
                    No projeto, aplicamos o C-means em uma base de dados de segmentação de
                    clientes de mercado, o que permitiu formar perfis de clientes com base em
                    características como hábitos de consumo, frequência de compra e categorias
                    de produtos adquiridos. Com isso, foi possível identificar grupos de clientes
                    e entender melhor seus padrões de consumo, auxiliando o mercado na criação
                    de campanhas direcionadas e ofertas personalizadas, maximizando a satisfação
                    e retenção dos clientes.
                </p>
            </Section>
            <Section titulo="Sobre o Desempenho de Treino do C-means">
                <div className="grid md:grid-cols-2 gap-8">
                    <Card titulo="Melhor Número de Quantidade de Clusters" conteudo={predicao?.best_k} />
                    <Card titulo="Melhor Score Silhouette" conteudo={predicao?.best_silhouette_score} />
                </div>
                <br />
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/c_means_customer/images_treino/clusters_fcm.png" alt="Imagem dos Clusters" width={1920} height={1080} />
                        <figcaption>Imagem dos Clusters</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/c_means_customer/images_treino/correlation_matrix_fcm.png" alt="Imagem das matrizes correlacionadas" width={1920} height={1080} />
                        <figcaption>Imagem das matrizes correlacionadas</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/c_means_customer/images_treino/elbow_plot_fcm.png" alt="gráfico elbow" width={1920} height={1080} />
                        <figcaption>Gráfico Elbow</figcaption>
                    </figure>
                    <figure>

                        <Image src="http://127.0.0.1:8000/c_means_customer/images_treino/silhouette_plot_fcm.png" alt="gráfico silhouette" width={1920} height={1080} />
                        <figcaption>Gráfico Silhouette</figcaption>
                    </figure>
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
                Quantidade de Produtos a Serem comprados:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="number"
                  {...register("quantity", { required: true })}
                />
              </label>
              <label>
                Valor total dos Produtos:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("total_price", { required: true })}
                />
              </label>
              <button className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3 py-1">
                Enviar!
              </button>
              </form>
              </div>
              <div className="mt-5 md:mt-12">
            {resultadoPredict && (
                <>
            <Card
              titulo="Resultado da Predição:"
              conteudo={"Numero do Cluster" + `${resultadoPredict.cluster}`}
              />
            <Card
              titulo="Resultado da Predição:"
              conteudo={"Tipo do Cluster" + `${resultadoPredict.tipo}`}
              />
              </>
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
