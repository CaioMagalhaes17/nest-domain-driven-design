# Escolha uma imagem base com Node.js
FROM node:22-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie apenas os arquivos de dependência primeiro para melhorar cache de build
COPY package*.json ./

# Instale as dependências
RUN npm install

RUN npm build

# Exponha a porta da aplicação
EXPOSE 3001

# Comando para iniciar o servidor no modo de desenvolvimento
CMD ["npm", "run", "start:prod"]
