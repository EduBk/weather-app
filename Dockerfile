ARG NODE_VERSION=22.12.0

FROM node:${NODE_VERSION}-alpine as base

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo los archivos package.json y package-lock.json (si los tienes)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install
RUN npm install -g nodemon

# Copiar el resto de los archivos del proyecto
COPY . .

# Exponer el puerto que usará la aplicación
EXPOSE 3001

# Comando para ejecutar la aplicación
CMD ["npm", "run", "dev"]
