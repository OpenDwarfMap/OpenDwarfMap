FROM node:21

RUN npm install -g parcel-bundler

RUN cd front-end
RUN npm install
RUN cp -r assets dist/assets

RUN cd ../back-end-statique
RUN npm install

