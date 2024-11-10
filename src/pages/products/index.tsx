import ProductView from "@/components/views/Products";
import Head from "next/head";
import { useState, useEffect } from "react";
import productServices from "@/services/product";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products} />
    </>
  );
};

export default ProductPage;
