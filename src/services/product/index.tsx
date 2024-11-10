import instance from "@/lib/axios/instance";

const endpoint = "/api/product";

const productServices = {
  getAllProducts: () => instance.get(endpoint),
  getDetailProduct: (id: string) => instance.get(`${endpoint}/${id}`),
  addProduct: async (data: any) => {
    const response = await instance.post(endpoint, data);

    return response;
  },
  updateProduct: async (id: string, data: any) => {
    const response = await instance.put(`${endpoint}/${id}`, { data });
    return response;
  },
  deleteProduct: (id: string) => instance.delete(`${endpoint}/${id}`),
};

export default productServices;
