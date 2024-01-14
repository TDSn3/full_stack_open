# http://localhost:3003/


# Important

`.env` required at root

template :

```
DATABASE_USERNAME=<username>
DATABASE_PASSWORD=<password>
DATABASE_NAME=<name>
PORT=<port>
```

exemple :

```
DATABASE_USERNAME=fullstack
DATABASE_PASSWORD=*********
DATABASE_NAME=blogApp
PORT=3003
```

# Initializing a Node.js Project

## Setup a `package.json` file

```
mkdir project_name
cd project_name
```

Create a `package.json` file:

```shell
npm init
```

Install your dependencies:

```shell
npm install react dotenv express morgan cors mongodb lodash
npm install mongoose@7.6.5
```

Install your development and testing dependencies that are not used in the production version:

```shell
npm install nodemon --save-dev
npm install eslint --save-dev
npm install jest --save-dev
npx install-peerdeps --dev eslint-config-airbnb
```

Add your scripts to the `package.json` file.
Example of useful scripts:

``` json
{    
	// ... 
	"scripts": {
        "start": "node index.js",
        "start:debug": "node --inspect index.js",

        "dev": "nodemon index.js",
        "dev:debug": "nodemon --inspect index.js",

        "lint": "eslint .",
        "test": "jest --verbose"
    },
	// ... 
}
```

Jest requires one to specify that the execution environment is Node. This can be done by adding the following to the end of `package.json`:

``` json
{
    // ...
    "jest": {
        "testEnvironment": "node"
    }
}
```

Add `jest: true,` to the `env` property in the `.eslintrc.js` file:

``` js
    env: {
        node: true,
        commonjs: true,
        es2021: true,
        jest: true, // <-
    },
```

## Setup ESlint

Import your `.eslintrc.js` and `.eslintignore` files, or initialize a default ESlint configuration with the following command:

``` shell
npx eslint --init
```

```
touch .eslintignore
```

## Setup the environment

Create a `.env` file:

```
touch .env
```

Add your variables to the `.env` file:

```
VARIABLE=value
EXEMPLE=value
```

The handling of environment variables is extracted into a separate utils/config.js file. Create a `config.js` file:

``` shell
mkdir utils
touch utils/config.js
```

Exmple of a `config.js` file:

``` js
require('dotenv').config()

const variable = process.env.VARIABLE
const exemple = process.env.EXEMPLE

module.exports = {
    variable,
    exemple
}
```

The other parts of the application can access the environment variables by importing the configuration module:

``` js
const config = require('./utils/config')

consol.log(`Variable value is ${config.variable}`)
```

## Setup the logger

It is possible to use `console.log` and `console.error` to print different information from the code. However, this is not a very good way to do things. Separate all printing to the console to its own module utils/logger.js:

``` shell
touch utils/logger.js
```

Exmple of a `logger.js` file:

``` js
const info = (...params) => {
    console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}
```

The logger has two functions, info for printing normal log messages, and error for all error messages:

``` js
const config = require('./utils/config')
const logger = require('./utils/logger')

logger.info(`Variable value is ${config.variable}`)
```

## Setup a `index.js` file

``` shell
touch index.js
```

Exmple of a `index.js` file:

``` js
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port}`)
})
```

The Express application code will be stored in an `app.js` file, which will be imported at the beginning of `index.js`.

## Setup an `app.js` file

``` shell
touch app.js
```

Exmple of a `app.js` file:

``` js
const cors = require('cors')
const express = require('express')
const config = require('./utils/config')

const app = express()
const logger = require('./utils/logger')

// database connection code

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// other middleware 

module.exports = app
```

Add this line to the top of `index.js` :

``` js
const app = require('./app')
```

The `index.js` file only imports the actual application from the `app.js` file and then starts the application.

Now the Express app and the code taking care of the web server are separated from each other following the best practices. One of the advantages of this method is that the application can now be tested at the level of HTTP API calls without actually making calls via HTTP over the network, this makes the execution of tests faster.

## Setup the controllers

Route handlers will be in their own dedicated modules. Route event handlers are commonly referred to as controllers, and it's for this reason that we've created a new `controllers` directory. All routes related to a `components` will be in their own module, under the controllers directory.

``` shell
mkdir controllers
touch controllers/components.js
```

Exmple of a `components.js` file:

``` js
const componentsRouter = require('express').Router()

componentsRouter.get('/', (request, response, next) => {
    // ...
});

componentsRouter.get('/:id', (request, response, next) => {
    // ...
});

componentsRouter.put('/:id', (request, response, next) => {
    // ...
});

componentsRouter.post('/', (request, response, next) => {
    // ...
});

componentsRouter.delete('/:id', (request, response, next) => {
    // ...
})

module.exports = componentsRouter;

```

At the very beginning of the file we create a new router object:

``` js
const componentsRouter = require('express').Router()

//...

module.exports = componentsRouter
```

The module exports the router to be available for all consumers of the module. All routes are now defined for the router object, similar to the object representing the entire application.

A router object is an isolated instance of middleware and routes. You can think of it as a “mini-application,” capable only of performing middleware and routing functions. Every Express application has a built-in app router.

The router is in fact a middleware, that can be used for defining "related routes" in a single place, which is typically placed in its own module.

The `app.js` file that creates the actual application takes the router. To do this, add this to the `app.js` file:
``` js
// ...

const componentsRouter = require('./controllers/components')

// ...

app.use('/api/components', componentsRouter)

// ...
```

``` js
const cors = require('cors')
const express = require('express')
const config = require('./utils/config')
const componentsRouter = require('./controllers/components') // <-

const app = express()
const logger = require('./utils/logger')

// database connection code

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

// other middleware

app.use('/api/components', componentsRouter) // <-

// other middleware 

module.exports = app
```

The router we defined earlier is used if the URL of the request starts with `/api/components`. For this reason, the `componentsRouter` object must only define the relative parts of the routes, i.e. the empty path `/` or just the parameter `/:id`.

## Setup the controllers

Creat a `utils/middleware.js` module for others custom middleware:

``` shell
touch utils/middleware.js
```

Exmple of a `middleware.js` file:

``` js
const otherMiddleware = (request, response) => {
    // ...
}

module.exports = {
    otherMiddleware,
}
```

Add them to the `app.js` file:

``` js
// ...

const middleware = require('./utils/middleware')

// ...

app.use(middleware.otherMiddleware)

// ...
```

## Setup the component models

Each `component.js` file under the `models` directory only defines the Mongoose schema for its associated `components.js`.

``` shell
mkdir models
touch models/component.js
```

## Setup the tests

Function exemple to test `utils/testing_exemple.js`:

``` js
const dummy = () => (1)

module.exports = dummy
```

Create a separate directory for our tests called `tests`, which will contain a new file for each test:

``` shell
mkdir tests
```

Jest expects by default that the names of test files contain `.test`. Follow the convention of naming our tests files with the extension `.test.js`:

``` shell
touch tests/dummy.test.js
```

Exemple of a `tests/dummy.test.js` file:

``` js
const dummy = require('../utils/testing_exemple')

test('dummy returns one', () => {
    const result = dummy()
    expect(result).toBe(1)
})
```
