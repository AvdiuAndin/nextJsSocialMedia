# syntax=docker/dockerfile:1
FROM node:14.17.5-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]

