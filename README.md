# basic-e-commerce-shop
A basic e-commerce shop

Añadir a la configuración de <VirtualHost> en el archivo de configuración de Apache (httpd.conf) la siguiente configuración:

```	
<Directory /var/www/>
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```
