// Tickets
import { ApiClient } from "apiClient";
const apiClient = new ApiClient("/tickets"); 

export const createTicket = (data)=> apiClient.post("/", data);
export const getAllTickets = ()=> apiClient.get("/");
export const getTicket = (id)=> apiClient.get(`/${id}`);
export const updateTicket = (id, data)=> apiClient.put(`/${id}`, data);
export const deleteTicket = (id)=> apiClient.delete(`/${id}`);
export const reserveTicket = (id)=> apiClient.post(`/${id}/reserve`);
export const cancelTicket = (id)=> apiClient.post(`/${id}/cancel`);