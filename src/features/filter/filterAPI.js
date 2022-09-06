import axiosInstance from "../../utils/axios";

export const getFilteredTransactions = async (type) => {
  const response = await axiosInstance.get(`/transactions/?type=${type}`);
  return response.data;
};
