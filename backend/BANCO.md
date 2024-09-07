## Documentação da Estrutura dos Bancos de Dados
# PostgreSQL
Tabelas
Tabela: tasks

Descrição: Armazena informações sobre as tarefas.

Campos:

id (integer, primary key, auto-increment): Identificador único da tarefa.
title (varchar(255), not null): Título da tarefa.
description (text, nullable): Descrição detalhada da tarefa.
status (varchar(50), not null): Status da tarefa (e.g., 'pendente', 'em progresso', 'concluído', 'cancelado').
created_at (timestamp with time zone, default now()): Data e hora em que a tarefa foi criada.
updated_at (timestamp with time zone, default now()): Data e hora da última atualização da tarefa.
Exemplo de SQL para criação:

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
Índices:

Índice padrão na coluna id (chave primária).
Relacionamentos:

Não há relacionamentos explícitos definidos neste esquema. A tabela tasks é autônoma e não possui chaves estrangeiras.

# MongoDB
Coleções
Coleção: logs

Descrição: Armazena logs das ações realizadas no sistema.

Campos:

_id (ObjectId, primary key): Identificador único do log.
action (string, not null): Tipo de ação registrada (e.g., 'REGISTER', 'LOGIN_FAILED', 'CREATE', 'UPDATE', 'DELETE').
details (string, not null): Detalhes adicionais sobre a ação.
timestamp (ISODate, default to current date/time): Data e hora em que o log foi criado.
Exemplo de estrutura de documento:

{
  "_id": "ObjectId('...')",
  "action": "REGISTER",
  "details": "Novo usuário registrado: user@example.com",
  "timestamp": "2024-09-07T12:34:56Z"
}
Exemplo de comando para criação de coleção e inserção de documento:

db.logs.insertOne({
  action: 'REGISTER',
  details: 'Novo usuário registrado: user@example.com',
  timestamp: new Date()
});
Índices:

Índice padrão no campo _id.
Relações:

Não há relacionamentos entre as coleções em MongoDB, pois MongoDB é um banco de dados NoSQL e é mais flexível quanto ao modelo de dados. Cada documento na coleção logs é independente.
Resumo
PostgreSQL: Utilizado para armazenar tarefas com um esquema relacional, usando a tabela tasks. As principais operações são a criação, leitura, atualização e exclusão de registros de tarefas.

MongoDB: Utilizado para armazenar logs das operações do sistema, com a coleção logs que armazena informações sobre ações e eventos. A estrutura é baseada em documentos, permitindo flexibilidade na definição dos campos.

Exemplos de Consultas
PostgreSQL (tasks)

Inserir Tarefa:
INSERT INTO tasks (title, description, status) VALUES ('Nova Tarefa', 'Descrição da nova tarefa', 'pendente');

Buscar Todas as Tarefas:
SELECT * FROM tasks;

Atualizar Status da Tarefa:
UPDATE tasks SET status = 'concluído' WHERE id = 1;

Excluir Tarefa:
DELETE FROM tasks WHERE id = 1;
MongoDB (logs)

Inserir Log:
db.logs.insertOne({
  action: 'LOGIN_SUCCESS',
  details: 'Usuário logado com sucesso: user@example.com',
  timestamp: new Date()
});

Buscar Todos os Logs:
db.logs.find().toArray();

Buscar Logs por Ação:
db.logs.find({ action: 'REGISTER' }).toArray();

Excluir Log:
db.logs.deleteOne({ _id: ObjectId('...') });