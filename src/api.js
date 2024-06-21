import axios from 'axios';

const API_BASE_URL = 'https://infinion-test-int-test.azurewebsites.net';

export const createCampaign = (campaign) => axios.post(`${API_BASE_URL}/api/Campaign`, campaign);

export const getAllCampaigns = async (page, itemsPerPage) => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await axios.get(`${API_BASE_URL}/api/Campaign`);
  const data = response.data;
  // console.log("Data", data);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const slicedData = data.slice(startIndex, endIndex);

  return {
    data: slicedData,
    totalItems: data.length,
  };
};


export const getCampaignById = (id) => axios.get(`${API_BASE_URL}/api/Campaign/${id}`);

export const updateCampaign = (id, campaign) => axios.put(`${API_BASE_URL}/api/Campaign/${id}`, campaign);

export const deleteCampaign = (id) => axios.delete(`${API_BASE_URL}/api/Campaign/${id}`);

export const updateCampaignStatus = (id, statusPayload) => {
  return axios.put(`${API_BASE_URL}/api/CampaignStatus/${id}`, statusPayload);
};



