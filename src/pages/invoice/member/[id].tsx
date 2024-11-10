import InvoiceMemberView from "@/components/views/Checkout/Invoice/Member";
import userServices from "@/services/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvoiceMemberPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [transaction, setTransaction] = useState([]);
  const getAllTransaction = async () => {
    const { data } = await userServices.getProfile();
    setTransaction(data.data);
  };
  useEffect(() => {
    getAllTransaction();
  }, []);

  console.log(transaction);

  return (
    <div>
      <InvoiceMemberView orderId={id} transaction={transaction} />
    </div>
  );
};

export default InvoiceMemberPage;
