# Rick And Morty Api
<p>Este projeto é uma Single Page Application (SPA) desenvolvida em Angular 2+ para consumir dados da API Rick & Morty.</p> 
<p>A aplicação foi projetada como um dashboard que inclui listagens de personagens, episódios e locais, com uma página de detalhes para cada item.</p>
<hr>

# Funcionalidades

- Dashboard: A aplicação segue o modelo de dashboard, proporcionando uma visão geral dos dados da API Rick & Morty.
- Listagem e Detalhes: Contém pelo menos uma página de listagem e uma página de detalhes, acessada ao clicar em um item da listagem.
  <p>Listagens possuem paginação com scroll infinito.</p>

- Autenticação: Tela de login, página de perfil e menu com nome do usuário logado e opção de logout (usando mocks).

<hr>

# Estrutura do projeto

- **src/app/auth**: Contém os componentes e serviços relacionados à autenticação.
  - **login/**: Componentes e serviços relacionados à tela de login.
  - **profile/**: Componentes e serviços relacionados ao perfil do usuário.
  - **auth.service.ts**: Serviço de autenticação.

- **src/app/components**: Contém os componentes da aplicação.
  - **character-detail/**: Componente para exibição de detalhes dos personagens.
  - **dashboard/**: Componente do painel de controle.
  - **header/**: Componente do cabeçalho.
  - **search-bar/**: Componente da barra de pesquisa.
    
- **src/app/service**: Contém os serviços da aplicação.
  - **auth.guard.ts**: Guardião de rotas para autenticação.
  - **rick-and-morty.service.ts**: Serviço para integração com a API Rick & Morty.
<hr>

# Instruções de Login

Para acessar a aplicação, você pode usar qualquer combinação de email e senha. Não há restrição específica para os dados de login nesta versão de desenvolvimento.
<hr>

# Instruções de uso
  Faça o clone do repositório do projeto:
```sh
git clone https://github.com/anakessia/rick-and-morty-api.git
```

Navegue até o diretório do projeto:
```sh
cd rick-and-morty-api
```

Instale as dependências do projeto:
```sh
npm install
```
Inicie o servidor de desenvolvimento: 
```sh
ng serve
```

Abra o seu navegador e acesse http://localhost:4200/ para visualizar o projeto em execução.
<hr>



