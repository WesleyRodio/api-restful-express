# 📚 Library API RESTful

Uma API RESTful completa para gerenciamento de biblioteca digital, desenvolvida com **Node.js**, **Express 5** e **PostgreSQL**.

![Node.js](https://img.shields.io/badge/Node.js-24.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-7.x-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=for-the-badge&logo=amazon-s3&logoColor=white)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando](#-executando)
- [Endpoints](#-endpoints)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Modelo de Dados](#-modelo-de-dados)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

Esta API foi desenvolvida para gerenciar um sistema de biblioteca digital completo, incluindo:

- 👤 **Usuários** - Cadastro e autenticação com diferentes níveis de acesso
- 📖 **Livros** - Catálogo completo com suporte a PDF e capas
- ✍️ **Autores** - Gerenciamento de autores e biografias
- 🏷️ **Categorias** - Organização por gêneros/categorias
- 📤 **Empréstimos** - Controle de empréstimos e devoluções
- ⭐ **Avaliações** - Sistema de reviews dos livros
- ☁️ **Upload de Arquivos** - Integração com AWS S3

---

## 🚀 Tecnologias

### Core
- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[Express 5](https://expressjs.com/)** - Framework web minimalista
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados relacional
- **[Prisma ORM](https://www.prisma.io/)** - ORM moderno para Node.js

### Segurança
- **[Helmet](https://helmetjs.github.io/)** - Proteção de headers HTTP
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Hash de senhas
- **[JWT](https://jwt.io/)** - Autenticação via tokens
- **[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)** - Limitação de requisições

### Cloud & Storage
- **[AWS S3](https://aws.amazon.com/s3/)** - Armazenamento de arquivos
- **[Multer](https://www.npmjs.com/package/multer)** - Upload de arquivos

### Validação & Qualidade
- **[Zod](https://zod.dev/)** - Validação de schemas
- **[ESLint](https://eslint.org/)** - Linting de código
- **[Prettier](https://prettier.io/)** - Formatação de código

### Logging
- **[Pino](https://getpino.io/)** - Logger de alta performance

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura modular baseada em **camadas**:

```
┌─────────────────────────────────────────────────────────────┐
│                        Routes                               │
│              (Definição de rotas e middlewares)             │
├─────────────────────────────────────────────────────────────┤
│                      Controllers                            │
│         (Validação de entrada e orquestração)               │
├─────────────────────────────────────────────────────────────┤
│                       Services                              │
│              (Regras de negócio)                            │
├─────────────────────────────────────────────────────────────┤
│                     Repositories                            │
│            (Acesso ao banco de dados)                       │
├─────────────────────────────────────────────────────────────┤
│                    Prisma + PostgreSQL                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalação

### Pré-requisitos

- Node.js 24.x ou superior
- PostgreSQL 16.x
- pnpm (recomendado) ou npm
- Conta AWS (para S3)

### Clonando o repositório

```bash
git clone https://github.com/seu-usuario/API-RESTful.git
cd API-RESTful
```

### Instalando dependências

```bash
pnpm install
```

---

## ⚙️ Configuração

### 1. Variáveis de ambiente

Copie o arquivo de exemplo e configure suas variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Application
APP_VERSION=1.0.0
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"

# AWS S3
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=seu_account_id
AWS_ACCESS_KEY_ID=sua_access_key
AWS_ACCESS_KEY_ID_SECRET=sua_secret_key
AWS_BUCKET_NAME=nome_do_bucket
```

### 2. Banco de dados

Execute as migrations do Prisma:

```bash
# Gerar o client do Prisma
pnpm prisma generate

# Aplicar migrations
pnpm prisma migrate dev
```

### 3. AWS S3

Certifique-se de que o usuário IAM tem permissões para:
- `s3:CreateBucket`
- `s3:PutObject`
- `s3:GetObject`
- `s3:DeleteObject`
- `s3:ListBucket`

---

## ▶️ Executando

### Desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em `http://localhost:3000`

### Produção

```bash
pnpm start
```

---

## 📡 Endpoints

### Users

| Método | Endpoint            | Descrição                              |
| ------ | ------------------- | -------------------------------------- |
| `GET`  | `/users`            | Lista todos os usuários                |
| `GET`  | `/users/:id`        | Busca usuário por ID                   |
| `POST` | `/users`            | Cria um novo usuário                   |
| `PUT`  | `/users/:id`        | Atualiza dados do usuário              |
| `PUT`  | `/users/:id/avatar` | Upload de avatar (multipart/form-data) |

### Exemplo de requisição

```bash
# Criar usuário
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123"
  }'
```

### Exemplo de resposta

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@email.com",
    "role": "READER",
    "createdAt": "2026-01-08T12:00:00.000Z"
  }
}
```

---

## 📁 Estrutura do Projeto

```
API-RESTful/
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   └── migrations/          # Histórico de migrations
├── src/
│   ├── config/              # Configurações (env, database, s3)
│   ├── generated/           # Cliente Prisma gerado
│   ├── helpers/             # Utilitários (logger, multer, responses)
│   ├── modules/             # Módulos da aplicação
│   │   ├── schemas/         # Schemas de validação (Zod)
│   │   └── users/           # Módulo de usuários
│   │       ├── users.controller.js
│   │       ├── users.service.js
│   │       ├── users.repository.js
│   │       └── users.routes.js
│   ├── plugins/             # Plugins do Express
│   ├── routes/              # Agregador de rotas
│   ├── shared/              # Código compartilhado
│   │   ├── error/           # Classes de erro customizadas
│   │   ├── middlewares/     # Middlewares globais
│   │   └── utils/           # Utilitários
│   └── server.js            # Entry point
├── types/                   # Definições de tipos TypeScript
├── .env.example             # Exemplo de variáveis de ambiente
├── package.json
└── README.md
```

---

## 🗃️ Modelo de Dados

```mermaid
erDiagram
    User ||--o{ Loan : has
    User ||--o{ Review : writes
    Book ||--o{ Loan : has
    Book ||--o{ Review : has
    Book }o--|| Author : written_by
    Book }o--|| Category : belongs_to

    User {
        uuid id PK
        string name
        string password_hash
        string email UK
        enum role
        string avatar
        datetime createdAt
        datetime updatedAt
    }

    Book {
        uuid id PK
        string title
        uuid authorId FK
        string description
        string isbn UK
        string cape
        string pdf
        uuid categoryId FK
        datetime createdAt
        datetime updatedAt
    }

    Author {
        uuid id PK
        string name
        string bio
        string photo
        datetime createdAt
        datetime updatedAt
    }

    Category {
        uuid id PK
        string name UK
        datetime createdAt
        datetime updatedAt
    }

    Loan {
        uuid id PK
        uuid userId FK
        uuid bookId FK
        datetime loanDate
        datetime returnDate
        datetime createdAt
        datetime updatedAt
    }

    Review {
        uuid id PK
        uuid userId FK
        uuid bookId FK
        int rating
        string comment
        datetime createdAt
        datetime updatedAt
    }
```

### Roles de Usuário

| Role        | Descrição                                             |
| ----------- | ----------------------------------------------------- |
| `READER`    | Pode requisitar empréstimos de livros e fazer reviews |
| `LIBRARIAN` | Gerencia livros, autores, categorias e empréstimos    |
| `ADMIN`     | Acesso total ao sistema                               |

---

## 🔒 Segurança

Este projeto implementa diversas camadas de segurança:

- ✅ **Helmet** - Headers HTTP seguros
- ✅ **Rate Limiting** - Proteção contra DDoS
- ✅ **bcrypt** - Hash de senhas com salt
- ✅ **Validação de entrada** - Zod schemas
- ✅ **Variáveis de ambiente** - Credenciais fora do código
- ✅ **CORS** - Controle de origens permitidas

---

## ‍👨‍💻 Autor

<div align="center">
  <img src="https://github.com/WesleyRodio.png" width="150" style="border-radius: 50%;" alt="Wesley Nicolas da Cruz Rodio"/>

  ### Wesley Nicolas da Cruz Rodio

  **Desenvolvedor Backend** | Node.js | AWS | PostgreSQL

  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wesley-rodio-010335375/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/WesleyRodio)
  [![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://x.com/JapaScript__)
  [![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/japascript__/)

</div>

---

<div align="center">

  ⭐ Se este projeto te ajudou, considere dar uma estrela!

  Feito com ❤️ por [Wesley Nicolas da Cruz Rodio](https://github.com/WesleyRodio)

</div>
