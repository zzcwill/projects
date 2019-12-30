FROM nginx

COPY ./public /hexoDemo/
COPY nginx.conf /etc/nginx/conf.d/hexoDemo.conf

EXPOSE 8001
CMD ["nginx","-g","daemon off;"]