FROM nginx:1.23.1-alpine
WORKDIR /app
COPY . /app
RUN apk add nodejs npm bash
RUN npm install
RUN npm run build
COPY build/* /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]