FROM php:8.2.0-cli

# Instalação das dependências do sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip

# Instalação do Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copia o código fonte do Laravel para dentro do container
WORKDIR /app
COPY . .

RUN docker-php-ext-install pdo_mysql

# utilizado pro comando nc
RUN apt-get install -y netcat

# Instalação das dependências do Composer
RUN composer install

# Expondo a porta 8000 (se necessário)
EXPOSE 5000