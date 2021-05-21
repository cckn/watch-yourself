FROM node:14-alpine

WORKDIR /usr/src/app

ENV TESTSTRING=test

COPY package*.json ./

RUN npm install --production

COPY . .

CMD [ "node", "dist/main.js" ]