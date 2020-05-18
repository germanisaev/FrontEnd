# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm install build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/angular7 /usr/share/nginx/html