# Proyecto de Simulación en la Nube

## Descripción

Este proyecto simula la gestión de inventarios en un sistema de restaurante. Utiliza Docker para facilitar la ejecución y la implementación en entornos de nube.

## Diagrama de Arquitectura

![Arquitectura](https://github.com/user-attachments/assets/cf12e65d-5ce5-4fe6-84fa-24420b4cc1e9)


*El diagrama anterior muestra la arquitectura del sistema, identificando los componentes principales y sus interacciones.*

## Componentes

- **Componente 1**: Aplicacion React.
- **Componente 2**: Product microservice.
- **Componente 3**: Order microservice.

## Despliegue en Railway

Puedes acceder a la aplicación desplegada en Railway en el siguiente enlace:

[Acceder a la aplicación en Railway](https://nombre-de-tu-aplicacion.railway.app)

## Instrucciones para Ejecutar la Simulación Local

### Requisitos Previos

- [Docker](https://docs.docker.com/get-docker/) instalado en tu máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado en tu máquina.

### Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:

```
MONGO_URI=mongodb+srv://user:password123456@linktic.fomog.mongodb.net/?retryWrites=true&w=majority&appName=linktic
```

### Ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/SantiagoRojasBuitrago/Prueba-Linktic
   cd Prueba-Linktic
   ```

2. Construye y ejecuta los contenedores utilizando Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Accede a la aplicación en tu navegador web en la siguiente dirección:

   ```
   http://localhost:80
   ```
