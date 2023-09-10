FROM node:18.4.0-alpine
RUN apk add --update python3 make g++
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install
COPY ./ ./
CMD ["yarn", "start"]

