# Utiliser une image PHP avec les extensions requises
FROM php:8.2-fpm

# Installer des dépendances supplémentaires
RUN docker-php-ext-install pdo pdo_mysql

# Copier les fichiers du back-end
COPY . /var/www

# Installer Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Installer les dépendances PHP
RUN composer install --no-dev --optimize-autoloader

# Donner les permissions au dossier de stockage
RUN chown -R www-data:www-data /var/www/storage

# Exposer le port 9000
EXPOSE 9000

# Démarrer le serveur PHP-FPM
CMD ["php-fpm"]
