import getToken from "@/lib/getToken";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: 'application/json',
  },
});

//interceptors just like middleware

api.interceptors.request.use((config) => {
  const token = getToken();
  // console.log("session Storage",token);
  

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (data: { email: string; password: string }) => {
  return api.post("/api/users/login", data);
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  return api.post("/api/users/register", data);
};

export const getBooks = async () => {
  return api.get("/api/books/get-all-books");
};

export const createBooks = async (data: any) => {
  const resp = await api.post("/api/books/create", data, {
    headers: {
      "Content-Type": "multipart/form-data", // Important for file uploads
    },
  });
  return resp.data;
};

export const deleteBook = async (id: string) => {
  alert(`Delete ${id}`)
  const resp = await api.delete(`/api/books/delete/${id}`);
  return resp.data;
};
