FROM node:alpine

ADD . /src
WORKDIR /src

RUN apk update
RUN npm install -y --no-install-recommneds git

COPY --chown=node:node . .

CMD ["node", "src/app.js"]
CMD node src/client.js
CMD node app.js


