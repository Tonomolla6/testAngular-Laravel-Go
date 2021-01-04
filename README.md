# Práctica Mejora Proyecto Servidor

# Introducción
 
## ¿QUE ES GO?
Go es la tecnología que hemos utilizado para hacer la práctica, es un lenguaje de programación concurrente y compilado, desarrollado por los ingenieros de Google, es un lenguaje maduro, con el cual se han desarrollado miles de proyectos alrededor del mundo, incluso, versiones actuales de Go están escritas con el mismo Go, su lanzamiento oficial fue a finales de 2009 (aunque su primera versión estable fue en 2012), está basado principalmente en C, incluso se denomina que go es el sustituto de C.

Go usa tipado estático y es tan eficiente como C. Está pensado para facilitar la vida al máximo a los programadores. Permite detectar errores en la sintaxis durante la compilación y no durante la ejecución, a diferencia de otros lenguajes compilados.

En conclusión es un lenguaje de programación muy ligero y eficiente superior a C.

# Refactorizar la aplicación

## Objetivo

Una de las ventajas que nos dan los modulos de go (go modules) es el adiós a las variables de entorno GOPATH, podemos iniciar nuestro proyecto en go desde el directorio que queramos, lo que nos aporta una gran sencillez a la hora de dockerizar la aplicación.

## Como iniciar

Por defecto Go Modules no viene activado para ser usado en GOPATH, pero si queremos utilizarlo será tan sencillo como activar la variable de entorno que nos ofrecen.

``` sh
$ echo "export GO111MODULE=on" >> ~/.bash_profile
```
``` sh
$ source ~/.bash_profile
```

Con esto, ya tendríamos go modules activado

## Crear un modulo

Para crear un go module independiente del resto, nos situamos en el directorio de nuestra aplicación, y crearemos una carpeta con el nombre del módulo que deseamos, en este caso, se llamará “events” .

Nos situamos en la carpeta events y ejecutamos: 

``` sh
$ go mod init goApp_events
```

![alt text](./img/1.png)


Estro nos creará un fichero llamado go.mod, en el cual no tendremos que tocar mucho

![alt text](./img/2.png)

Una vez hemos inicializado Go Modules en nuestro proyecto, podemos descargar las dependencias del mismo, esto servirá tanto para la primera vez como para cada vez que añadamos una nueva dependencia.

``` sh
$ go mod tidy
```

_Go mod tidy incluye en nuestro go.mod todas las dependencias necesarias para nuestros tests, de manera que si un test falla, sabremos cual es la dependencia que utiliza para reproducir el error._


Ya podemos continuar con la creación del módulo, para ellos empezaremos por el main.go, dentro de la carpeta “events”

![alt text](./img/3.png)


El codigo de main.go se puede ver en el repositorio de github asociado en https://github.com/Tonomolla6/testAngular-Laravel-Go/tree/develop


Creamos la carpeta common, que como bien indica el nombre, será una carpeta común en cada módulo de nuestra aplicación, de esta manera nos aseguramos de que si, por casualidades de la vida un módulo cae, no afectaría a los demás módulos y podría seguir funcionando la aplicación

![alt text](./img/4.png)

Creamos la carpeta “src” donde estarán los archivos relacionados con nuestro módulo events y sus dependencias

![alt text](./img/5.png)

Una vez hecho el paso anterior volvemos a hacer go mod tidy para que instale las dependencias automáticamente, las añada al go.mod (por eso hemos dicho antes que no hay que tocarlo) y borre las dependencias que no estamos usando (por ejemplo “fmt” que es para debuggear).

![alt text](./img/6.png)


Nuestro go.mod quedaría de la siguiente manera:

![alt text](./img/7.png)

Y nuestro go.sum se creará automáticamente con todas las dependencias que necesitamos en nuestro package “events”

![alt text](./img/8a.png)

Y ya tendríamos nuestro modulo en go activo y listo.







# Microservicios
## Introducción

_Los microservicios son, explicado de una manera cotidiana, un backend para cada uno de los modelos de nuestra app, en el que cada uno funciona por un o unos puertos diferentes._

_Es decir, si antes teníamos un main.go que lanzaba todos nuestros modelos, ahora cada modelo tendrá su propio main.go con sus dependencias que serán independientes al resto de módulos._

_El beneficio que nos da esto es que cada uno irá por un puerto diferente y eso nos da una velocidad de acceso que no teníamos antes, y además podemos prevenir fallos ya que, si un microservicio cae, no afectaría al resto porque son independientes, al contrario que pasaba anteriormente._ 


## Iniciación

En el ejercicio de antes hemos refactorizado la app para poder usar módulos, y está preparada de una manera en la que ya podemos implementar microservicios al tener cada uno:

## Common

Una carpeta common con aspectos de configuración globales al microservicio así como utilidades para la creación de sesiones de base de datos


![alt text](./img/8.png)




## Models

Un archivo models dentro de la carpeta src en donde se definirán los modelos utilizados por el microservicio

