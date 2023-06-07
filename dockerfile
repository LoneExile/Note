FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .

RUN npm i -g pnpm
RUN pnpm i
RUN pnpm build

EXPOSE 3000
CMD ["npm", "start"]

# TODO: https://www.locofy.ai/blog/create-a-docker-image-of-your-nextjs-app
