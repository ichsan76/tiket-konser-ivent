import { useEffect, useState } from "react";
import styles from "./InvoiceMember.module.scss";
import Image from "next/image";
import { convertIDR } from "@/utils/currency";

type Propstypes = {
  orderId: any;
  transaction: any;
};

const InvoiceMemberView = ({ orderId, transaction }: Propstypes) => {
  console.log(orderId);
  console.log(transaction);

  const [transactionsData, setTransactionsData] = useState<any>([]);
  const [profile, setProfile] = useState<any>([]);
  const [billingAddress, setBillingAddress] = useState<any>({});

  useEffect(() => {
    if (transaction && transaction.transactions && orderId) {
      const foundTransaction = transaction.transactions.find(
        (transaksi: any) => transaksi.orderId === orderId
      );

      if (foundTransaction) {
        setTransactionsData(foundTransaction.itemDetails);
      }

      const mainAddress = transaction.address.find(
        (addr: any) => addr.isMain === true
      );

      if (mainAddress) {
        setBillingAddress(mainAddress);
      }
    }
  }, [orderId, transaction]);

  useEffect(() => {
    // Memastikan transaction.transactions tidak kosong dan orderId tidak null/undefined
    if (transaction.transactions && orderId) {
      // Filter transaksi berdasarkan orderId
      const filteredTransactions = transaction.transactions.filter(
        (transaksi: any) => transaksi.orderId === orderId
      );
      setTransactionsData(filteredTransactions);
    }
  }, [orderId, transaction]);

  useEffect(() => {
    setProfile(transaction);
  }, [transaction]);

  // console.log(billingAddress);
  // console.log(profile.transactions[0].created_at);
  console.log(transactionsData);

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
                src={profile.image}
                alt="logo"
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
                {profile?.fullname}
              </p>
              <p className={styles.invoice__main__content__left__address}>
                {billingAddress?.addressLine}
              </p>
              {/* <p>Yogyakarta,55281</p> */}
              <p className={styles.invoice__main__content__left__phone}>
                {billingAddress?.phone}
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
                    <p>{orderId}</p>
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
                    <p>{transactionsData[0]?.created_at}</p>
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
              {transactionsData.map((transaction: any, index: number) =>
                transaction.itemDetails.map((item: any, itemIndex: number) => (
                  <tr key={item.id}>
                    <td>
                      {index * transaction.itemDetails.length + itemIndex + 1}
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price.toLocaleString()}</td>
                    <td>{item.quantity}</td>
                    <td>{(item.price * item.quantity).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className={styles.invoice__summary__total}>
            <p className={styles.invoice__summary__total__title}>Total</p>
            <p className={styles.invoice__summary__total__price}>
              {convertIDR(transactionsData[0]?.gross_amount)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceMemberView;
