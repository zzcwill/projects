FROM nginx

COPY ./dist /hongyan-admin/
COPY nginx.conf /etc/nginx/conf.d/hongyan-admin.conf

EXPOSE 8006
CMD ["nginx","-g","daemon off;"]