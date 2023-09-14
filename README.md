# Sobre o projeto

Esse projeto é uma aplicação web para a contratação de artistas para shows particulares. Onde é possível cadastrar o contrato e consultá-los quando desejar.

O projeto foi feito com React.js + Vite, para salvar os dados foi usado o banco de dados Firebase com o recurso de autenticação com o Google, para as consultas de artistas foi usado a API do Spotify.

# Requisitos
Para iniciar o projeto em seu ambiente local, certifique-se de ter os seguintes requisitos instalados:

- Node.js
- Git

# Como executar?

### Clone o repositório

    git clone https://github.com/viniciusrvcruz/gerenciador-de-contratos.git

### Entre no diretório do projeto

    cd gerenciador-de-contratos

### Instale as dependências

    npm install

### Execute o Projeto

    npm run dev

Pronto agora o projeto já está rodando localmente.

Para poder ter acesso às outras páginas da aplicação, será necessário fazer o login com o Google. Após fazer o login você poderá cadastrar  seus contratos e consultá-los quando desejar.

# Estrutura do Projeto 

- **src**: A pasta principal do código-fonte do projeto.
  - **assets**: Armazena arquivos estáticos como imagens, estilos e fontes.
  - **components**: Contém componentes React reutilizáveis usados em várias partes do aplicativo.
  - **contexts**: Inclui contextos do React usados para compartilhar estados entre componentes.
  - **layout**: Contém layouts que definem a estrutura geral do aplicativo, como cabeçalho e rodapé.
  - **pages**: Cada arquivo nesta pasta representa uma página ou rota do aplicativo.
  - **routes**: Define as rotas do aplicativo e associa-as às páginas correspondentes.
  - **App.js**: O ponto de entrada do aplicativo React.
- **public**: Contém arquivos públicos, como imagens ou arquivos HTML.
- **node_modules**: Contém as dependências do projeto (gerado automaticamente pelo npm ou yarn).
- **package.json**: O arquivo de manifesto do projeto que lista as dependências e scripts.
- **README.md**: Este arquivo, com instruções sobre como executar e usar o projeto.

# Tecnologias utilizadas
- React / Firebase / ApiSpotify
  
# Autor

Vinicius Roberto Vieira da Cruz

https://www.linkedin.com/in/viniciuscruz7
