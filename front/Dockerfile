# Usando a imagem oficial do Node.js 20
FROM node:20

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de dependências
COPY package.json yarn.lock ./

# Instalando as dependências do React
RUN yarn install

# Copiando o restante do código do front-end
COPY . .

# Expondo a porta 3000 para o React
EXPOSE 3000

# Iniciando o servidor React
CMD ["yarn", "start"]
