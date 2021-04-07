# Sobre

Aplicação para ser executada no ambiente Google Cloud App Engine standard.

Este serviço é um API Gateway responsável por receber solicitações externas, validando o acesso a recursos protegidos e encaminhando solicitações aos microsserviços apropriados.

Obs.: No Google Cloud App Engine este serviço deve ser o default.

## Executar em ambiente local

Instalar as dependências:

```sh
npm install
```

Executar aplicação:

```sh
npm start
```

Os variáveis de ambientes devem estar configuradas no arquivo .env

## Deploy para o ambiente App Engine

```sh
gcloud app deploy
```