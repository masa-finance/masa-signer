FROM node:18-alpine

WORKDIR /app

COPY . ./

RUN yarn

ENV PORT=4000
ENV PRIVATE_KEY=""
ENV ADDRESS=""

CMD ["yarn", "start"]
