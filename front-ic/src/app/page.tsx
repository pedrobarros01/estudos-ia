import { Menu } from "@/components/Menu";

export interface IArvoreDeEstudos {
  nome: string;
  estudos: IArvoreDeEstudos[] | null;
  rota: string;
}

const ArvoreDeEstudos : IArvoreDeEstudos[] = [
  {
    nome: "Deep Learning",
    estudos: [{
      nome: "Estudo dos preços de ações da Nvidia com TensorFlow",
      rota: "/nvidia-shares/tensorflow",
      estudos: null
    }, {
      nome: "Estudo dos preços de ações da Nvidia com PyTorch",
      rota: "/nvidia-shares/pytorch",
      estudos: null
    }],
    rota: "/deep-learning"
  },
  {
    nome: "CNN Classifier",
    estudos: [{
      nome: "Comparando Gatos, Leões e Tigres com Classificador de Rede Neural Convolucional 😺🦁🐯",
      rota: "/comparing-felines",
      estudos: null
    }],
    rota: "/cnn-classifier"
  },
  {
    nome: "Fuzzy Logic",
    estudos: [
      {
      nome: "Controle de velocidade de um ventilador baseado em Fuzzy System",
      rota: "/system",
      estudos: null
    },
      {
      nome: "Controle de velocidade de um ventilador baseado em Neural Fuzzy",
      rota: "/neural",
      estudos: null
    },
  ],
    rota: "/fuzzy"
  },
  {
    nome: "Unsupervised Learning",
    estudos: [{
      nome: "Cluster",
      rota: "/cluster",
      estudos: [
        {
          nome: "Cluster com K-Means",
          rota: "/k-means",
          estudos: null
        },
        {
          nome: "Cluster com C-Means",
          rota: "/c-means",
          estudos: null
        }
      ]
    },
    {
      nome: "Redes de Kohonen",
      rota: "/kohonen",
      estudos: [
        {
          nome: "SOM com Minisom",
          rota: "/minisom",
          estudos: null
        },
        {
          nome: "SOM com código sem Biblioteca",
          rota: "/som-without-library",
          estudos: null
        }
      ]
    }
  ],
    rota: "/unsupervised-learning"
  }
]

export default function Home() {
  return (
    <main className="flex-grow flex flex-col justify-start items-center w-full pt-3 pb-5 mt-14 px-24">
      <h1 className="text-2xl mb-5 mt-5 text-[#ededed]">
        Escolha qual o estudo que deseja ver !
      </h1>
      <Menu.Card>
        {ArvoreDeEstudos.map((value, index) => {
          return <Menu.Item nome={value.nome} rota={value.rota} filhos={value.estudos} key={index} />;
        })}
      </Menu.Card>
    </main>
  );
}
