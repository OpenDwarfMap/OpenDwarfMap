FROM node:21

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production

WORKDIR /var/www
ADD newXmlToJson.js package-lock.json package.json server.js run.sh /var/www/
ADD data_preprocessing /var/www/data_preprocessing/

RUN chmod +x run.sh

RUN chown -R node /var/www

RUN npm ci --omit=dev

USER node

CMD sh run.sh
