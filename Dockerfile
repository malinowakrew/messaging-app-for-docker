FROM node:alpine

ADD . /src
WORKDIR /src

RUN npm install
USER node
COPY . .

CMD ["node", "src/app.js"]
CMD node  src/server.js
