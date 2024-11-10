import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Transaction.module.scss";
import { Fragment, useEffect, useState } from "react";
import { convertIDR } from "@/utils/currency";
import Link from "next/link";

type PropTypes = {
  transaction: any;
};
const TransactionMemberView = (props: PropTypes) => {
  const { transaction } = props;
  const [transactionsData, setTransactionsData] = useState([]);

  useEffect(() => {
    setTransactionsData(transaction.transactions);
  }, [transaction]);

  // const transactions = Array.isArray(transactionsData) ? transactionsData : [];

  console.log(transactionsData);

  return (
    <MemberLayout>
      <h1 className={styles.transaction__title}>Member Transaction Page</h1>
      <div className={styles.transaction__main}>
        <table className={styles.transaction__main__table}>
          <thead>
            <tr>
              <th rowSpan={2}>#</th>
              <th rowSpan={2}>Date & Time</th>
              <th rowSpan={2}>Order ID</th>
              <th rowSpan={2}>Status</th>
              <th rowSpan={2}>Amount</th>
              <th rowSpan={2}>Invoice</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData?.map((transactions: any, index: number) => (
              <Fragment key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{transactions.created_at}</td>
                  <td>{transactions.orderId}</td>
                  <td>Success</td>
                  <td>{convertIDR(transactions.gross_amount)}</td>
                  <td>
                    <Link
                      href={`/invoice/member/${transactions.orderId}`}
                      key={transactions.orderId}
                    >
                      <i className="bx bx-receipt" />
                    </Link>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </MemberLayout>
  );
};

export default TransactionMemberView;
