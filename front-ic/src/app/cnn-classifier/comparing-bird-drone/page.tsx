"use client";
import Card from "@/components/Card";
import Section from "@/components/Section";
import Title from "@/components/Title";

import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { PredicaoGatoLeaoTigre } from "@/types/apiTypes";
import { getPredicaoBirdDrone } from "@/services/cnn_classifier/apiBirdDrone";

type PredicaoParams = {
  file: FileList;
};

export default function ComparingFelines() {
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
        const data = await getPredicaoBirdDrone(dadosForm.file[0]);
        setPredicao(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="px-32 mt-20 flex-grow">
      <Title>
        Classificador de Rede Neural Convolucional {"(CNN)"} comm Transfer Learning com o VGG16:<br />
        Comparando Passaros e Drones 🐦 🤖
      </Title>
      <br />
      <Section titulo="Classificador de Rede Neural Convolucional (CNN) com Transfer Learning">
        <p className="">
          O classificador de rede neural convolucional (CNN) com transfer learning utilizando a arquitetura VGG16 foi implementado para diferenciar imagens de pássaros e drones, proporcionando uma abordagem eficiente e robusta. A transfer learning permite o reaproveitamento de uma rede pré-treinada, como a VGG16, que foi inicialmente desenvolvida e treinada em um vasto conjunto de dados do ImageNet. Essa estratégia reduz significativamente o tempo de treinamento e aumenta a precisão, pois a rede já possui pesos ajustados para detectar uma variedade de padrões visuais complexos.
        </p>
        <br />
        <p>
          A VGG16, com suas 16 camadas de convolução e pooling, é conhecida por sua capacidade de extrair características detalhadas de imagens, como bordas, texturas e formas. Ao adaptar essa arquitetura para a tarefa de classificação de pássaros e drones, o modelo passa a reconhecer as particularidades de cada classe com alta precisão. Essa distinção é especialmente relevante para aplicações que exigem a identificação precisa em cenários dinâmicos, como a segurança aérea e o monitoramento de espaços abertos.
        </p>
        <br />
        <p>
          Com a utilização do transfer learning, a CNN é ajustada para identificar características específicas que diferenciam pássaros de drones, mesmo em condições de luz variadas e contextos complexos. Isso permite que o modelo apresente um desempenho otimizado, aproveitando a base de conhecimento prévia da VGG16, mas com refinamentos focados no conjunto de dados especializado. O resultado é um classificador rápido e confiável, capaz de contribuir para soluções modernas em vigilância e reconhecimento de imagens.
        </p>
    </Section>

      <Section titulo="Sobre o Desempenho da Inteligência Artificial">
        <div className="grid md:grid-cols-2 gap-8">
          <Image
            src="http://127.0.0.1:8000/cnn_classifier_bird_drone/images_treino/accuracy_cnn_classifier_bird_drone.png"
            alt="Acurácia do Modelo"
            width={1920}
            height={1080}
            className="w-auto h-auto"
          />
          <Image
            src="http://127.0.0.1:8000/cnn_classifier_bird_drone/images_treino/loss_cnn_classifier_bird_drone.png"
            alt="Perda do Modelo"
            width={1920}
            height={1080}
            className="w-auto h-auto"
          />
        </div>
      </Section>

      <Section titulo="Agora é sua vez! 🐦 🤖">
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
