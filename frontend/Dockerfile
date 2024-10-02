# Usamos una imagen de Node para construir la aplicación
FROM node:16-alpine as build
WORKDIR /app

# Copiamos el package.json e instalamos dependencias
COPY package*.json ./
RUN npm install

# Copiamos el resto de los archivos y construimos la app
COPY . .
RUN npm run build

# Usamos una imagen de Nginx para servir la app
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto en el que correrá Nginx
EXPOSE 80

# Comando por defecto para Nginx
CMD ["nginx", "-g", "daemon off;"]
