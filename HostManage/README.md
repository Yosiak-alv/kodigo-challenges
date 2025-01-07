
# Getting started

## Installation

Please check the official laravel installation guide for server requirements before you start. [Official Documentation](https://laravel.com/docs/5.4/installation#installation)

ADMIN CREDENTIALS

    email:administrator@example.com , password:password

Clone the repository

    git clone https://github.com/Yosiak-alv/kodigo-challenges.git

Switch to the repo folder

    cd HostManage

Install all the dependencies using composer

    composer install

Install all the FrontEnd Dependencies with your package manager (ex: npm)

    npm install

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

Generate a new application key

    php artisan key:generate

Run the database migrations (**Set the database connection in .env before migrating**)

    php artisan migrate

Seeding the database

    php artisan db:seed

Start the local development server

    php artisan serve
    npm run dev

You can now access the server at http://localhost:8000
