FROM node:18.18.2-alpine

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . . 

CMD ["npm","run","start"]
