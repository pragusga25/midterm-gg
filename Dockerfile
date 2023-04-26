FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS server
WORKDIR /app
COPY package* ./
RUN npm i --only=production
COPY --from=builder ./app/dist ./dist
EXPOSE 8000
CMD ["npm", "start"]
