# Projeto de Tópicos Avançados em Inteligência Computacional

Este repositório contém um projeto desenvolvido por Antônio César, Rafael Luna, Pedro Barros e Luan Machado, com o objetivo de expor projetos relacionados à matéria de Tópicos Avançados em Inteligência Computacional, sob a orientação do professor Ariel Almeida.

## Descrição do Projeto

- **front-ic**: Desenvolvido em Next.js, a interface do usuário apresenta os mini projetos de forma interativa e acessível. O frontend é responsável por consumir as APIs fornecidas pelo backend e exibir os resultados de maneira amigável.

- **back-ic**: Implementado em Python com FastAPI, o backend gerencia as bases de dados e fornece as rotas necessárias para que o frontend possa acessar os dados e resultados dos projetos.

## Tecnologias Utilizadas

### Frontend

- [Next.js](https://nextjs.org/) - Framework React para aplicações web

### Backend

- [Python](https://www.python.org/) - Linguagem de programação
- [FastAPI](https://fastapi.tiangolo.com/) - Framework para construir APIs rápidas

## Rodar o projeto
1. É necessário ter o python `3.11.0` e a versão `LTS` do node
2. Para instalar as dependencias do backend: 
    - `python -m venv .venv`
    - `pip install -r requirements.txt`
    - `pip install fuzzy-c-means`
3. Para rodar o back, va até a pasta `back-ic` e rode: `fastapi dev main.py` (esteja com a venv ativada)
4. Para instalar as dependências do `front-ic`, va ate a pasta `front-ic` e rode `npm i`
5. Para rodar o front de o comando `npm run dev`

## Observações
O cnn_classifier_bird_drones não tem o modelo treinado por conta do peso do arquivo, para poder utiliza-lo você deverá executar o treino novamente na pasta `back-ic` rodando o comando `python -m cnn_classifier_bird_drones.cnn_classifier.fine_tune`, mas você deverá colocar as imagens de passaro e drones na pasta imgs: https://www.kaggle.com/datasets/imbikramsaha/drone-bird-classification. Ou você poderá baixar o modelo treinado pela equipe por esse link: https://drive.google.com/drive/folders/1OgxI_utW93PDyf6WnlP9yJPZL7UbVkY0?usp=sharing


## Video de demonstração


