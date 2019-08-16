FROM node:alpine

LABEL Warus Firebyte

WORKDIR /app

RUN npm install -g nodemon pino-pretty

EXPOSE 80


CMD [ "npm", "run", "serve" ]
