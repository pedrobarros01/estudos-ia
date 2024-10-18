import { Menu } from "@/components/Menu";
import Image from "next/image";

interface EstudoLista {
  nome: string;
  rota: string;
  metodo: string;
}
const Estudos: EstudoLista[] = [
  {
    nome: "Estudo dos preços de ações da Nvidia com tensorflow",
    rota: "/deep-learning/nvidia-shares-tensorflow",
    metodo: "DeepLearning",
  },
  {
    nome: "Estudo dos preços de ações da Nvidia",
    rota: "/deep-learning/nvidia",
    metodo: "DeepLearning",
  },
  {
    nome: "Estudo dos preços de ações da Nvidia",
    rota: "/deep-learning/nvidia",
    metodo: "DeepLearning",
  },
  {
    nome: "Estudo dos preços de ações da Nvidia",
    rota: "/deep-learning/nvidia",
    metodo: "DeepLearning",
  },
  {
    nome: "Estudo dos preços de ações da Nvidia",
    rota: "/deep-learning/nvidia",
    metodo: "DeepLearning",
  },
];

export default function Home() {
  return (
    <main className="flex-grow flex flex-col justify-start items-center w-full pt-3 pb-5">
      <h1 className="text-2xl mb-5 mt-5">
        Escolha qual o estudo que deseja ver !
      </h1>
      <Menu.Card>
        {Estudos.map((value, index) => {
          return <Menu.Item nome={value.nome} rota={value.rota} key={index} />;
        })}
      </Menu.Card>
    </main>
  );
}
