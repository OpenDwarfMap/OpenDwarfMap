FROM node:21

WORKDIR /var/www

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production

ADD src index.html index.js package-lock.json package.json run.sh ./
RUN mkdir dist
ADD assets dist/

RUN chmod +x run.sh

RUN chown -R node /var/www

RUN npm install -g parcel-bundler

USER node

RUN npm ci --omit=dev

CMD run.sh
