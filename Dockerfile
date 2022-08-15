FROM node:current-alpine3.15

# Bundle app source
COPY ../ /app

# Create app directory
WORKDIR /app

RUN npm install

CMD [ "npm", "run", "start:dev" ]
