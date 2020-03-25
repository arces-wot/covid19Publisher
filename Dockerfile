FROM node:10.19.0-stretch

COPY index.js /app/index.js
COPY jsap.js /app/jsap.js
COPY jsap_observations.js /app/jsap_observations.js
COPY loader.js /app/loader.js
COPY publish.js /app/publish.js

COPY package.json /app/package.json

WORKDIR  /app

RUN npm install

CMD ["node","index.js"]