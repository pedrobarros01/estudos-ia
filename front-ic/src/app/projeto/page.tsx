"use client";
import Section from "@/components/Section";
import Title from "@/components/Title";

export default function AboutProject() {

    return (
        <main className="px-32 mt-20 flex-grow">
            <Title>
            Sobre o Projeto 😎
            </Title>
            <br />
            <Section titulo="Sobre o Projeto Web de Repositório de Roteiros de Tópicos Avançados em Inteligência Computacional">
                <p className="">
                    O projeto web desenvolvido tem como objetivo servir como repositório para armazenar e compartilhar os roteiros das aulas e atividades realizadas na disciplina "Tópicos Avançados em Inteligência Computacional". Esta plataforma foi projetada para fornecer acesso fácil e organizado ao conteúdo abordado ao longo da matéria, permitindo que os alunos e interessados acessem, revisem e aprendam com os materiais apresentados durante o curso.
                </p>
                <br />
                <p>
                    O sistema foi construído para proporcionar uma navegação simples, com a possibilidade de consultar os roteiros de forma intuitiva. A interface permite a busca por tópicos específicos abordados em cada aula, e o acesso aos materiais de forma estruturada, com a organização dos roteiros por tema, data ou tipo de atividade. A plataforma foi concebida para ser dinâmica, garantindo que os alunos possam acompanhar o progresso das aulas e realizar consultas rápidas a conteúdos relevantes.
                </p>
                <br />
                <p>
                    Além de armazenar roteiros, o projeto também permite que novos materiais sejam facilmente adicionados, mantendo a atualização constante com os conteúdos mais recentes. A ideia principal é facilitar o estudo e a pesquisa por parte dos alunos, além de servir como um repositório centralizado para consultas futuras. A aplicação foi pensada para ser acessível e eficiente, com foco na experiência do usuário, oferecendo uma maneira organizada e prática de consultar o conteúdo da disciplina.
                </p>
                <br />
                <p>
                    O projeto está em constante evolução e busca integrar novas funcionalidades conforme necessário. Seu objetivo é tornar o aprendizado de Tópicos Avançados em Inteligência Computacional mais acessível, com uma plataforma que centralize todo o material didático de forma colaborativa e atualizada, permitindo aos alunos um melhor aproveitamento do conteúdo e das atividades propostas ao longo do semestre.
                </p>
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
