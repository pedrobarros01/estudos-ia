"use client";
import Card from "@/components/Card";
import Accuracy from "./accuracy_cnn_classifier.png";
import Loss from "./loss_cnn_classifier.png";
import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { getPredicao } from "@/services/cnn_classifier/apiCatLionTiger";
import { PredicaoGatoLeaoTigre } from "@/types/apiTypes";

type PredicaoParams = {
  file: FileList;
};

export default function NvidiaPyTorch() {
  const [predicao, setPredicao] = useState<PredicaoGatoLeaoTigre>();
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<PredicaoParams>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagemPreview(URL.createObjectURL(file));
      setPredicao(undefined);
    }
  };

  const onSubmit: SubmitHandler<PredicaoParams> = async (dadosForm) => {
    if (dadosForm.file && dadosForm.file[0]) {
      try {
        const data = await getPredicao(dadosForm.file[0]);
        setPredicao(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="px-32 mt-20 flex-grow">
      <Title>
        Classificador de Rede Neural Convolucional {"(CNN)"}:<br />
        Comparando Gatos, Leões e Tigres! 😺🦁🐯
      </Title>
      <br />
      <Section titulo="Sobre a Base de Dados">
        <p className="">
          O modelo de rede neural convolucional (CNN) foi desenvolvido para
          classificar e identificar imagens de gatos, tigres e leões, utilizando
          uma abordagem moderna de deep learning. Este tipo de rede neural foi
          treinado com um vasto conjunto de dados de imagens desses animais,
          garantindo precisão na distinção de cada espécie. As CNNs são
          amplamente reconhecidas por seu papel na análise de imagens, pois são
          capazes de detectar padrões visuais com alta eficiência.
        </p>
        <br />
        <p>
          Com camadas especializadas que extraem características únicas das
          imagens, como formas e texturas, a CNN consegue identificar e
          diferenciar até mesmo sutis particularidades entre gatos, tigres e
          leões. Esse modelo de inteligência artificial permite uma
          classificação rápida e confiável, ideal para aplicações que necessitam
          de análises visuais precisas, trazendo o melhor da tecnologia de deep
          learning para o reconhecimento de imagens de felinos.
        </p>
      </Section>
      <Section titulo="Sobre o Desempenho da Inteligência Artificial">
        <div className="grid md:grid-cols-2 gap-8">
          <Image
            src={Accuracy}
            alt="Acurácia do Modelo"
            width={1920}
            height={1080}
            className="w-auto h-auto"
          />
          <Image
            src={Loss}
            alt="Perda do Modelo"
            width={1920}
            height={1080}
            className="w-auto h-auto"
          />
        </div>
      </Section>

      <Section titulo="Agora é sua vez! 😺🦁🐯">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <form
            className="w-full md:w-4/5 mt-2 "
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="border p-5 rounded-lg border-dotted">
              <h3 className="text-lg">Insira a Imagem que deseja verificar!</h3>
              <br />
              <input
                className="w-full text-zinc-100 rounded-sm px-2 py-1"
                type="file"
                {...register("file", { required: true })}
                onChange={(e) => {
                  handleFileChange(e);
                }}
              />
            </div>
            <button className="w-full bg-red-900 hover:bg-red-400 text-zinc-100 rounded-sm mt-3 py-1 max-h-14">
              Enviar!
            </button>
          </form>
          {imagemPreview && (
            <div className="w-full flex items-start justify-start flex-col md:w-auto mt-5 md:mt-0">
              <h3 className="text-lg">Pré-visualização da Imagem:</h3>
              <Image
                src={imagemPreview}
                width={300}
                height={300}
                alt="Pré-visualização da imagem selecionada"
                className="mt-3 border rounded-lg"
              />
              <br />
              {predicao && (
                <Card
                  titulo="Resultado da Predição:"
                  conteudo={"Eu acho que é um " + `${predicao.predict}!`}
                />
              )}
            </div>
          )}
        </div>
      </Section>

      <Section titulo="Confira nosso Código!">
        <a
          href="https://github.com/DhellionFena/cnn-classifier"
          target="_blank"
          className="font-light hover:text-red-800 underline text-zinc-100 italic"
        >
          Acesse aqui o nosso repositório no GitHub!
        </a>
      </Section>
    </main>
  );
}
