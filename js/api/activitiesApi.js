import { ApiClient } from "./apiClient.js";
const apiClient = new ApiClient("/activities"); 

export const createActivity = (data)=> apiClient.post("/", data);
export const getActivities = ()=> apiClient.get("/");
export const getActivity = (id)=> apiClient.get(`/${id}`);
export const updateActivity = (id, data)=> apiClient.put(`/${id}`, data);
export const deleteActivity = (id)=> apiClient.delete(`/${id}`);
// search for Activities by query {type, date}
export const searchActivities = (query)=> apiClient.get("/search", query);