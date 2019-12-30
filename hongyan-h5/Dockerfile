FROM nginx

COPY ./dist /hongyan-h5/
COPY nginx.conf /etc/nginx/conf.d/hongyan-h5.conf

EXPOSE 8080
CMD ["nginx","-g","daemon off;"]