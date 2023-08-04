# Utilisez l'image de base Node.js LTS pour construire l'application Angular
FROM node:lts AS builder

# Définissez le répertoire de travail dans le conteneur
WORKDIR /app
EXPOSE 4200

# Copiez le package.json et le package-lock.json dans le conteneur
COPY package*.json ./

# Installez les dépendances de l'application
RUN npm install

# Copiez tout le code de l'application dans le conteneur
COPY . .

# Construisez l'application Angular pour la production
RUN npm run build --prod
RUN npm run start

# Utilisez une image légère basée sur Nginx pour servir l'application
FROM nginx:alpine

# # Copiez les fichiers de construction de l'application Angular depuis l'étape précédente
COPY --from=builder /app/dist/ /usr/share/nginx/html

# # Remplacez la configuration par défaut de Nginx par celle de l'application Angular
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Exposez le port 80 pour permettre l'accès à l'application depuis l'extérieur
EXPOSE 80

# # Commande pour démarrer le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]