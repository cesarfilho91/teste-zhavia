# Sistema de Gerenciamento de Tarefas - Frontend

Este é o frontend do sistema de gerenciamento de tarefas desenvolvido com Next.js. Ele permite que os usuários visualizem, criem e editem tarefas, além de gerenciar a autenticação.

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou Yarn

## Instalação

1. Clone o repositório:


   git clone https://github.com/cesarfilho91/teste-zhavia.git

Navegue até o diretório do projeto:

cd SEU_REPOSITORIO_FRONTEND
Instale as dependências:

npm install
ou
yarn install

Configuração
Crie um arquivo .env.local na raiz do projeto.

Adicione a URL base do backend ao arquivo .env.local:

NEXT_PUBLIC_API_URL=http://localhost:3001
Ajuste o valor conforme necessário para o ambiente de desenvolvimento ou produção.

Executando o Projeto
Inicie o servidor de desenvolvimento:

npm run dev
ou
yarn dev
Abra seu navegador e acesse http://localhost:3000 para ver a aplicação em execução.

Funcionalidades
Página de Login: Permite que os usuários façam login na aplicação.
Página de Registro: Permite que novos usuários se registrem.
Página de Tarefas: Permite visualizar a lista de tarefas, criar novas tarefas, editar e excluir tarefas.
Estrutura de Diretórios
pages/: Contém as páginas do Next.js, como login, registro e tarefas.
components/: Contém componentes reutilizáveis.
context/: Contém o contexto de autenticação.
styles/: Contém estilos globais e específicos.
Testes
Os testes podem ser executados com o seguinte comando:

npm test
ou

yarn test
Certifique-se de que todos os testes estão passando antes de fazer commit.

Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, siga as etapas:

Faça um fork do repositório.
Crie uma branch para sua feature ou correção (git checkout -b feature/nome-da-feature).
Faça as alterações necessárias e commit (git commit -am 'Adiciona nova feature').
Faça push para sua branch (git push origin feature/nome-da-feature).
Abra um pull request no GitHub.
Licença
Este projeto está licenciado sob a MIT License.

markdown
Copiar código

### Passos a Seguir

1. **Preencha os detalhes do repositório**: Substitua `SEU_USUARIO` e `SEU_REPOSITORIO_FRONTEND` pelos valores apropriados.
2. **Configure o arquivo `.env.local`**: Certifique-se de que a URL base do backend está correta para o seu ambiente.
3. **Adapte a estrutura de diretórios**: Se a estrutura do seu projeto for diferente, ajuste as seções correspondentes no `README.md`.

Se precisar de mais detalhes ou tiver dúvidas específicas sobre a configuração, só avisar!