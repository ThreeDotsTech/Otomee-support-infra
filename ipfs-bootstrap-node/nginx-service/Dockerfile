FROM nginx
COPY conf.d /etc/nginx/conf.d
COPY options-ssl-nginx.conf /etc/nginx/options-ssl-nginx.conf
#Pre-computed Diffie-Hellman parameters
COPY ssl-dhparams.pem /etc/nginx/ssl-dhparams.pem
EXPOSE 4003
EXPOSE 443 
EXPOSE 80 