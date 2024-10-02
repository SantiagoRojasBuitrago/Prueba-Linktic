# product-service/Dockerfile
FROM node:16

# Crear y establecer el directorio de trabajo
WORKDIR /app

# Copiar el archivo de paquete y de bloqueo
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Exponer el puerto que utilizará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
