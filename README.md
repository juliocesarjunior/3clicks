# Projeto 3clicks

Este projeto é uma aplicação full-stack com Ruby on Rails 7 para o backend e React para o frontend. O backend está configurado como uma API que interage com um banco de dados PostgreSQL, e o frontend é uma aplicação React que consome essa API.

## Estrutura de Pastas

O projeto está organizado da seguinte forma:


### Descrição

- **Backend (Rails)**: A pasta `back` contém a API desenvolvida com Ruby on Rails. A aplicação está configurada para rodar em um ambiente de desenvolvimento, com o banco de dados PostgreSQL.
  
- **Frontend (React)**: A pasta `front` contém o projeto do frontend, desenvolvido em React. A aplicação consome a API do backend para exibir e interagir com os dados.

### Pré-requisitos

Certifique-se de que os seguintes programas estão instalados em sua máquina:

- **Docker**: Para rodar os containers.
- **Docker Compose**: Para orquestrar os containers.
  
Se você ainda não tem o Docker e o Docker Compose instalados, siga os links para instalar:

- [Instalar Docker](https://docs.docker.com/get-docker/)
- [Instalar Docker Compose](https://docs.docker.com/compose/install/)

### Como Executar o Projeto

1. Clone o repositório para sua máquina local:
   ```bash
   git clone
   ```bash
        https://github.com/juliocesarjunior/3clicks.git
    ```
   cd 3clicks

Executar Inicialmente:

```bash
    docker-compose up --build
```