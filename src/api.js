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
