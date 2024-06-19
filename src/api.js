import data from './mockData.json';

export const fetchData = async (page, itemsPerPage) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = data.slice(startIndex, endIndex);

  return {
    data: slicedData,
    totalItems: data.length,
  };
};

export const fetchDataByStatus = async (page, itemsPerPage, status) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter data based on the selected status
  const filteredData = data.filter(item => item.status.trim().toLowerCase() === status.trim().toLowerCase());

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = filteredData.slice(startIndex, endIndex);

  return {
    data: slicedData,
    totalItems: filteredData.length,
  };
};


import axios from 'axios';

const API_BASE_URL = 'https://infinion-test-int-test.azurewebsites.net';

export const getAllCampaigns = () => axios.get(`${API_BASE_URL}/api/Campaign`);

export const getCampaignById = (id) => axios.get(`${API_BASE_URL}/api/Campaign/${id}`);

export const createCampaign = (campaign) => axios.post(`${API_BASE_URL}/api/Campaign`, campaign);

export const updateCampaign = (id, campaign) => axios.put(`${API_BASE_URL}/api/Campaign/${id}`, campaign);

export const deleteCampaign = (id) => axios.delete(`${API_BASE_URL}/api/Campaign/${id}`);

export const updateCampaignStatus = (id, status) => axios.put(`${API_BASE_URL}/api/CampaignStatus/${id}`, { campaignStatus: status });
