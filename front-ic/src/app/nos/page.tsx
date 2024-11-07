"use client";

import Section from "@/components/Section";
import Title from "@/components/Title";
import * as React from "react"
import Image, { StaticImageData } from "next/image";
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useState } from "react";
import { BodyIris, PredicaoCluster, ResponseClusterPredict } from "@/types/apiTypes";
import { creatNewPredict, getPredicaoCmeans } from "@/services/cluster/apiClusters";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostPredict } from "@/services/kohonen/apiKohonen";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Antonio from "./antonio.png"
import Luan from "./luan.png"
import Pedro from "./pedro.png"
import Rafael from "./rafael.png"



type Equipe = {
    imagem: StaticImageData,
    nome: string
}
const arrayEquipe: Equipe[] = [
    { imagem: Antonio, nome: 'Antonio Cesar' },
    { imagem: Luan, nome: 'Luan Machado' },
    { imagem: Pedro, nome: 'Pedro Barros' },
    { imagem: Rafael, nome: 'Rafael Luna' }
]


export default function NvidiaPyTorch() {
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
      )
    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Sobre nós
            </Title>
            <br />
            <Section titulo="Sobre a Equipe que Apresentou o Tema de SVM (Support Vector Machines)">
                <p className="">
                    A equipe responsável pela apresentação do tema "Support Vector Machines (SVM)" é composta por quatro integrantes: Antonio Cesar, Pedro Barros, Rafael Luna e Luan Machado. Juntos, eles exploraram o conceito de SVM, uma poderosa técnica de aprendizado de máquina usada para classificação e regressão, destacando suas aplicações práticas e teóricas.
                </p>
                <br />
                <p>
                    Durante a apresentação, os membros da equipe forneceram uma visão abrangente sobre o funcionamento das SVMs, abordando desde os fundamentos matemáticos até a implementação prática. A equipe discutiu como as SVMs são capazes de encontrar o melhor hiperplano para separar classes de dados, além de explorar o uso do kernel para trabalhar com dados não linearmente separáveis.
                </p>
                <br />
                <br />
            </Section>
            <Section titulo="Equipe">
                
                <Carousel
                plugins={[plugin.current]}
                className="mb-5 mx-auto max-w-xs"
                >
                    <CarouselContent >
                        {arrayEquipe.map((value, index) => (
                            <CarouselItem  key={index}>
                                <div>
                                    <Card className="bg-red-900">
                                        <CardContent className="flex aspect-square items-center justify-center p-6 flex-col">
                                            <Image src={value.imagem} alt={value.nome} height={500} width={500} />
                                            <span className="text-lg text-[#ededed] font-bold text-center w-full mt-3">{value.nome}</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                        </CarouselContent>
                    

                </Carousel>
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
