import axios from "axios";

// Using Supabase instead of REST API calls
// This file is kept for compatibility but may not be used
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