![alt text](./img/9.png)

## Routers

Un archivo routers dentro también de la carpeta src para la definición de las rutas o endpoints que publicará el microservicio

![alt text](./img/10.png)

## Data

Un archivo data (en este caso llamado resolvers) en donde se incluyen las funciones que son ejecutadas para obtener la información de respuesta de los endpoints del microservicio


![alt text](./img/11.png)

## Docker-compose

Para poder lanzar los microservicios, es necesario dockerizar la aplicación y añadir los microservicios, para ellos, configuraremos nuestro .yml de la siguiente manera:

- Partiremos de una imagen golang:1.15
- El nombre del contenedor lo llamaremos go_events
- El directorio de trabajo será /go/src/goApp_events
- Tendrá un volumen asociado a la carpeta events que será goApp_events 
  ./go/events:/go/src/goApp_event  s

![alt text](./img/12.png)


- Ejecutaremos los comandos necesarios para que funcione nuestro microservicio en go
- Exponemos el puerto 8080 común en todos los microservicios 

![alt text](./img/13.png)

- Tendrá dependencias para los servicios de mysql y de redis
- Tendrá una network común, que en este caso será servidor_network

![alt text](./img/14.png)


Configuraremos los servicios de mysql y de redis de la siguiente manera:

![alt text](./img/15.png)

Repetir el proceso anterior para cada microservicio que queramos crear.

## Traefik

Al ser independientes los microservicios entre ellos mismos, necesitamos una herramienta que gestione los puertos asociados a cada microservicio, para ellos utilizaremos traefik

### Introducción

_Traefik es un proxy inverso y un balanceador HTTP y TCP escrito en GO que ofrece un conjunto de características muy interesantes:_ 
· Auto-descubrimiento de servicios
· Tracing
· Métricas
· Despliegues sobre un subconjunto de clientes
· Mirroring

_Además integra una completa UI que nos da información sobre todo lo que ofrece que veremos más adelante_
 
 
## Configuración
Creamos una carpeta llamada traefik con un archivo llamado acme.json dentro

![alt text](./img/19.png) 

- Partiremos de una imagen de traefik:v2.3
- Ejecutará los comandos reflejados en la imagen de abajo para su correcto funcionamiento
- Expondrá los puertos 80 y 8080 
- Compartirá la network “servidor_network”

![alt text](./img/17.png)

- Tendrá un volumen asociado a /var/run/docker.sock:/var/run/docker.sock 
- El nombre del contenedor será traefik 
- Aplicaremos la opción de restart: always para que pueda ejecutar todos los microservicios por si alguno falla

![alt text](./img/18.png)


Ya tenemos  nuestro servicio de traefik configurado.



Ahora, tenemos que ir a los microservicios que hemos creado antes en nuestro .yml y añadimos lo siguiente

- La primera opcion será para definir la ruta de acceso a este microservicio, en este caso será events.docker.localhost 
- La tercera opcion será para definir la network compartida, que es servidor_network 
- La cuarta opción definimos el puerto asociado a traefik, por el cual partirán todos los microservicios, en este caso el puerto 8080

![alt text](./img/20.png)

Repetimos el proceso anterior en cada uno de los microservicios que tengamos en nuestra app, en mi caso tengo “events”, “discotecas” y “users”, y quedaria de la siguiente manera

### Discotecas:

![alt text](./img/21.png)


### Users:

![alt text](./img/22.png)

### Events:

![alt text](./img/23.png)

## Puertos

Evidentemente, cada microservicio será lanzado por el puerto 8080, que definimos en cada main.go de cada microservicio para que traefik se encargue de asignar un puerto.

``` sh
r.Run(“:8080”)
```

![alt text](./img/24.png)


Una vez completados todos los pasos, procedemos a lanzar los contenedores de nuestro .yml con

``` sh
$ sudo docker compose up
```

![alt text](./img/25.png)
![alt text](./img/16.png)



## DashBoard

Una vez lanzados nuestros contenedores, accedemos al dashboard de traefik en el puerto 8080

``` sh
localhost:8080
```

![alt text](./img/26.png)



Hacemos click en HTTP y comprobamos nuestros servicios activos

![alt text](./img/27.png)

Como podemos ver, todos nuestros servicios funcionan correctamente, y si hacemos click en alguno de ellos, en este caso el de events (4º posición) podremos ver la configuración del mismo y muchas más cosas, entre ellas, cómo acceder a este para realizar peticiones

![alt text](./img/28.png)

Como podemos comprobar, para acceder a este microservicio tendremos que acceder a 

``` sh
Host(`events.docker.localhost`)
```

Vamos a crear un event de prueba para verificar que funciona correctamente:

![alt text](./img/29.png)

Accedemos a:

```
http://events.docker.localhost/api/events/ 
```

Y observamos el resultado

![alt text](./img/30.png)

Como podemos ver, el microservicio de events gestionado por traefik funciona correctamente. 