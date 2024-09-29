FROM node:20-alpine3.20

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY src ./src

COPY public ./public

COPY index.html .

RUN yarn build

EXPOSE 3000

CMD sleep infinity