# Sistema de Gerenciamento de Tarefas - Backend

Este é o backend para o sistema de gerenciamento de tarefas, desenvolvido usando NestJS. O projeto segue a arquitetura de microsserviços e utiliza PostgreSQL para armazenamento de tarefas e MongoDB para logs de alterações.

## Arquitetura dos Microsserviços

### Estrutura do Projeto

O backend é dividido em diversos módulos, cada um responsável por uma parte específica da aplicação. A estrutura do projeto é a seguinte:

- **`src/auth`**: Módulo de autenticação.
  - **`auth.controller.ts`**: Controlador para endpoints de autenticação.
  - **`auth.service.ts`**: Serviço de autenticação, incluindo login e registro.
  - **`auth.module.ts`**: Módulo de autenticação.
  
- **`src/tasks`**: Módulo de gerenciamento de tarefas.
  - **`tasks.controller.ts`**: Controlador para endpoints de tarefas (CRUD).
  - **`tasks.service.ts`**: Serviço para manipulação de tarefas.
  - **`tasks.module.ts`**: Módulo de gerenciamento de tarefas.
  - **`entities/task.entity.ts`**: Entidade de tarefa para o PostgreSQL.
  
- **`src/logs`**: Módulo de logs.
  - **`logs.service.ts`**: Serviço para criação e gerenciamento de logs.
  - **`logs.module.ts`**: Módulo de logs.

- **`src/app.module.ts`**: Módulo principal da aplicação, que importa todos os módulos necessários.
- **`src/main.ts`**: Arquivo de entrada da aplicação.

### Endpoints

#### Autenticação

- **`POST /auth/register`**: Registro de novo usuário.
- **`POST /auth/login`**: Login de usuário e geração de token JWT.

#### Tarefas

- **`GET /tasks`**: Listar todas as tarefas.
- **`POST /tasks`**: Criar uma nova tarefa.
- **`GET /tasks/:id`**: Obter uma tarefa específica.
- **`PUT /tasks/:id`**: Atualizar uma tarefa existente.
- **`DELETE /tasks/:id`**: Excluir uma tarefa.

### Banco de Dados

- **PostgreSQL**: Usado para armazenar informações sobre tarefas.
  - Tabela: `tasks`
    - `id`: Identificador único da tarefa.
    - `title`: Título da tarefa.
    - `description`: Descrição da tarefa.
    - `status`: Status da tarefa (pendente, em progresso, concluído, cancelado).
    - `timestamp`: Data e hora da criação da tarefa.

- **MongoDB**: Usado para armazenar logs de alterações.
  - Coleção: `logs`
    - `action`: Ação realizada (CREATE, UPDATE, DELETE).
    - `details`: Detalhes da ação.

## Testes Implementados

Os testes foram implementados para garantir o correto funcionamento das principais funcionalidades do sistema. Abaixo estão os detalhes dos testes:

- **Testes Unitários**: Testam funções e métodos individuais.
  - Testes para serviços de autenticação.
  - Testes para serviços de tarefas.
  - Testes para criação e gerenciamento de logs.

- **Testes de Integração**: Testam a integração entre diferentes partes do sistema.
  - Testes para endpoints de autenticação.
  - Testes para endpoints de tarefas.
  - Testes para integração com bancos de dados.

### Rodando o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/cesarfilho91/teste-zhavia.git

npm install

Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias, como DATABASE_URL para PostgreSQL e MONGODB_URL para MongoDB.

### Inicie o servidor:

Para desenvolvimento:
npm run start:dev

Para produção:
npm run start:prod

Execute os testes:
npm run test:e2e


Este modelo cobre a estrutura do projeto, os endpoints disponíveis, a configuração do banco de dados, e instruções sobre como rodar e testar o projeto. Ajuste os detalhes conforme necessário para refletir as especificidades do seu projeto.