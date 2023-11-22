FROM node:18

WORKDIR /usr/api

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
# CMD ["npm","run","start:dev"]
