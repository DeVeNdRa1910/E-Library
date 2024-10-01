import getToken from "@/lib/getToken";
import axios from "axios";
import { bookSchema } from "@/lib/validators/bookChema";

const api = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 50000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

//interceptors just like middleware

api.interceptors.request.use((config) => {
  const token = getToken();
  // console.log(token);
  
  if(token && config.headers){
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
})

export const login = async (data: {email: string, password: string}) => {
  return api.post('/api/users/login', data)
}

export const register = async (data: {name: string, email: string, password: string, role: string}) => {
  return api.post('/api/users/register', data)
}

export const getBooks = async () => {
  return api.get('/api/books/get-all-books')
}

export const createBooks = async (data: any) => {
  return api.post('/api/books/create', data, {
      headers: {
        "Content-Type": "multipart/form-data", // Important for file uploads
      },
    }
  )
}