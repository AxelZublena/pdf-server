# syntax=docker/dockerfile:1
FROM node:17-alpine 

WORKDIR /app

# copy files and install dependencies
COPY package.json ./
#COPY package-lock.json ./
RUN npm install
RUN npm install typescript -g
COPY . ./
RUN tsc

EXPOSE 3000

CMD [ "node", "build/server.js" ]
