import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
};

const DetailProductView = (props: PropTypes) => {
  const { product, productId, cart } = props;
  const { setToaster } = useContext(ToasterContext);
  const { status }: any = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddToCart = async () => {
    if (selectedCategory !== "") {
      let newCart = [];
      if (
        cart.filter(
          (item: any) =>
            item.id === productId && item.category === selectedCategory
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.category === selectedCategory) {
            item.qty += 1;
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            id: productId,
            category: selectedCategory,
            qty: 1,
          },
        ];
      }
      try {
        const result = await userServices.addToCart({
          carts: newCart,
        });
        if (result.status === 200) {
          setSelectedCategory("");

          setToaster({
            variant: "success",
            message: "Success Add To Cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed Add To Cart",
        });
      }
    }
  };

  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          <Image
            src={product?.image}
            alt={product?.name}
            width={400}
            height={400}
            className={styles.detail__main__left__image}
          />
        </div>
        <div className={styles.detail__main__right}>
          <h1>{product?.name}</h1>
          <h2>{product?.region}</h2>
          <h3 className={styles.detail__main__right__genre}>
            {`${product?.genres},`}
          </h3>
          <div className={styles.detail__main__right__price}>
            {/* {convertIDR(product?.prices?.[0]?.idr)} */}
            {product?.prices?.map((item: { category: string; idr: number }) => (
              <div
                className={styles.detail__main__right__price__item}
                key={item.category}
              >
                <div
                  className={styles.detail__main__right__price__item__title}
                >{`${item.category}`}</div>
                <div className={styles.detail__main__right__price__item__idr}>
                  {convertIDR(item.idr)}
                </div>
              </div>
            ))}
          </div>
          <p className={styles.detail__main__right__description}>
            {product?.description}
          </p>
          <p className={styles.detail__main__right__subtitle}>
            Select Ticket Category
          </p>
          <div className={styles.detail__main__right__stock}>
            {product?.stocks?.map((item: { category: string; qty: number }) => (
              <div
                className={styles.detail__main__right__stock__item}
                key={item.category}
              >
                <input
                  className={styles.detail__main__right__stock__item__input}
                  type="radio"
                  id={`category-${item.category}`}
                  name="category"
                  disabled={item.qty === 0}
                  onClick={() => setSelectedCategory(item.category)}
                  checked={selectedCategory === item.category}
                />
                <label
                  className={styles.detail__main__right__stock__item__label}
                  htmlFor={`category-${item.category}`}
                >
                  {item.category}
                </label>
              </div>
            ))}
          </div>
          <Button
            className={styles.detail__main__right__add}
            type={status === "authenticated" ? "submit" : "button"}
            onClick={() => {
              status === "unauthenticated"
                ? router.push(`/auth/login?callbackUrl=${router.asPath}`)
                : handleAddToCart();
            }}
          >
            Add To Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailProductView;
