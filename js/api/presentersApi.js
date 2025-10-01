import { ApiClient } from "./apiClient.js";
const apiClient = new ApiClient("/presenters"); 


export const createPresenter = (activityID, data)=> apiClient.post(`/activities/${activityID}/presenters`, data);
export const getPresenters = (activityID)=> apiClient.get(`/activities/${activityID}/presenters`);
export const updatePresenter = (id, data)=> apiClient.put(`/${id}`, data);
export const deletePresenter = (id)=> apiClient.delete(`/${id}`);
