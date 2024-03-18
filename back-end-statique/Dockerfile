FROM node:21

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production

WORKDIR /var/www
ADD data_preprocessing newXmlToJson.js package-lock.json package.json server.js run.sh ./

RUN chmod +x run.sh

RUN chown -R node /var/www

RUN npm ci --omit=dev

USER node

CMD run.sh
