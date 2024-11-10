import instance from "@/lib/axios/instance";
import { get } from "http";

const endpoint = {
  user: "/api/user",
  profile: "/api/user/profile",
  cart: "/api/user/cart",
  transaction: "/api/transaction",
};

const userServices = {
  getAllUsers: () => instance.get(endpoint.user),
  updateUser: (id: string, data: any) =>
    instance.put(`${endpoint.user}/${id}`, { data }),
  deleteUser: (id: string) => instance.delete(`${endpoint.user}/${id}`),
  getProfile: () => instance.get(endpoint.profile),
  updateProfile: async (data: any) => {
    const response = await instance.put(endpoint.profile, { data });
    return response;
  },
  getCart: () => instance.get(endpoint.cart),
  addToCart: (data: any) => instance.put(endpoint.cart, { data }),

  deleteCart: (id: string) => instance.delete(`${endpoint.cart}/${id}`),

  createTransaction: async (data: any) => {
    const response = await instance.post(endpoint.transaction, data);
    return response;
  },

  getTransaction: async () => {
    const response = await instance.get(endpoint.transaction);
    return response;
  },

  getTransactionById: async (id: string) => {
    const response = await instance.get(`${endpoint.transaction}/${id}`);
    return response;
  },
};

export default userServices;
