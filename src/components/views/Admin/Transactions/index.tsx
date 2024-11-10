import AdminLayout from "@/components/layouts/AdminLayout";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import styles from "./Transactions.module.scss";
import { convertIDR } from "@/utils/currency";
import Link from "next/link";

type PropTypes = {
  users: User[];
};

const TransactionsAdminView = (props: PropTypes) => {
  const { users } = props;

  const [usersData, setUsersData] = useState<User[] | any>([]);
  const [transactionsData, setTransactionsData] = useState<any>([]);

  useEffect(() => {
    setUsersData(users);

    const transactions = users.flatMap((user) => {
      if (user.transactions) {
        return user.transactions.map((transaction) => ({
          userId: user.id,
          username: user.fullname,
          email: user.email,
          image: user.image,
          ...(transaction as object),
        }));
      } else {
        return [];
      }
    });

    setTransactionsData(transactions);
  }, [users]);

  console.log(usersData);
  console.log(transactionsData);

  return (
    <>
      <AdminLayout>
        <h1 className={styles.transaction__title}>All Transaction Users</h1>
        <div className={styles.transaction__main}>
          <table className={styles.transaction__main__table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date & Time</th>
                <th>Order ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactionsData.map((transaction: any, index: number) => (
                <tr key={transaction.orderId}>
                  <td>{index + 1}</td>
                  <td>{transaction.created_at}</td>
                  <td>{transaction.orderId}</td>
                  <td>{transaction.username}</td>
                  <td>{transaction.email}</td>
                  <td>{transaction.paymentMethod || "N/A"}</td>
                  <td>{transaction.status || "Sukses"}</td>
                  <td>{convertIDR(transaction.gross_amount)}</td>
                  <td>
                    <Link
                      className={styles.transaction__main__table__link}
                      href={{
                        pathname: `/invoice/admin/${transaction.orderId}`,
                        query: {
                          username: transaction.username,
                          amount: transaction.gross_amount,
                          date: transaction.created_at,
                          image: transaction.image,
                          name: transaction.name,
                          userId: transaction.userId,
                          itemDetails: JSON.stringify(transaction.itemDetails),
                          // Add other props here as needed
                        },
                      }}
                      key={(transaction.orderId, transactionsData)}
                    >
                      <i className="bx bx-receipt" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
};

export default TransactionsAdminView;
