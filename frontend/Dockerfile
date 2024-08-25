# Utiliser une image de node pour le build
FROM node:16 as build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du front-end
COPY . .

# Installer les dépendances
RUN npm install

# Construire l'application pour la production
RUN npm run build

# Utiliser une image Nginx pour servir les fichiers
FROM nginx:alpine

# Copier les fichiers buildés dans le répertoire Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Exposer le port 80
EXPOSE 3000

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
