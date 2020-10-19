![header](doc/header.png)

Desarrollo de una aplicación web 
- [Infraestructura](#infraestructura)
- [Instalación](#instalación)
  - [Template de la aplicación](#template-de-la-aplicación)
  - [Docker](#docker)
  - [Docker-compose](#docker-compose)
  - [Imagenes](#imagenes)
  - [Comandos útiles de docker-compose](#comandos-útiles-de-docker-compose)
- [Diagrama conceptual de la aplicación](#diagrama-conceptual-de-la-aplicación)
- [Frontend](#frontend)
- [Backend](#backend)
- [Base de datos](#base-de-datos)
- [ToDo](#todo)
- [Licence](#licence)

# Infraestructura
La infraestructura utilizada para la construcción de esta aplicación consta de un servidor dedicado, especialmente instalado para desarrollar actividades de las materias de la Especialización en Internet de las Cosas de la Facultad de Ingeniería de la Universidad de Buenos Aires.
Datos del servidor:
IP Local: `192.168.1.41`
Hostname: `miot`
SO: `Debian GNU/Linux 10`
Acceso externo: `http://mcastello.dyndns.org:8000`

# Instalación 
## Template de la aplicación

Se hará un fork del repositiorio de GitHub proporcionado por los docentes:

https://github.com/ce-iot/daw-project-template.


## Docker
Se instalará docker y docker-compose, teniendo en cuenta que la distro deberá ser debian 9 o superior.

```sh
sudo apt-get update 
sudo apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```
Importar clave y verificar huella
```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg |sudo apt-key add -
sudo apt-key fingerprint 0EBFCD88
```
Agregar repositorio de docker e instalar
```sh
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```
Configurar permisos y grupo
```sh
sudo groupadd docker
sudo usermod -aG docker $USER
sudo gpasswd -a $USER docker
```
Reiniciar servicio
```sh
sudo service docker restart
```
Verificar la instalación
```sh
sudo docker run hello-world
```
Si todo salió bien, se deberá mostrar por consola el mensaje: `Hello from docker!`

## Docker-compose

Descargar el ejecutable y dar permisos de ejecución
```sh
sudo curl -L "https://github.com/docker/compose/releases/download/1.26.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
``` 
Verificación
```sh
docker-compose --version
```
Deberá mostrar la versión instalada `V1.26.2`

Se deberá reiniciar el sistema para que los servicios instalados arranquen con las configuraciones correspondientes


## Imagenes
Se deberán descargar las sigientes imágenes de docker proporcionadas por los docentes necesarias para la aplicación.

```sh
docker pull harmish/typescript
docker pull mysql:5.7
docker pull phpmyadmin/phpmyadmin
docker pull abassi/nodejs-server:10.0-dev
```
Una vez descargadas, se podrá levantar la aplicación con el comando `docker-compose up`. Esto iniciará los siguientes servicios:
>- Mysql server
>- PhpMyadmin
>- NodeJs server
>- Monitor de nodejs
>- Monitor de Typescript

## Comandos útiles de docker-compose

Levantar docker compose
```sh 
docker-compose up
```

Ver los procesos 
```sh 
docker-compose ps
```

Detener los servicios
```sh 
docker-compose stop
```

Reiniciar los servicios
```sh 
docker-compose restart
```

# Diagrama conceptual de la aplicación

# Frontend

# Backend

# Base de datos

# ToDo
Instalar nginx y configurarlo para que el acceso al sitio sea a través de protocolo de seguridad (TLS)

# Licence

This project is published under GPLV3+ licence.

![footer](doc/footer.png)

