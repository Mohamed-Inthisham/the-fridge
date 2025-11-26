// src/services/dateUtils.js
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

// Enable the plugin to parse "DD/MM/YYYY"
dayjs.extend(customParseFormat);

export const calculateStatus = (dateString) => {
  // 1. Parse the API date
  const expiryDate = dayjs(dateString, "DD/MM/YYYY");
  const today = dayjs().startOf('day'); // Ignore time, just compare dates
  const oneMonthFromNow = dayjs().add(1, 'month');

  // 2. Compare
  if (expiryDate.isBefore(today)) {
    return "Expired";
  } 
  
  if (expiryDate.isBefore(oneMonthFromNow)) {
    return "Expiring soon";
  }

  return "Healthy";
};