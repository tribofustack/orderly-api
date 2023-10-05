FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
EXPOSE 9229

CMD [ "npm", "run", "start:dev" ]
