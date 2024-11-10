import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import {
  Dispatch,
  FormEvent,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  profile: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  setProfile: Dispatch<SetStateAction<any>>;
  selectedAddress: number;
};

const ModalChangeAddress = (props: PropTypes) => {
  const {
    profile,
    setProfile,
    setChangeAddress,
    setSelectedAddress,
    selectedAddress,
  } = props;
  const [isLoading, setIsloading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const { setToaster } = useContext(ToasterContext);

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    let data;
    if (profile.address) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsloading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Add New Address",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Add New Address",
      });
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const address = profile.address;
    address.splice(id, 1);
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsloading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Delete Address",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Delete Address",
      });
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const address = profile.address;
    address.forEach((item: { isMain: boolean }, index: number) => {
      if (index === id) {
        item.isMain = true;
      } else {
        item.isMain = false;
      }
    });

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsloading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        setToaster({
          variant: "success",
          message: "Success Change Main Address",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Change Main Address",
      });
    }
  };

  const handleChangeAddress = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };

    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsloading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success Change Address",
        });
      }
    } catch (error) {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Change Address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Select Customer Address</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div key={item.addressLine}>
          <div
            className={`${styles.modal__address} ${
              id === selectedAddress && styles["modal__address--active"]
            }`}
          >
            <div
              className={styles.modal__address__info}
              onClick={() => {
                setSelectedAddress(id);
                setChangeAddress(false);
              }}
            >
              <h4 className={styles.modal__address__info__title}>
                Recipient: {item.recipient}
              </h4>
              <p>Phone: {item.phone}</p>
              <p>Address: {item.addressLine}</p>
              <p> Note : {item.note}</p>
            </div>
            <div className={styles.modal__address__action}>
              <Button
                type="button"
                className={styles.modal__address__action__delete}
                onClick={() => handleDeleteAddress(id)}
                disabled={isLoading || id === selectedAddress}
              >
                <i className="bx bxs-trash"></i>
              </Button>
              <Button
                type="button"
                className={styles.modal__address__action__change}
                onClick={() => handleChangeMainAddress(id)}
                disabled={isLoading || item.isMain}
              >
                <i className="bx bx-purchase-tag"></i>
              </Button>
              <Button
                type="button"
                className={styles.modal__address__action__change}
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                disabled={isLoading}
              >
                <i className="bx bx-edit-alt"></i>
              </Button>
            </div>
          </div>
          {id === updateAddress && (
            <div className={styles.modal__form}>
              <form
                className={styles.modal__form__group}
                onSubmit={handleChangeAddress}
              >
                <Input
                  type="text"
                  name="recipient"
                  label="Recipient"
                  placeholder="Insert Recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="text"
                  name="phone"
                  label="Recipient Phone"
                  placeholder="Insert Recipient Phone"
                  defaultValue={item.phone}
                />
                <Textarea
                  placeholder="Insert Address"
                  name="addressLine"
                  label="Address Line"
                  defaultValue={item.addressLine}
                />
                <Input
                  type="text"
                  placeholder="Insert Note"
                  name="note"
                  label="Note"
                  defaultValue={item.note}
                />
                <Button
                  className={styles.modal__form__btn}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <Button
        className={styles.modal__btn}
        type="button"
        onClick={() => setIsAddNew(!isAddNew)}
      >
        {isAddNew ? "Cancel" : "Add New Address"}
      </Button>
      {isAddNew && (
        <div className={styles.modal__form}>
          <form
            className={styles.modal__form__group}
            onSubmit={handleAddAddress}
          >
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholder="Insert Recipient"
            />
            <Input
              type="text"
              name="phone"
              label="Recipient Phone"
              placeholder="Insert Recipient Phone"
            />
            <Textarea
              placeholder="Insert Address"
              name="addressLine"
              label="Address Line"
            />
            <Input
              type="text"
              placeholder="Insert Note"
              name="note"
              label="Note"
            />
            <Button
              className={styles.modal__form__btn}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
};

export default ModalChangeAddress;
