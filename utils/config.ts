import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || '3001';
const BASE_URI = process.env.BASE_URI || 'http://localhost:3001';
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = (process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI) || ''

export default {
  PORT,
  BASE_URI,
  NODE_ENV,
  MONGODB_URI,
};
