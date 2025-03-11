FROM node:14-alpine
WORKDIR /home/local/Discord-Bot
COPY . .
RUN npm ci
CMD ["npm", "start"]

