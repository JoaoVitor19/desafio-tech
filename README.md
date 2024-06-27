## Descrição do Projeto

Este projeto consiste em um sistema de cadastro de desenvolvedores e níveis, desenvolvido com Laravel para o backend e Next.js para o frontend. 
A aplicação inclui funcionalidades de CRUD (Create, Read, Update, Delete) com paginação e busca por nome. 
Toda a aplicação é containerizada utilizando Docker.

## Requisitos
- Docker
- Docker Compose

### Passo a Passo para Configuração e Execução

1. **Clone o repositório:**
    ```bash
    git clone https://github.com/JoaoVitor19/desafio-tech.git
    cd desafio-tech
    ```

2. **Suba os containers Docker:**
    ```bash
    docker-compose up -d
    ```

3. **A aplicação estará disponível nos seguintes endereços:**
- Backend (Laravel): http://localhost:8000
- Frontend (Next.js): http://localhost:3000

## Acesso ao Site Online
O projeto também está disponível online no seguinte endereço:
https://desafio-tech-git-frontend-joaovitor19s-projects.vercel.app

## Funcionalidades Implementadas
- CRUD de desenvolvedores e níveis
- Paginação
- Busca por nome
- Listagems
- Componentização

## Tecnologias Utilizadas
- Laravel
- Next.js
- MySQL
- Docker
- Docker Compose

## Plataformas de Implantação
- Backend e Banco de Dados: Google Cloud Platform (GCP)
- Frontend: Vercel
