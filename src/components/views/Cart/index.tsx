import styles from "./Cart.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import { Fragment, useContext, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useSession } from "next-auth/react";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Link from "next/link";

const CartView = () => {
  const { setToaster } = useContext(ToasterContext);
  const session: any = useSession();
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState<Product[]>([]);
  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  const getProduct = (id: string) => {
    const product: any = products.find((product: Product) => product.id === id);
    return product;
  };

  const getAmount = (id: string, category: string) => {
    const product = products.find((product) => product.id === id);
    const price = product?.prices.find(
      (price) => price.category === category
    )?.idr;
    return price;
  };

  const getTotalPrize = () => {
    const total = cart.reduce(
      (acc: number, item: { id: string; category: string; qty: number }) => {
        const product: any = getProduct(item.id);
        const price: any = getAmount(item.id, item.category);
        return (acc += parseInt(price) * item.qty);
      },
      0
    );
    return total;
  };

  const getOptionsCategory = (id: string, selected: string) => {
    const product = products.find((product: Product) => product.id === id);

    const options: any = product?.stocks.map(
      (stock: { category: string; qty: number }) => {
        if (stock.qty > 0) {
          return {
            label: stock.category,
            value: stock.category,
            selected: stock.category === selected,
          };
        }
      }
    );

    const data = options?.filter((option: any) => option !== undefined);
    return data;
  };

  const handleDeleteCart = async (id: string, category: string) => {
    const newCart = cart.filter((item: { id: string; category: string }) => {
      return item.id !== id || item.category !== category;
    });

    try {
      const result = await userServices.addToCart({
        carts: newCart,
      });

      if (result.status === 200) {
        setCart(newCart);
        setToaster({
          variant: "success",
          message: "Success Delete Item From Cart",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed Delete Item From Cart",
      });
    }
  };

  return (
    <div className={styles.cart}>
      <div className={styles.cart__main}>
        <h1 className={styles.cart__main__title}>Cart</h1>
        {cart.length > 0 ? (
          <div className={styles.cart__main__list}>
            {cart.map((item: { id: string; category: string; qty: number }) => (
              <Fragment key={`${item.id}-${item.category}`}>
                <div className={styles.cart__main__list__item}>
                  {getProduct(item.id)?.image && (
                    <Image
                      src={`${getProduct(item.id)?.image}`}
                      width={100}
                      height={100}
                      alt={`${item.id}-${item.category}`}
                      className={styles.cart__main__list__item__image}
                    />
                  )}
                  <div className={styles.cart__main__list__item__info}>
                    <h4 className={styles.cart__main__list__item__info__title}>
                      {getProduct(item.id)?.name}
                    </h4>
                    <p className={styles.cart__main__list__item__info__genre}>
                      {`${getProduct(item.id)?.genres},`}
                    </p>

                    <div className={styles.cart__main__list__item__info__data}>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__category
                        }
                      >
                        Category
                        <Select
                          name="category"
                          options={getOptionsCategory(item.id, item.category)}
                          disabled
                        />
                      </label>
                      <label
                        className={
                          styles.cart__main__list__item__info__data__qty
                        }
                      >
                        Quantity
                        <Input
                          className={
                            styles.cart__main__list__item__info__data__qty__input
                          }
                          disabled
                          name="qty"
                          type="number"
                          defaultValue={item.qty}
                        />
                      </label>
                    </div>
                    <button
                      type="button"
                      className={styles.cart__main__list__item__info__delete}
                      onClick={() => handleDeleteCart(item.id, item.category)}
                    >
                      <i className="bx bxs-trash"></i>
                    </button>
                  </div>
                  <h4 className={styles.cart__main__list__item__price}>
                    {convertIDR(getAmount(item.id, item.category))}
                  </h4>
                </div>
                <hr className={styles.cart__main__list__divider} />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className={styles.cart__main__empty}>
            <h1 className={styles.cart__main__empty__title}>
              Cart is Empty. Choose Your Concert
            </h1>
          </div>
        )}
      </div>
      <div className={styles.cart__summary}>
        <h1 className={styles.cart__summary__title}>Summary</h1>
        <div className={styles.cart__summary__item}>
          <h4>Subtotal</h4>
          <p> {convertIDR(getTotalPrize())}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Admin Fee</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <div className={styles.cart__summary__item}>
          <h4>Tax</h4>
          <p>{convertIDR(0)}</p>
        </div>
        <hr />
        <div className={styles.cart__summary__item}>
          <h4>Total</h4>
          <p> {convertIDR(getTotalPrize())}</p>
        </div>
        <hr />
        <Link href="/checkout">
          <Button type="button" className={styles.cart__summary__button}>
            Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CartView;
