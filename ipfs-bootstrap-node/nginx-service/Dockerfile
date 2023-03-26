FROM nginx
COPY default.conf /etc/nginx/conf.d
COPY options-ssl-nginx.conf /etc/nginx/options-ssl-nginx.conf
#Pre-computed Diffie-Hellman parameters
COPY ssl-dhparams.pem /etc/nginx/ssl-dhparams.pem

EXPOSE 443 
EXPOSE 80
EXPOSE 4003
EXPOSE 5003