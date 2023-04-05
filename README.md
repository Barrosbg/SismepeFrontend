# Aplicação React do SISMEPE

Este projeto foi criado utilizando o layout dos componentes da biblioteca [Material UI](https://material-ui.com/pt/). 

## Execução em modo de desenvolvimento

Certifique-se de estar com o [Node](https://nodejs.org/dist/v14.16.0/) 14.16.0 instalado na sua máquina:

1 - Para instalar as dependências execute `npm i`

2 - Verifique se o arquivo `.env.development` foi craido com a variável REACT_APP_API_URI identificando o endereço da api de desenvolvimento

3 - Por último, execute o script `npm start` para iniciar a aplicação.

## Execução em modo de produção

Para gerar a versão de produção também é necessário estar com o [Node](https://nodejs.org/dist/v14.16.0/) 14.16.0 instalado na sua máquina.

Verifique se o arquivo `.env.production` foi craido com a variável REACT_APP_API_URI identificando o endereço da api de produção  

Após isso, execute o script `npm run build`. Esse script gera os arquivos necessários para subir a aplicação para produção.

Basta apenas copiar os arquivos gerados na pasta build/ para o seu servidor em produção.

