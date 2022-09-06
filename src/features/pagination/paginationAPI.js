import axios from '../../utils/axios';

export const getTotalTransactions = async () => {
    const response = await axios.get(`/transactions`);
    return response.data.length;
};
