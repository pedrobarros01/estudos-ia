    <h1>Projeto de Tópicos Avançados em Inteligência Computacional</h1>
    <p>Este repositório contém um projeto desenvolvido por Antônio César, Rafael Luna, Pedro Barros e Luan Machado, com o objetivo de expor mini projetinhos relacionados à matéria de Tópicos Avançados em Inteligência Computacional, sob a orientação do professor Ariel Almeida.</p>

    <h2>Descrição do Projeto</h2>
    <p>O projeto é dividido em duas partes principais:</p>
    <ul>
        <li><strong>Frontend</strong>: Desenvolvido em Next.js, a interface do usuário apresenta os mini projetos de forma interativa e acessível. O frontend é responsável por consumir as APIs fornecidas pelo backend e exibir os resultados de maneira amigável.</li>
        <li><strong>Backend</strong>: Implementado em Python com FastAPI, o backend gerencia as bases de dados e fornece as rotas necessárias para que o frontend possa acessar os dados e resultados dos projetos.</li>
    </ul>

    <h2>Estrutura do Repositório</h2>
    <pre>

/project-root
│
├── /frontend # Código do frontend em Next.js
│
└── /backend # Código do backend em FastAPI
</pre>

    <h2>Tecnologias Utilizadas</h2>
    <h3>Frontend</h3>
    <ul>
        <li><a href="https://nextjs.org/">Next.js</a> - Framework React para aplicações web</li>
        <li>CSS/Styled Components - Para estilização</li>
    </ul>

    <h3>Backend</h3>
    <ul>
        <li><a href="https://www.python.org/">Python</a> - Linguagem de programação</li>
        <li><a href="https://fastapi.tiangolo.com/">FastAPI</a> - Framework para construir APIs rápidas</li>
        <li><a href="https://www.sqlalchemy.org/">SQLAlchemy</a> - ORM para interagir com o banco de dados</li>
    </ul>

    <h2>Como Executar o Projeto</h2>
    <h3>Pré-requisitos</h3>
    <ul>
        <li>Node.js e npm para o frontend</li>
        <li>Python e pip para o backend</li>
        <li>Um banco de dados (PostgreSQL, MySQL, etc.)</li>
    </ul>

    <h3>Instruções</h3>
    <h4>Backend</h4>
    <ol>
        <li>Navegue até a pasta do backend:
            <pre>cd backend</pre>
        </li>
        <li>Crie um ambiente virtual (opcional, mas recomendado):
            <pre>python -m venv venv</pre>
            <pre>source venv/bin/activate  # No Windows use `venv\Scripts\activate`</pre>
        </li>
        <li>Instale as dependências:
            <pre>pip install -r requirements.txt</pre>
        </li>
        <li>Inicie o servidor:
            <pre>uvicorn main:app --reload</pre>
        </li>
    </ol>

    <h4>Frontend</h4>
    <ol>
        <li>Navegue até a pasta do frontend:
            <pre>cd frontend</pre>
        </li>
        <li>Instale as dependências:
            <pre>npm install</pre>
        </li>
        <li>Inicie o servidor de desenvolvimento:
            <pre>npm run dev</pre>
        </li>
    </ol>

    <h2>Contribuições</h2>
    <p>Sinta-se à vontade para contribuir com melhorias e correções. Abra um pull request ou crie uma issue para discutir mudanças.</p>

    <h2>Licença</h2>
    <p>Este projeto é licenciado sob a MIT License. Veja o arquivo <code>LICENSE</code> para mais detalhes.</p>

    <h2>Contato</h2>
    <p>Para dúvidas ou sugestões, entre em contato com os participantes do projeto:</p>
    <ul>
        <li>Antônio César</li>
        <li>Rafael Luna</li>
        <li>Pedro Barros</li>
        <li>Luan Machado</li>
    </ul>
    <p>Agradecemos a orientação do professor Ariel Almeida por seu apoio e ensinamentos ao longo do desenvolvimento deste projeto.</p>
