import {config} from "dotenv";

config();

export default {
   "type": "postgres",
   "host": process.env.DB_HOST,
   "port": process.env.DB_PORT,
   "username": process.env.DB_USERNAME,
   "password": process.env.DB_PASSWORD,
   "database": process.env.DB_DATABASE,
   "ssl": {
      "rejectUnauthorized": false
   },
   "synchronize": false,
   "logging": false,
   "entities": [
      "src/data-access/entity/**/*.ts"
   ],
   "migrations": [
      "src/data-access/migration/**/*.ts"
   ],
   "subscribers": [
      "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/data-access/entity",
      "migrationsDir": "src/data-access/migration",
      "subscribersDir": "src/subscriber"
   },
   "seeds": [
      "src/data-access/seeds/**/*.ts"
   ],
   "factories": [
      "src/data-access/factory/**/*.ts"
   ]

}