FROM nodesource/node:latest

RUN npm -g install sails
ADD package.json package.json
RUN npm install
ADD . .

ENV NODE_ENV=production
EXPOSE 1337
CMD ["sails","lift"]