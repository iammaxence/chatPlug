import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = process.env;

assert(PORT, 'PORT is required');
assert(HOST, 'HOST is required');
assert(DATABASE_NAME, 'DATABASE_NAME is required');
assert(DATABASE_USERNAME, 'DATABASE_USERNAME is required');
assert(DATABASE_PASSWORD, 'DATABASE_PASSWORD is required');


export = {
  port: PORT,
  host: HOST,
  url: HOST_URL,
  database_name: DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
}
