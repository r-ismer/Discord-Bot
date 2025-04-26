FROM node:slim
WORKDIR /home/local/Discord-Bot
COPY . .
RUN npm ci
CMD ["npm", "start"]

