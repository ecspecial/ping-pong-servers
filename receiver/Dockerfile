FROM node:18

WORKDIR /usr/src/app/receiver

COPY ./package.json .

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start"]