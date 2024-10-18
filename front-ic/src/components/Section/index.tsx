import { ReactNode } from "react";

interface SectionProps {
  titulo: string;
  children: ReactNode;
}

export default function Section({ titulo, children }: SectionProps) {
  return (
    <section className="mb-5">
      <hr />
      <br />
      <h2 className="text-zinc-100 text-2xl">{titulo}</h2>
      <br />
      {children}
    </section>
  );
}
