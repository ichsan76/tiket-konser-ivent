import styles from "./Card.module.scss";
import Image from "next/image";
import { Product } from "@/types/product.type";

type PropTypes = {
  product: Product;
};

const Card = (props: PropTypes) => {
  const { product } = props;
  return (
    <div className={styles.card}>
      <Image
        src={product.image}
        alt="concert"
        width={500}
        height={500}
        className={styles.card__image}
      />
      <p className={styles.card__title}>{product?.name}</p>
      <p className={styles.card__region}>{product?.region}</p>
      <p className={styles.card__genre}>{`${product?.genres},`}</p>
    </div>
  );
};

export default Card;
