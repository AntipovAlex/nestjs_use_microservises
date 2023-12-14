FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN yarn run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist .dist

CMD [ "node", "dist/app/payments/main" ]