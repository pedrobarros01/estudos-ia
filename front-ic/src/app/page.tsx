import { Menu } from "@/components/Menu";

interface EstudoLista {
  nome: string;
  rota: string;
  metodo: string;
}
const Estudos: EstudoLista[] = [
  {
    nome: "Estudo dos preços de ações da Nvidia com TensorFlow",
    rota: "/deep-learning/nvidia-shares/tensorflow",
    metodo: "DeepLearning",
  },
  {
    nome: "Estudo dos preços de ações da Nvidia com PyTorch",
    rota: "/deep-learning/nvidia-shares/pytorch",
    metodo: "DeepLearning",
  },
  {
    nome: "Comparando Gatos, Leões e Tigres com Classificador de Rede Neural Convolucional 😺🦁🐯",
    rota: "/cnn-classifier/comparing-felines",
    metodo: "CNN",
  },
];

export default function Home() {
  return (
    <main className="flex-grow flex flex-col justify-start items-center w-full pt-3 pb-5 mt-14">
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
