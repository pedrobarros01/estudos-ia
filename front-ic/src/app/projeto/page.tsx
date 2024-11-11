"use client";
import Section from "@/components/Section";
import Title from "@/components/Title";

export default function AboutProject() {

    return (
        <main className="px-32 mt-20 flex-grow text-zinc-100">
            <Title>
                Sobre o Projeto 🚀
            </Title>
            <br />
            <Section titulo="🔍 Visão Geral do Projeto">
                <p>
                    Este projeto web foi criado para ser um <b className="text-yellow-700">repositório organizado e acessível</b> dos roteiros de aulas e atividades da disciplina "Tópicos Avançados em Inteligência Computacional". A plataforma facilita o acesso aos conteúdos da matéria, permitindo que alunos e interessados <b className="text-yellow-700">explorem e revisem</b> o material de forma prática e intuitiva. 📚
                </p>
            </Section>
            <br />
            <Section titulo="✨ Funcionalidades Principais">
                <ul className="list-disc ml-5">
                    <li>🎯 <b className="text-yellow-700">Navegação intuitiva</b> para encontrar tópicos e materiais específicos das aulas.</li>
                    <li>📅 Organização de roteiros por <b className="text-yellow-700">tema ou tipo de atividade</b>.</li>
                    <li>📈 Possibilidade de acompanhamento do <b className="text-yellow-700">progresso das aulas</b>.</li>
                    <li>📥 <b className="text-yellow-700">Adição fácil</b> de novos materiais, mantendo o repositório sempre atualizado.</li>
                    <li>🔄 Uma experiência dinâmica e acessível, focada no usuário e na praticidade.</li>
                </ul>
            </Section>
            <br />
            <Section titulo="🌟 Benefícios para os Alunos">
                <p>
                    A plataforma foi projetada para ser uma <b className="text-yellow-700">ferramenta de apoio contínuo</b>, centralizando todos os materiais de forma colaborativa. Os alunos podem acessar rever conceitos e consultar atividades passadas, <b className="text-yellow-700">maximizando o aprendizado</b> e otimizando o tempo de estudo. 🎓
                </p>
            </Section>
            <br />
            <Section titulo="👨‍💻 Confira nosso Código!">
                <a
                    href="https://github.com/pedrobarros01/estudos-ia"
                    target="_blank"
                    className="font-light hover:text-yellow-800 underline text-zinc-100 italic"
                >
                    🔗 Acesse nosso repositório no GitHub!
                </a>
            </Section>
        </main>
    );
}
