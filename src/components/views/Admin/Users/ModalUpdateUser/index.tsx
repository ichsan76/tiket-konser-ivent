import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import {
  Dispatch,
  SetStateAction,
  useState,
  FormEvent,
  useContext,
} from "react";
import { User } from "@/types/user.type";
import styles from "./ModalUpdateUser.module.scss";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  setUsersData: Dispatch<SetStateAction<User[]>>;
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
};

const ModalUpdateUser = (props: PropTypes) => {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const { setToaster } = useContext(ToasterContext);

  const [isLoading, setIsloading] = useState(false);
  const handleUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form: any = event.target as HTMLFormElement;
    const data = {
      role: form.role.value,
    };

    try {
      const result = await userServices.updateUser(updatedUser.id, data);
      if (result.status === 200) {
        setIsloading(false);
        setUpdatedUser({});
        const { data } = await userServices.getAllUsers();
        setUsersData(data.data);
        setToaster({
          variant: "success",
          message: "Success Update User",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update User",
      });
    }
  };
  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleUpdateUser} className={styles.form}>
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={updatedUser.email}
          disabled
          className={styles.form__input}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          defaultValue={updatedUser.fullname}
          disabled
          className={styles.form__input}
        />
        <Input
          label="Phone Number"
          name="phone"
          type="number"
          defaultValue={updatedUser.phone}
          disabled
          className={styles.form__input}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            { label: "Member", value: "member" },
            { label: "Admin", value: "admin" },
          ]}
          className={styles.form__input}
        />
        <Button type="submit">{isLoading ? "Loading..." : "Update"}</Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateUser;
