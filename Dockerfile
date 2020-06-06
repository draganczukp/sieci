FROM node:slim AS build

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:alpine


COPY --from=build /app/index.html /app/questions.json /usr/share/nginx/html/
COPY --from=build /app/dist /usr/share/nginx/html/dist

