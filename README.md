# Sistema de Gerenciamento de Tarefas para Equipes

## 1. Linguagem e Stack Utilizadas

### Frontend
- **Linguagem:** JavaScript/TypeScript
- **Framework:** Next.js
- **Bibliotecas:**
  - **React:** Biblioteca principal para construção da interface de usuário.
  - **axios:** Biblioteca para realizar requisições HTTP ao backend.
  - **zustand:** Biblioteca para gerenciamento de estado global.
  - **socket.io-client:** Biblioteca para comunicação em tempo real via WebSocket.

### Backend
- **Linguagem:** TypeScript
- **Framework:** NestJS
- **Banco de Dados:**
  - PostgreSQL
  - MongoDB
- **Bibliotecas:**
  - **TypeORM:** ORM para interação com PostgreSQL.
  - **Mongoose:** Biblioteca para interação com MongoDB.
  - **bcrypt:** Biblioteca para hashing de senhas.
  - **passport-jwt:** Estratégia de autenticação JWT com Passport.
  - **socket.io:** Biblioteca para comunicação em tempo real via WebSocket.

## 2. Funcionamento

O **Sistema de Gerenciamento de Tarefas para Equipes** tem como objetivo facilitar a gestão e o acompanhamento de tarefas dentro de uma equipe. A aplicação se divide em duas partes principais:

- **Frontend:** Desenvolvido com Next.js e React, permite aos usuários interagir com a interface, criar, editar e visualizar tarefas, além de receber atualizações em tempo real sobre o status das tarefas e sobre a presença de outros usuários.
- **Backend:** Desenvolvido com NestJS, gerencia a lógica de negócios, a autenticação de usuários, o armazenamento de dados em PostgreSQL e MongoDB, e a comunicação em tempo real via WebSocket.

## 3. Fluxo

1. **Acesso à Aplicação:**
   - O frontend carrega a interface e se conecta ao backend.
   - O backend se inicializa e prepara o ambiente para recebimento de requisições e comunicação em tempo real.

2. **Autenticação:**
   - O usuário realiza login ou registro.
   - O backend valida as credenciais e gera tokens JWT para autenticação.

3. **Gerenciamento de Tarefas:**
   - O usuário pode criar, editar e excluir tarefas.
   - O frontend envia essas ações para o backend, que as processa e armazena no banco de dados.

4. **Comunicação em Tempo Real:**
   - Atualizações sobre tarefas e status de usuários são transmitidas em tempo real via WebSocket.

5. **Atualização da Interface:**
   - A interface do frontend é atualizada com base nas informações recebidas do backend e nas ações do usuário.

## 4. Libs do Frontend e Backend

### Frontend
- **React:** Utilizado para construir componentes da interface.
- **axios:** Usado para fazer requisições HTTP para o backend.
- **zustand:** Gerencia o estado global da aplicação.
- **socket.io-client:** Facilita a comunicação em tempo real com o backend.

### Backend
- **TypeORM:** ORM utilizado para operações com o banco de dados PostgreSQL.
- **Mongoose:** Utilizado para operações com o banco de dados MongoDB.
- **bcrypt:** Biblioteca para hashing de senhas.
- **passport-jwt:** Implementa a estratégia de autenticação JWT.
- **socket.io:** Facilita a comunicação em tempo real com o frontend.

## 5. Controladores

### Frontend
- **`/pages/index.tsx`**: Página inicial que exibe a lista de tarefas e permite interações básicas.
- **`/pages/login.tsx`**: Página de login, onde os usuários inserem suas credenciais para autenticação.
- **`/pages/register.tsx`**: Página de registro para novos usuários.

### Backend
- **`auth.controller.ts`**: Gerencia as rotas de autenticação, incluindo login e registro de usuários.
- **`tasks.controller.ts`**: Gerencia as rotas relacionadas às tarefas, incluindo criação, leitura, atualização e exclusão de tarefas.
- **`users.controller.ts`**: Gerencia as rotas relacionadas a usuários, incluindo consulta e atualização de informações do usuário.

## 6. Explicação dos Códigos

### Frontend

- **`/pages/index.tsx`**
  - **Funcionalidade:** Exibe a lista de tarefas e permite aos usuários interagir com elas.
  - **Funcionamento:** Utiliza `axios` para buscar as tarefas do backend e `zustand` para gerenciar o estado global das tarefas.

- **`/pages/login.tsx`**
  - **Funcionalidade:** Permite aos usuários se autenticarem.
  - **Funcionamento:** Envia as credenciais para o backend usando `axios` e armazena o token JWT retornado no armazenamento local.

- **`/pages/register.tsx`**
  - **Funcionalidade:** Permite aos novos usuários se registrarem.
  - **Funcionamento:** Envia os dados do usuário para o backend usando `axios`.

### Backend

- **`auth.controller.ts`**
  - **Funcionalidade:** Fornece endpoints para autenticação.
  - **Funcionamento:** Utiliza o `auth.service.ts` para processar login e registro, e `JwtService` para gerar e validar tokens JWT.

- **`tasks.controller.ts`**
  - **Funcionalidade:** Fornece endpoints para gerenciamento de tarefas.
  - **Funcionamento:** Usa o `tasks.service.ts` para manipular tarefas e interagir com o banco de dados.

- **`users.controller.ts`**
  - **Funcionalidade:** Fornece endpoints para manipulação de usuários.
  - **Funcionamento:** Usa o `users.service.ts` para buscar e atualizar informações do usuário.

  
## 7. Fluxograma

```plaintext
+------------------+
| Inicialização    |
+------------------+
        |
        v
+------------------+
| Autenticação     |
+------------------+
        |
        v
+------------------+
| Gerenciamento de |
| Tarefas          |
+------------------+
        |
        v
+------------------+
| Comunicação em   |
| Tempo Real       |
+------------------+
        |
        v
+------------------+
| Atualização da   |
| Interface        |
+------------------+