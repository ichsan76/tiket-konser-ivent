import Image from "next/image";
import { convertIDR } from "@/utils/currency";
import styles from "./InvoiceAdmin.module.scss";

type TransactionProps = {
  transaction: {
    id: string;
    username: string;
    amount: string;
    date: string;
    image: string;
    itemDetails: {
      id: string;
      name: string;
      price: number;
      quantity: number;
      category: string;
    }[];
    userId: string;
  };
  user: [] | any;
};

const InvoiceAdminView = ({ transaction, user }: TransactionProps) => {
  const { id, username, amount, date, image, itemDetails, userId } =
    transaction;

  const dataUser = user;

  const mainAddress = dataUser?.address
    ? dataUser.address.find((addr: any) => addr.isMain === true)
    : null;

  if (!mainAddress) {
    console.log(
      "User does not have a main address or address data is missing."
    );
  } else {
    console.log(mainAddress);
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.title__text}>I-Vent E-Ticket</p>
      </div>
      <div className={styles.invoice}>
        <div className={styles.invoice__main}>
          <div className={styles.invoice__main__content}>
            <div className={styles.invoice__main__content__left}>
              <Image
                className={styles.invoice__main__content__left__image}
                src={image}
                alt={username}
                width={150}
                height={150}
              />
              <h1>I-Vent Tiket Konser</h1>
              <p>
                Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok,
                Kabupaten Sleman, Daerah Istimewa Yogyakarta
              </p>
              <p>Yogyakarta,55281</p>
              <h3>Indonesia</h3>
            </div>
            <div className={styles.invoice__main__content__right}>
              <h1>INVOICE</h1>
            </div>
          </div>
          <div className={styles.invoice__main__content}>
            <div className={styles.invoice__main__content__left}>
              <h3>Bill To</h3>
              <p className={styles.invoice__main__content__left__name}>
                {username}
              </p>
              <p
                className={`${styles.invoice__main__content__left__address} ${
                  !mainAddress ? styles.emptyAddress : ""
                }`}
              >
                {mainAddress ? mainAddress.addressLine : "Alamat Kosong"}
              </p>
              {/* <p>Yogyakarta,55281</p> */}
              <p className={styles.invoice__main__content__left__phone}>
                Yogyakarta
              </p>
              <h3>Indonesia</h3>
            </div>
            <div className={styles.invoice__main__content__right}>
              <div className={styles.invoice__main__content__right__data}>
                <div className={styles.invoice__main__content__right__data}>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Invoice#
                    </p>
                    <p>{id}</p>
                  </div>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Invoice Date
                    </p>
                    <p>{date}</p>
                    {/* <p>{transactionsData?.transactions[0].created_at}</p> */}
                  </div>
                  <div
                    className={styles.invoice__main__content__right__data__item}
                  >
                    {/* <p
                      className={
                        styles.invoice__main__content__right__data__item__title
                      }
                    >
                      Payment Type
                    </p>
                    <p> GoPay</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.invoice__summary}>
          <table className={styles.invoice__summary__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {itemDetails?.map((item: any, index: number) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{convertIDR(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td>{convertIDR(item.price * item.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.invoice__summary__total}>
            <p className={styles.invoice__summary__total__title}>Total</p>
            <p className={styles.invoice__summary__total__price}>
              {convertIDR(amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceAdminView;
