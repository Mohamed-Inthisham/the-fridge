// src/config/const.js

const BASE_URL = "https://thefridge-api.karapincha.io/fridge";

export const URL = {
    // The main base URL
    BASE_API: BASE_URL,

    // Specific Endpoints
    GET_ALL_ITEMS: BASE_URL,
    CREATE_ITEM: BASE_URL,
    
    // For these, we will append the ID in the service file
    UPDATE_ITEM: BASE_URL, 
    DELETE_ITEM: BASE_URL, 
};