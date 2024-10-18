"use client";
import Section from "@/components/Section";
import Title from "@/components/Title";
import { useState } from "react";

export default function NvidiaTensorflow() {
  const [predicao, setPredicao] = useState(false);
  return (
    <main className="px-32 mt-6">
      <Title>Nvidia-Shares-Price com tensorflow</Title>
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
      <Section titulo="Sobre a Predição">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div>
            <h3>Digite as Entradas Solicitadas:</h3>
            <form className="w-full md:w-4/5 mt-2">
              <label>
                Parâmetro 1:
                <br />
                <input className="w-full" />
              </label>
              <br />
              <label>
                Parâmetro 2:
                <br />
                <input className="w-full" />
              </label>
              <br />
              <label>
                Parâmetro 3:
                <br />
                <input className="w-full" />
              </label>
              <br />
              <button
                className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3"
                type="button"
                onClick={() => setPredicao(true)}
              >
                Enviar!
              </button>
            </form>
          </div>
          <div className="mt-5 md:mt-0">
            <h3>Resultado:</h3>
            <div>{predicao && <p>teste</p>}</div>
          </div>
        </div>
      </Section>

      <Section titulo="Sobre o Código">
        <a
          href="https://github.com/pedrobarros01/nvidia-shares-price"
          target="_blank"
          className="font-light hover:text-red-800 underline text-zinc-100"
        >
          Acesse o nosso GitHub!
        </a>
      </Section>
    </main>
  );
}
