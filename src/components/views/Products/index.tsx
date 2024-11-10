import styles from "./Products.module.scss";
import { Product } from "@/types/product.type";
import Link from "next/link";
import Card from "./Card";
import { useEffect, useState } from "react";

type PropTypes = {
  products: Product[];
};

const ProductView = (props: PropTypes) => {
  const { products } = props;
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [allGenres, setAllGenres] = useState<string[]>([]);

  useEffect(() => {
    const genresSet = new Set<string>();
    products.forEach((product) => {
      product.genres.forEach((genre: any) => genresSet.add(genre));
    });
    setAllGenres(Array.from(genresSet));
  }, [products]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  const filteredProducts = selectedGenres.length
    ? products.filter((product) =>
        product.genres.some((genre: any) => selectedGenres.includes(genre))
      )
    : products;

  return (
    <div className={styles.product}>
      <h1 className={styles.product__title}>
        All Concert ({filteredProducts.length})
      </h1>
      <div className={styles.product__main}>
        <div className={styles.product__main__filter}>
          <div className={styles.product__main__filter__data}>
            <h4 className={styles.product__main__filter__data__title}>Genre</h4>
            <div className={styles.product__main__filter__data__list}>
              {allGenres.map((genre) => (
                <div
                  className={styles.product__main__filter__data__list__item}
                  key={genre}
                >
                  <input
                    type="checkbox"
                    id={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <label
                    className={
                      styles.product__main__filter__data__list__item__label
                    }
                    htmlFor={genre}
                  >
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.product__main__content}>
          {filteredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
