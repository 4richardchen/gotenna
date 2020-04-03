FROM node

RUN mkdir -p /home/app/server/src
WORKDIR /home/app/server

COPY package.json /home/app/server

RUN npm install

EXPOSE 8080

CMD ["node", "src/server.js"]
