import axios from 'axios';

const AI_API_BASE_URL =
  process.env.NEXT_PUBLIC_AI_API_BASE_URL

export const chatApiClient = axios.create({
  baseURL: AI_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    accept: '*/*',
  },
  timeout: 60000,
});

export default chatApiClient;
