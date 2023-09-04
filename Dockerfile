FROM node:18-buster-slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 8800
CMD ["node", "./dist/main.js"]