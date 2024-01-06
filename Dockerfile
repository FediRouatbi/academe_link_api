FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "pnpm-lock.yaml","./"]
RUN npm install -g pnpm
RUN npm install -g @nestjs/cli
RUN pnpm install
COPY . .
COPY .env.development .env
RUN npx prisma generate
EXPOSE 3000
CMD pnpm run start