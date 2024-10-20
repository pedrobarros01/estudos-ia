interface CardProps {
  conteudo: string | number;
  titulo: string;
}

export default function Card(props: CardProps) {
  return (
    <div className="bg-red-900 flex flex-col items-center justify-center p-3 rounded-lg text-center">
      <span className="text-md">{props.titulo}</span>
      <div className="bg-zinc-100 text-zinc-950 w-full text-center rounded-md mt-1">
        <span>{props.conteudo}</span>
      </div>
    </div>
  );
}
