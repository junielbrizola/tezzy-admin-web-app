import axios from 'axios';

const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? `https://${process.env.VERCEL_URL}/api` : 'http://localhost:3000/api';


const http = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { http };
