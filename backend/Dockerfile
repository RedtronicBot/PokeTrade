# Utiliser l'image officielle Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du backend
COPY package.json package-lock.json ./
RUN npm install

# Copier tout le code
COPY . .

# Exposer le port de l'API
EXPOSE 3001

# Lancer le serveur
CMD ["node", "server.js"]