import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import Modal from "@/components/ui/Modal";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { User } from "@/types/user.type";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;

  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
};

const ModalDeleteUser = (props: PropTypes) => {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsloading] = useState(false);

  const handleDelete = async () => {
    try {
      const result = await userServices.deleteUser(deletedUser.id);
      if (result.status === 200) {
        setIsloading(false);
        setToaster({
          variant: "success",
          message: "Success Delete User",
        });
        setDeletedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete User",
      });
    }
  };
  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>Are you sure to delete this user?</h1>
      <Button type="button" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "Yes, Delete"}
      </Button>
    </Modal>
  );
};

export default ModalDeleteUser;
