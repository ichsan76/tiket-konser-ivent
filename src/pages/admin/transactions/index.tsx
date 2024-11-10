import TransactionsAdminView from "@/components/views/Admin/Transactions";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

const AdminTransactionsPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <TransactionsAdminView users={users} />
    </>
  );
};

export default AdminTransactionsPage;
