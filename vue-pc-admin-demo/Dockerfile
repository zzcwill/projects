FROM nginx

COPY ./dist /demo-admin/
COPY nginx.conf /etc/nginx/conf.d/demo-admin.conf

EXPOSE 8000
CMD ["nginx","-g","daemon off;"]