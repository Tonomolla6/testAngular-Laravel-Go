# testAngular-Laravel-Go
 hola

## Instalar php
sudo apt-get install apache2 php7.3 libapache2-mod-php7.3

sudo apt-get install php-gd php-xml php7.2-mbstring

sudo apt-get install php7.2-xml


## Activar apache con php
a2query -m php7.3

sudo a2enmod php7.3

sudo service apache2 restart


## Instalar Postgres
sudo apt install postgresql postgresql-contrib

sudo -u postgres psql -c "SELECT version();"

## Postgres con php
apt-get install php-pgsql


## Instlar pgadmin4 (Debian 10)
apt-get install curl ca-certificates gnupg
curl https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

echo "deb http://apt.postgresql.org/pub/repos/apt/ buster-pgdg main" > /etc/apt/sources.list.d/pgdg.list

apt-get update
apt-get install pgadmin4  pgadmin4-apache2

## Instlar pgadmin4 (Ubuntu 20)
curl https://www.pgadmin.org/static/packages_pgadmin_org.pub | sudo apt-key add
sudo sh -c 'echo "deb https://ftp.postgresql.org/pub/pgadmin/pgadmin4/apt/$(lsb_release -cs) pgadmin4 main" > /etc/apt sources.list.d/pgadmin4.list && apt update'

sudo apt install pgadmin4
