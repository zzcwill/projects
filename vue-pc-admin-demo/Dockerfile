FROM nginx

COPY ./dist /zzc-admin/
COPY nginx.conf /etc/nginx/conf.d/zzc-admin.conf

EXPOSE 8000
CMD ["nginx","-g","daemon off;"]