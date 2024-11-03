"use client";
import Card from "@/components/Card";
import Section from "@/components/Section";
import Title from "@/components/Title";
import {
  getDesempenho,
  getPredicao,
  getPrevisaoBase,
} from "@/services/nvidia/apiTensorFlow";
import {
  PredicaoParams,
  PredicaoResultado,
  TensorFlowDesempenhoTreino,
} from "@/types/apiTypes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function NvidiaTensorflow() {
  const [desempenho, setDesempenho] = useState<TensorFlowDesempenhoTreino>({
    mae: 0,
    mape: 0,
    mse: 0,
    r2: 0,
  });
  const [predicaoImageUrl, setPredicaoImageUrl] = useState<string | null>(null);
  const [loadingImage, setloadingImage] = useState<boolean>(true);
  const [predicao, setPredicao] = useState<PredicaoResultado>();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<PredicaoParams>();

  const fetchDesempenho = async () => {
    try {
      const data = await getDesempenho();
      setDesempenho(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadPredicaoImage = async () => {
    try {
      const url = await getPrevisaoBase();
      console.log(url);
      setPredicaoImageUrl(url);
    } catch (error) {
      console.log(error);
    } finally {
      setloadingImage(false);
    }
  };

  const onSubmit: SubmitHandler<PredicaoParams> = async (dadosForm) => {
    try {
      const data = await getPredicao(dadosForm);
      setPredicao(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDesempenho();
    loadPredicaoImage();
  }, []);

  return (
    <main className="px-32 mt-20">
      <Title>Nvidia-Shares-Price com TensorFlow</Title>
      <br />
      <Section titulo="Sobre a Base de Dados">
        <p className="">
          O roteiro de TensorFlow de deep learning foi desenvolvido utilizando a
          base de dados dos preços de ação da Nvidia, uma empresa de tecnologia
          multinacional fundada em 1993 e sediada em Santa Clara, Califórnia. A
          Nvidia é conhecida por seu crescimento rápido e inovação, tendo se
          destacado no mercado de GPUs e supercomputação. Em 2020, suas ações
          atingiram um recorde de preço, e a empresa realizou a aquisição da
          Mellanox Technologies por US$ 7 bilhões, expandindo sua atuação no
          mercado de redes.
        </p>
        <br />
        <p>
          Além de integrar importantes índices de mercado como o S&P 500 e o
          NASDAQ-100, a Nvidia figura em rankings de prestígio, como a lista das
          maiores empresas da Fortune e da Forbes. A análise dos preços
          históricos das ações da Nvidia serve como base para a aplicação de
          modelos de deep learning, que buscam identificar padrões e realizar
          previsões sobre o desempenho futuro da empresa no mercado financeiro.
        </p>
        <br />
        <p>
          Para mais informações:&nbsp;
          <a
            href="https://www.kaggle.com/datasets/prajwaldongre/nvidia-corp-share-price-2000-2024/data"
            target="_blank"
            className="font-light hover:text-red-800 underline text-zinc-100"
          >
            fonte dos dados trabalhados.
          </a>
        </p>
      </Section>
      <Section titulo="Sobre o Desempenho de Treino no TensorFlow">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card titulo="Mean Squared Error" conteudo={desempenho.mse} />
          <Card titulo="Mean Absolute Error" conteudo={desempenho.mae} />
          <Card
            titulo="Mean Absolute Percentage Error"
            conteudo={desempenho.mape}
          />
          <Card titulo="r² Score" conteudo={desempenho.r2} />
        </div>
      </Section>
      <Section titulo="Sobre a Predição no TensorFlow">
        {loadingImage && <span>Carregando Imagem...</span>}
        {predicaoImageUrl && (
          <Image
            src={predicaoImageUrl}
            alt="Previsão Base"
            width={1920}
            height={1080}
            className="w-auto h-auto"
          />
        )}
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
                Data que deseja Lançar a Ação:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  type="date"
                  {...register("date", { required: true })}
                />
              </label>
              <label>
                Valor da Ação que será ajustado antes de fechar:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("adj_close", { required: true })}
                />
              </label>
              <label>
                Valor mais Alto da Ação:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("high", { required: true })}
                />
              </label>
              <label>
                Valor mais Baixo da Ação:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("low", { required: true })}
                />
              </label>
              <label>
                Valor da ação que abrirá no dia {"(U$)"}:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("open", { required: true })}
                />
              </label>
              <label>
                Quantidade de compras da ação:
                <br />
                <input
                  className="w-full text-zinc-900 rounded-sm px-2 py-1"
                  {...register("volume", { required: true })}
                />
              </label>
              <button className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3 py-1">
                Enviar!
              </button>
            </form>
          </div>
          <div className="mt-5 md:mt-12">
            {predicao && (
              <Card
                titulo="Resultado da Predição:"
                conteudo={"U$ " + `${predicao.predict}`}
              />
            )}
          </div>
        </div>
      </Section>

      <Section titulo="Confira nosso Código!">
        <a
          href="https://github.com/pedrobarros01/nvidia-shares-price"
          target="_blank"
          className="font-light hover:text-red-800 underline text-zinc-100 italic"
        >
          Acesse aqui o nosso repositório no GitHub!
        </a>
      </Section>
    </main>
  );
}
