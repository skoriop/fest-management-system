FROM node:20.10-bullseye

ENV NODE_ENV development
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

WORKDIR /app

RUN npm i -g pnpm

COPY package*.json ./

RUN pnpm install

COPY . .

CMD pnpm run dev --host