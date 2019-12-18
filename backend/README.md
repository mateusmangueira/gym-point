## Para executar o servidor do projeto

Instale as dependências do servidor

```console
yarn install
```

Faça a configuração do banco de dados PostgreSQL.

Com o docker, crie um container do postgres e execute-o na porta de sua preferencia.

```console
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11

docker start database
```

Crie no seu banco de dados um database chamado gymPoint. Pode ser usado um programa como o Postbird para gerenciar os bancos de dados por meio de uma interface gráfica.

Faça uma cópia do arquivo .env.example e renomei-o para .env e preencha as variáveis ambientes do seu banco de dados.

Rode as tabelas no banco de dados com o sequelize:

```console
yarn sequelize db:migrate
```

Rode as Seeds para preencher as tabelas com dados pré-definidos:

```console
yarn sequelize db:seed:all
```

Execute a aplicação.

```console
yarn dev
```