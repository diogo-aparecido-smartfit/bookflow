# BookFlow

BookFlow é um sistema de gerenciamento de biblioteca que permite catalogar, rastrear e gerenciar uma coleção de livros. O sistema é composto por um backend em Go com uma API RESTful e um frontend em React com TypeScript.

![BookFlow Logo](./assets/bookflow-logo.png)

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Requisitos](#requisitos)
- [Configuração e Execução](#configuração-e-execução)
  - [Com Docker](#com-docker)
  - [Sem Docker](#sem-docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [API Endpoints](#api-endpoints)
- [Autenticação](#autenticação)
- [Contribuição](#contribuição)
- [Licença](#licença)

## 🔍 Visão Geral

BookFlow é um sistema completo para gerenciamento de livros, permitindo que usuários cataloguem livros, rastreiem empréstimos e gerenciem seu acervo. O sistema utiliza arquitetura limpa e padrões modernos de desenvolvimento de software.

## ✨ Funcionalidades

- **Gestão de Usuários**: Registro, autenticação e gerenciamento de perfis
- **Catálogo de Livros**: Adicionar, editar e remover livros
- **Status de Livros**: Rastreamento de livros (disponível, emprestado, perdido)
- **Interface Intuitiva**: Frontend responsivo e amigável
- **API RESTful**: Backend robusto e bem documentado

## 🛠️ Tecnologias

### Backend

- **Go**: Linguagem de programação
- **Gin**: Framework web
- **PostgreSQL**: Banco de dados relacional
- **SQLX**: Biblioteca de acesso a dados
- **Swagger**: Documentação da API
- **Docker**: Containerização

### Frontend

- **React**: Biblioteca JavaScript para construção de interfaces
- **TypeScript**: Superset tipado de JavaScript
- **TailwindCSS**: Framework CSS utilitário
- **React Router**: Roteamento no lado do cliente
- **Axios**: Cliente HTTP

## 📋 Requisitos

Para executar o projeto sem Docker, você precisará:

- Go 1.24+
- Node.js 20+
- npm 10+ ou yarn
- PostgreSQL 15+

Para executar com Docker:

- Docker
- Docker Compose

## 🚀 Configuração e Execução

### Com Docker

A maneira mais simples de executar o BookFlow é usando Docker Compose:

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/bookflow.git
   cd bookflow
   ```

2. Inicie os serviços:

   ```bash
   # Para ambiente de produção
   docker-compose up -d

   # Para ambiente de desenvolvimento com hot-reload
   docker-compose -f docker-compose.dev.yml up -d
   ```

3. Acesse:

   - Frontend: http://localhost:3000
   - API: http://localhost:8080/api
   - Swagger: http://localhost:8080/swagger/index.html

4. Para parar os serviços:
   ```bash
   docker-compose down
   # ou
   docker-compose -f docker-compose.dev.yml down
   ```

### Sem Docker

#### Backend

1. Configure o PostgreSQL:

   ```bash
   # Crie um banco de dados para o projeto
   createdb bookflow

   # Importe o esquema inicial (opcional)
   psql -d bookflow -f backend/db/init.sql
   ```

2. Configure o arquivo de ambiente:

   ```bash
   cd backend
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

3. Instale as dependências e execute:

   ```bash
   go mod download

   # Para desenvolvimento com hot-reload
   go install github.com/air-verse/air@latest
   air

   # Ou para executar normalmente
   go run cmd/server/main.go
   ```

4. O servidor estará disponível em http://localhost:8080

#### Frontend

1. Configure o ambiente:

   ```bash
   cd web
   cp .env.example .env
   # Edite o arquivo .env se necessário
   ```

2. Instale as dependências e execute:

   ```bash
   npm install
   # ou
   yarn

   # Para desenvolvimento
   npm run dev
   # ou
   yarn dev
   ```

3. O frontend estará disponível em http://localhost:3000

## 📁 Estrutura do Projeto

O projeto segue os princípios de Clean Architecture:

```
bookflow/
├── backend/                # API em Go
│   ├── cmd/                # Pontos de entrada da aplicação
│   ├── docs/               # Documentação gerada pelo Swagger
│   ├── internal/           # Código interno da aplicação
│   │   ├── domain/         # Entidades e regras de negócio
│   │   ├── handler/        # Manipuladores HTTP (Controllers)
│   │   │   └── dto/        # Data Transfer Objects
│   │   ├── repository/     # Acesso a dados
│   │   ├── usecase/        # Casos de uso
│   │   └── infra/          # Infraestrutura (config, database)
│   ├── migrations/         # Migrações do banco de dados
│   └── db/                 # Scripts iniciais do banco
└── web/                    # Frontend em React
    ├── public/             # Arquivos estáticos
    └── src/                # Código fonte
        ├── api/            # Serviços de API
        ├── components/     # Componentes reutilizáveis
        ├── pages/          # Páginas da aplicação
        └── types/          # Definições de tipos TypeScript
```

## 🔌 API Endpoints

A API oferece os seguintes endpoints principais:

### Autenticação

- `POST /api/login`: Autenticar usuário
- `POST /api/register`: Registrar novo usuário

### Usuários

- `GET /api/users`: Listar usuários
- `GET /api/users/{id}`: Obter usuário por ID
- `POST /api/users`: Criar usuário
- `PUT /api/users/{id}`: Atualizar usuário
- `DELETE /api/users/{id}`: Remover usuário

### Livros

- `GET /api/books`: Listar livros
- `GET /api/books/{id}`: Obter livro por ID
- `POST /api/books`: Adicionar livro
- `PUT /api/books/{id}`: Atualizar livro
- `DELETE /api/books/{id}`: Remover livro

Para uma documentação completa da API, acesse o Swagger em http://localhost:8080/swagger/index.html quando o backend estiver em execução.

## 🔐 Autenticação

O sistema utiliza autenticação baseada em tokens JWT. Para acessar endpoints protegidos:

1. Obtenha um token através do endpoint `/api/login`
2. Inclua o token no cabeçalho das requisições:
   ```
   Authorization: Bearer seu-token-aqui
   ```

## 🤝 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Desenvolvido com ❤️
