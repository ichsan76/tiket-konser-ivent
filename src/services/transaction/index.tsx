import instance from "@/lib/axios/instance";

const endpoint = {
  transaction: "/api/transaction",
  notification: "/api/transaction/notification",
};

const transactionServices = {
  createTransaction: async (data: any) => {
    const response = await instance.post(endpoint.transaction, data);
    return response;
  },

  paymentNotification: async (data: any) => {
    const response = await instance.post(endpoint.notification, data);
    return response;
  },

  getTransactionById: async (id: any) => {
    const response = await instance.get(`${endpoint.transaction}/${id}`);
    return response;
  },

  getTransaction: async () => {
    const response = await instance.get(endpoint.transaction);
    return response;
  },

  updateTransactionStatus: async (id: any, data: any) => {
    const response = await instance.put(`${endpoint.transaction}/${id}`, {
      data,
    });
    return response;
  },
};

export default transactionServices;
