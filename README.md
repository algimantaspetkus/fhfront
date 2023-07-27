# Introduction

GroupHub is an application built on React and Node.js that allows various groups of people, such as families, friend circles, and clubs, to create private groups. Within these groups, users can collaborate and manage task lists, shopping lists, event details, and other shared information efficiently and securely.

# Getting Started

## Requirements

- The latest version of [Node.js](https://nodejs.org/en) `(at least v18.15.0)`
- [MongoDB](https://www.mongodb.com/)

## Back End application

Navigate to the place you want your backend application to be, clone it and then install the required packages

```
    cd C:\nodejs
    git clone https://github.com/algimantaspetkus/fhback
    cd fhback
    npm install
```

Rename the `example.env` in windows `ren example.env .env` or `mv example.env .env` on linux.

Edit the file, and provide your MongoDB credentials and a secret key for JWT generation. You can change the port if needed.

```
    USER=yourmongodbusername
    PWD=yourmongodbpassword
    HOST=nongodbhost
    JWT=jwtsecretkey
    PORT=8080
```

To start your back end application

```
    npm start
```

If everything works, you should secret

```
    Server is listening on port 8080
    Connected to MongoDB
```

## Front End application

Navigate to the place you want your backend application to be, clone it and then install the required packages

```
    cd C:\nodejs
    git clone https://github.com/algimantaspetkus/fhfront
    cd fhfront
    npm install
```

Rename the `example.env` in windows `ren example.env .env` or `mv example.env .env` on linux.

Edit the file, and provide the backend server IP address and the port. If you are going to use it on your local machine, you can leave the localhost, change the port if needed.

```
    REACT_APP_BASE_SERVER=http://localhost:8080
```

To start your front end application

```
    npm start
```
