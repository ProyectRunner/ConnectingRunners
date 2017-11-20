----
THIS README IS UNDER CONSTRUCTION, please, be patient.

------
# Basic and empty Node.js & Express.js server  with auth ready for start to code


Here you have a basic config for a server with [Node.js](https://nodejs.org/es/) and [Express](https://www.npmjs.com/package/express).

This repository contains a server with the necessary packages to start any project in Node.js

Everything is installed, you only have to run
```
npm install --save
```
And you will install all packages with this command.

# Pre-installed packages (Alphabetical order)

## [Bcrypt](https://www.npmjs.com/package/bcrypt)

- Lib to help you hash passwords.
  -  We use it with [passport.](#passport)

# [Body parser](https://www.npmjs.com/package/body-parser)
- Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
  - So, without body parser you can't do req.body.foo

## [Connect ensure login](https://www.npmjs.com/package/connect-ensure-login)
- This middleware ensures that a user is logged in.
  - If a request is received that is unauthenticated, the request will be redirected to a login page.
  - The URL will be saved in the session, so the user can be conveniently returned to the page that was originally requested.

## [Mongoose](https://www.npmjs.com/package/mongoose)
- Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
  - We use this for create schema models for MongoDB and make sure that the data we save in Mongo is correct.

## [Passport](https://www.npmjs.com/package/passport)





Original credits: [Xenock](https://github.com/xenock)
