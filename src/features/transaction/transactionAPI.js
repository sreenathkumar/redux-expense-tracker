import axios from "../../utils/axios";

export const getTransactions = async () => {
  const response = await axios.get("/transactions");

  return response.data;
};
export const getLimitedTransactions = async (search, type, start, end) => {
  var queryString = `_start=${start}&_end=${end}&_sort=id&_order=desc`;
  if (type !== "") {
    queryString += `&type=${type}`;
  }
  if (search !== "") {
    queryString += `&q=${search}`;
  }
  const response = await axios.get(
    `/transactions/?${queryString}` //
  );

  return response.data;
};

export const addTransaction = async (data) => {
  const response = await axios.post("/transactions", data);

  return response.data;
};

export const editTransaction = async (id, data) => {
  const response = await axios.put(`/transactions/${id}`, data);

  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = axios.delete(`/transactions/${id}`);

  return response.data;
};
