// src/services/itemService.js
import apiClient from './api';
import { URL } from '../config/constants'; // Import the names

// 1. GET ALL
export const getAllItems = async () => {
  // Uses URL.GET_ALL_ITEMS
  const response = await apiClient.get(URL.GET_ALL_ITEMS);
  return response.data;
};

// 2. CREATE
export const createItem = async (data) => {
  // Uses URL.CREATE_ITEM
  const response = await apiClient.post(URL.CREATE_ITEM, data);
  return response.data;
};

// 3. DELETE
export const deleteItem = async (id) => {
  // Uses URL.DELETE_ITEM + ID
  const response = await apiClient.delete(`${URL.DELETE_ITEM}/${id}`);
  return response.data;
};

// 4. UPDATE
export const updateItem = async (id, data) => {
  // Uses URL.UPDATE_ITEM + ID
  const response = await apiClient.put(`${URL.UPDATE_ITEM}/${id}`, data);
  return response.data;
};