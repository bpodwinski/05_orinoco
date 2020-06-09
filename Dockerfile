FROM node:10
LABEL maintainer="contact@benoitpodwinski.com"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install \
    && npm install pm2 -g

COPY . .

EXPOSE 3000
CMD [ "pm2-runtime", "npm", "--", "start" ]
