import { ApiClient } from "apiClient";
const apiClient = new ApiClient("/users");

export const login = (data)=> apiClient.post("/login", data);
export const register = (data)=> apiClient.post("/register", data);
export const getAllUsers = ()=> apiClient.get("/");
export const getProfile = ()=> apiClient.get("/profile");
export const updateUser = (id, data)=> apiClient.put(`/${id}`, data);
export const deleteUser = (id)=> apiClient.delete(`/${id}`);