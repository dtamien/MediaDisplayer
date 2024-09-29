FROM node:20-alpine3.20

WORKDIR /app

COPY package*.json /app

RUN npm ci --only=production && npm cache clean --force

COPY . /app

CMD node src/index.jsx

EXPOSE 3000
