FROM nginx:1.23.1
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --chmod=644 ./sample.crt /etc/ssl/certs/sample.crt
COPY --chmod=440 ./sample.key /etc/ssl/private/sample.key