# THE GREAT MELON
![alt text](./img/logo.png)

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


Cosas que hemos hecho

- Home, Shop Go: list/details
    - Home en angular y go
    -> FALTA EL SHOP
      
- PanelAdmin Laravel: CRUD.
    - Crear companies asociadas al usuario

- Login, register, JWT.
    - Laravel: Login y register
    - Go: Login y register

- Login_admin.
    - LOGIN EN LARAVEL SOLO SI ES ADMINISTRADOR

- microservices.
    - Entradas, Discotecas, Events, Users y Profiles.

- Relationships Go/Laravel.
    - Laravel: Falta las relationsShips
    - Go: M - M, Users - Favoritos

- Home/Shop Go: users més populars, articles més comprats, ... PanelAdmin Laravel: dashboard amb estadístiques.
    - Go: discotecas mas visitadas, 
    -> FALTA DISCOTECAS MAS POPULARES, EVENTOS CON MAS VENTAS
    -> FALTA DASHBOARD CON ESTADISTICAS DE REDIS.
    
- Profile:
    - List your profile
    - Update your profile
    - List your discos
    - Mejora de seguridad, doble comprobacion del id del usuario al hacer get de sus discotecas, tiene que recibir bearer y el id del user

- Readme.
    -> FALTA EMPEZAR A HACERLO

Improvents:
    1. Collection en postman con todas las apis disponibles del backend (Exportadas en el repositorio de github)
    2. Validacion de go y laravel en el register, contraseña mas de 6 digitos, correo valido...
    3. Utilizacion de validaciones en crud de usuario y request en laravel
    4. Serializers de go para formatear los datos de la base de datos.
    5. Mejoras de seguridad admin, no se puede hacer sesion en laravel si no se ha iniciado sesion posteriormente en go
    6. Middlewares de seguridad en laravel para la validacion de JWT
    7. Seeders de usuarios en Laravel.
    8. Toastr Angular. 
    9.
    10.
    11.
    12.
    13.
    14.
    15.
    16.

Faciles
- seed_Go/Laravel.
- validate register BE Go.

Dificiles
- Angular Redux (ngrx): list/details shop o CRUD PanelAdmin.
- middleware admin_guard Angular.
- Nivells de seguretat microservices middleware_auth.
- Relationships Go/Laravel: traits, emitters, related, association, ...
slug, author, tags, pager, favorites, follow, comments, buys, ...
- L'admin puga fer compres.