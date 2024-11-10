import InvoiceAdminView from "@/components/views/Checkout/Invoice/Admin";
import userServices from "@/services/user";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const InvoiceAdminPage = () => {
  const router = useRouter();
  const { id, username, amount, date, image, itemDetails, userId } =
    router.query;

  const [transaction, setTransaction] = useState({
    id: "",
    username: "",
    amount: "",
    date: "",
    image: "",
    itemDetails: [],
    userId: "",
  });

  console.log(itemDetails);

  useEffect(() => {
    if (router.isReady) {
      setTransaction({
        id: id as string,
        username: username as string,
        amount: amount as string,
        date: date as string,
        image: image as string,
        userId: userId as string,
        itemDetails: itemDetails ? JSON.parse(itemDetails as string) : [],
      });
    }
  }, [router.isReady, id, userId, username, amount, date, image, itemDetails]);

  const [userData, setuserData] = useState([]);
  const getAddress = async () => {
    const { data } = await userServices.getAllUsers();
    setuserData(data.data);
  };

  useEffect(() => {
    getAddress();
  }, []);

  // Find address data for the current userId
  const data = userData?.find((user: any) => user.id === userId);

  console.log(data);
  console.log(id);
  console.log(userId);

  console.log(userData);

  return (
    <div>
      <InvoiceAdminView user={data} transaction={transaction} />
    </div>
  );
};

export default InvoiceAdminPage;
