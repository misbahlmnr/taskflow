import axios from "axios";

// Using Supabase instead of REST API calls
// This file is kept for compatibility but may not be used
export const axiosInstance = axios.create({
  baseURL: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
});
