FROM --platform=linux/amd64 node:20-bullseye AS build
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN rm -rf node_modules
RUN npm install --force

COPY . .
RUN npm run build


# Production stage
FROM nginx:1.25-alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
