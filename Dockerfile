FROM node:18.12.1 as builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

FROM node:18.12.1
ENV NODE_ENV=production

COPY public /public
COPY --from=builder /app/.next/standalone /
COPY --from=builder /app/.next/static /.next/static

EXPOSE 3000
ENV PORT 3000

CMD [ "node", "server.js" ]
