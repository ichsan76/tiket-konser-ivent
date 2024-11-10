import { Product } from "@/types/product.type";
import styles from "./LandingPage.module.scss";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

type PropTypes = {
  products: Product[];
};

const LandingPageView = (props: PropTypes) => {
  const { products } = props;

  console.log(products);

  const getImage = products.map((item) => {
    return item.image;
  });

  console.log(getImage);

  return (
    <>
      <div className={styles.landingPage}>
        <div className={styles.landingPage__carousel}>
          <div className={styles.landingPage__carousel__list}>
            {products.map((item, index) => (
              <div
                key={index}
                className={styles.landingPage__carousel__list__item}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div
                  className={styles.landingPage__carousel__list__item__content}
                >
                  <div
                    className={
                      styles.landingPage__carousel__list__item__content__title
                    }
                  >
                    Konser
                  </div>
                  <div
                    className={
                      styles.landingPage__carousel__list__item__content__name
                    }
                  >
                    {item.name}
                  </div>
                  <div
                    className={
                      styles.landingPage__carousel__list__item__content__desc
                    }
                  >
                    {item.description}
                  </div>
                  <div
                    className={
                      styles.landingPage__carousel__list__item__content__btn
                    }
                  >
                    <Link
                      className={
                        styles.landingPage__carousel__list__item__content__btn_link
                      }
                      href="/products"
                    >
                      <button>See More</button>
                      <button>Buy Now</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Uncomment below to add carousel navigation arrows */}
          {/* <div className={styles.landingPage__carousel__arrows}>
            <button className={styles.landingPage__carousel__arrows__prev}>
              <i className="bx bx-chevron-left-circle"></i>
            </button>
            <button className={styles.landingPage__carousel__arrows__next}>
              <i className="bx bx-chevron-right-circle"></i>
            </button>
          </div> */}

          <div className={styles.landingPage__carousel__timeRunning}></div>
        </div>
      </div>
    </>
  );
};

export default LandingPageView;
