// // services/api.js
// import axios from "axios";
// import React, { useState } from "react";

// // Set the base URL for the API
// const API_BASE_URL =
//   "https://project-5-productivity-backend-1b67e4c3722a.herokuapp.com/api";

// // Create an Axios instance with default configurations
// const api = axios.create({
//   baseURL: "https://pp5-productivity-app-frontend-ea1d8fc6e9da.herokuapp.com//",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default // Intercept requests and add the JWT token to the Authorization header
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Define API functions
// export const getTasks = async (params) => {
//   try {
//     const response = await api.get("/tasks", { params });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getTask = async (id) => {
//   try {
//     const response = await api.get(`/tasks/${id}`);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const createTask = async (taskData) => {
//   try {
//     const response = await api.post("/tasks", taskData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateTask = async (id, taskData) => {
//   try {
//     const response = await api.put(`/tasks/${id}`, taskData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const deleteTask = async (id) => {
//   try {
//     await api.delete(`/tasks/${id}`);
//   } catch (error) {
//     throw error;
//   }
// };

// export const login = async (credentials) => {
//   try {
//     const response = await api.post("/auth/login", credentials);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const register = async (userData) => {
//   try {
//     const response = await api.post("/auth/register", userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const getUserProfile = async () => {
//   try {
//     const response = await api.get("/users/me");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateUserProfile = async (userData) => {
//   try {
//     const response = await api.put("/users/me", userData);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// src/services/api.js (or wherever your API file is located)
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://127.0.0.1:8000", // Adjust this to your backend URL
//   timeout: 1000,
//   headers: { "Content-Type": "application/json" },
// });

// export default api;

import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";

const baseURL = isProduction
  ? process.env.REACT_APP_BACKEND_URL_PROD
  : process.env.REACT_APP_BACKEND_URL;

const api = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export default api;
