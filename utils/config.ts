import * as dotenv from 'dotenv';
dotenv.config();

const IP = process.env.IP || 'localhost';
const PORT = process.env.PORT || '3001';
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.MONGODB_URI || '';

export default {
  IP,
  PORT,
  NODE_ENV,
  MONGODB_URI,
};
