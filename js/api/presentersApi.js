// Presenters
import { ApiClient } from "apiClient";
const apiClient = new ApiClient("/presenters"); 

export const createPresenter = (activityID, data)=> apiClient.post(`/${activityID}/presenters`, data);
export const getPresenters = (activityID, data)=> apiClient.get(`/${activityID}/presenters`, data);
export const updatePresenter = (id, data)=> apiClient.put(`/${id}`, data);
export const deletePresenter = (id)=> apiClient.delete(`/${id}`);
