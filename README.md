# blog-nodejs-api

This project is written using [nodejs](https://nodejs.org/en/) platform. Its database is mongodb. 

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install packages.

```bash
npm install
```

## Usage

after using app plz import the json file in mongodb database

```
database\seeds\users.json
database\seeds\permissions.json
database\seeds\roles.json
```

##users
After importing data in mongodb, two users will be created , one admin and one normal user

```json
[
    {
      "email": "admin@gmail.com",
      "password": "admin123T"
     },
    {
      "email":"normaluser@gmail.com",
      "password":"user123R"
     }
]
```
