# Use a imagem Node.js otimizada
FROM node:22-alpine AS builder

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos de dependências primeiro (para melhor cache)
COPY package*.json ./

# Instale apenas dependências de produção
RUN npm install --only=production

# Copie o restante dos arquivos
COPY . .

# Construa a aplicação (caso necessário, dependendo do seu projeto)
RUN npm run build

# --------------------------------------------------

# Use uma segunda imagem mais leve para rodar a aplicação
FROM node:22-alpine

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie apenas os arquivos necessários da etapa de build
COPY --from=builder /usr/src/app ./

# Exponha a porta da aplicação
EXPOSE 3001

# Defina variável de ambiente para produção
ENV NODE_ENV=production

# Comando para iniciar o servidor em produção
CMD ["npm", "run", "start"]
