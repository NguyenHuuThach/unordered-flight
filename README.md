## Descripton

Unordered Flight Itineraries

## Manual Installation

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Features

- **ORM**: [Sequelize](https://sequelize.org/) orm for object data modeling
- **Migration and Seed**: DB migration and Seed using [Sequelize-CLI](https://github.com/sequelize/cli)
- **Error handling**: centralized error handling
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **Testing**: unittests using [Mocha](https://mochajs.org/)
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm run start
```

Testing:

```bash
# run all tests
npm run test

```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
#Server environment
NODE_ENV=development
#Port number
PORT=5000

#Db configuration
DB_HOST=db-host
DB_USER=db-user
DB_PASS=db-pass
DB_NAME=db-name


```

## Project Structure

```
specs\
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--dao\            # Data Access Object for models
 	|--contracts\		# Contracts for all dao
 	|--implementations 	# Implementation of the contracts
 |--db\             # Migrations and Seed files
 |--helper\         # Helper classes and functions
 |--middlewares\    # Middleware for handling error
 |--models\         # Sequelize models (data layer)
 |--route\         # Routes
 |--service\       # Business logic (service layer)
  	|--contracts\		# Contracts for all service
 	|--implementations 	# Implementation of the contracts
 |--validator\    # Request data validation schemas
 |--app.ts          # Express app
server.ts        # App entry point

```
