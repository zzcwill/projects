FROM nginx

COPY ./dist /docDemo/
COPY nginx.conf /etc/nginx/conf.d/docDemo.conf

EXPOSE 8000
CMD ["nginx","-g","daemon off;"]