import TransactionMemberView from "@/components/views/Member/Transaction";
import userServices from "@/services/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TransactionMemberPage = () => {
  const [transaction, setTransaction] = useState([]);
  const getAllTransaction = async () => {
    const { data } = await userServices.getProfile();
    setTransaction(data.data);
  };
  useEffect(() => {
    getAllTransaction();
  }, []);

  return <TransactionMemberView transaction={transaction} />;
};

export default TransactionMemberPage;
