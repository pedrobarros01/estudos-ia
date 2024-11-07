"use client";
import Card from "@/components/Card";

import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BodyIris, PredicaoCluster, ResponseClusterPredict } from "@/types/apiTypes";
import { creatNewPredict, getPredicaoCmeans } from "@/services/cluster/apiClusters";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostPredict } from "@/services/kohonen/apiKohonen";




export default function NvidiaPyTorch() {
    
    const [resultadoPredict, setResultadoPredict] = useState<string | null>(null);
    
    const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm<BodyIris>();


    const onSubmit: SubmitHandler<BodyIris> = async (dadosForm: BodyIris) => {
        try {
            const parsedData: BodyIris = {
                sepal_length: parseFloat(dadosForm.sepal_length.toString()),
                sepal_width: parseFloat(dadosForm.sepal_width.toString()),
                petal_length: parseFloat(dadosForm.petal_length.toString()),
                petal_width: parseFloat(dadosForm.petal_width.toString()), 
        };
        console.log(typeof parsedData.petal_length)
          const data = await PostPredict(parsedData);
          setResultadoPredict(data);
        } catch (error) {
          console.log(error);
        }
      };



    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Redes de Kohonen - SOM com Minisom!
            </Title>
            <br />
            <Section titulo="Sobre a Rede de Kohonen e a base de dados Iris">
                <p className="">
                    A Rede de Kohonen, também conhecida como Mapa Auto-Organizável (Self-Organizing Map - SOM), é uma rede neural não supervisionada que organiza dados em uma estrutura de clusters com base em similaridades. Utilizando o algoritmo MiniSom, uma implementação eficiente do SOM, realizamos a análise e segmentação dos dados da famosa base Iris, amplamente usada em estudos de classificação e machine learning. Esse método permite que dados com características semelhantes se agrupem em áreas próximas da grade da rede, facilitando a visualização e compreensão das relações entre os dados.
                </p>
                <br />
                <p>
                    Com a MiniSom, foi possível organizar as amostras de flores Iris em clusters, onde cada neurônio da rede representa uma região de similaridade entre as amostras. Esse tipo de rede neural é particularmente adequado para visualizar dados de alta dimensionalidade, como as medições das pétalas e sépalas da Iris, e observar padrões naturais nos dados, mesmo quando não há uma clara divisão entre as classes.
                </p>
                <br />
                <p>
                    No projeto, aplicamos a rede de Kohonen com MiniSom na base de dados Iris, a qual possui três espécies de flores (Setosa, Versicolor e Virginica), caracterizadas por quatro variáveis: comprimento e largura das pétalas e das sépalas. A rede conseguiu organizar e agrupar os dados de modo visual, permitindo distinguir características entre as espécies e explorar suas diferenças. Essa análise facilita a identificação de perfis e o entendimento das relações entre as variáveis, contribuindo para uma segmentação mais clara e auxiliando futuras aplicações que demandem classificação e análise de padrões nos dados.
                </p>
            </Section>

            <Section titulo="Sobre o Desempenho de Treino do C-means">
                <div className="grid md:grid-cols-2 gap-8">
                    <figure>
                        <Image src="http://127.0.0.1:8000/kohonen_iris/images_treino/map_kohonen.png" alt="Mapa de Kohonen com Iris" width={1920} height={1080} />
                        <figcaption>Mapa de Kohonen com Iris</figcaption>
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
                Largura da Sépala:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="number"
                  {...register("sepal_width", { required: true })}
                />
              </label>
              <label>
                Tamanho da Sépala:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="number"
                  {...register("sepal_length", { required: true })}
                />
              </label>
              <label>
                Largura da Pétala:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="number"
                  {...register("petal_width", { required: true })}
                />
              </label>
              <label>
                Tamanho da Pétala:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="number"
                  {...register("petal_length", { required: true })}
                />
              </label>
              <button className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3 py-1">
                Enviar!
              </button>
              </form>
              </div>
              <div className="mt-5 md:mt-12">
            {resultadoPredict && (
                <Image src={resultadoPredict} alt="Mapa de Kohonen com predição" width={1920} height={1080} />
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
