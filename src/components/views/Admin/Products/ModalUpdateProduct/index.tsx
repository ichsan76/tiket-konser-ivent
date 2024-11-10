import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import styles from "./ModalUpdateProduct.module.scss";
import {
  Dispatch,
  SetStateAction,
  useState,
  FormEvent,
  useContext,
} from "react";
import { Product } from "@/types/product.type";
import InputFile from "@/components/ui/InputFile";
import productServices from "@/services/product";
import { uploadFile } from "@/lib/firebase/service";
import Image from "next/image";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropType = {
  updatedProduct: Product | any;
  setUpdatedProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

const ModalUpdateProduct = (props: PropType) => {
  const { updatedProduct, setUpdatedProduct, setProductsData } = props;
  const { setToaster } = useContext(ToasterContext);
  const [isLoading, setIsloading] = useState(false);
  const [genreCount, setGenreCount] = useState(updatedProduct.genres);
  const [priceCount, setPriceCount] = useState(updatedProduct.prices);
  const [stockCount, setStockCount] = useState(updatedProduct.stocks);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleGenre = (e: any, i: number) => {
    const newGenreCount: any = [...genreCount];
    newGenreCount[i] = e.target.value;
    setGenreCount(newGenreCount);
  };

  const handlePrice = (e: any, i: number, type: string) => {
    const newPriceCount: any = [...priceCount];
    newPriceCount[i][type] = e.target.value;
    setPriceCount(newPriceCount);
  };

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i][type] = e.target.value;
    setStockCount(newStockCount);
  };

  // const uploadImage = (id: string, form: any) => {
  //   const file = form.image.files[0];
  //   const newName = "main." + file.name.split(".")[1];
  //   if (file) {
  //     uploadFile(
  //       id,
  //       file,
  //       newName,
  //       "products",
  //       async (status: boolean, newImageURL: string) => {
  //         if (status) {
  //           const data = {
  //             image: newImageURL,
  //           };
  //           const result = await productServices.updateProduct(
  //             id,
  //             data,
  //             session.data?.accessToken
  //           );
  //           if (result.status === 200) {
  //             setIsloading(false);
  //             setUploadedImage(null);
  //             form.reset();
  //             setUpdatedProduct(false);
  //             const { data } = await productServices.getAllProducts();
  //             setProductsData(data.data);
  //             setToaster({
  //               variant: "success",
  //               message: "Success Add Product ",
  //             });
  //           } else {
  //             setIsloading(false);
  //             setToaster({
  //               variant: "danger",
  //               message: "Failed Add Product ",
  //             });
  //           }
  //         } else {
  //           setIsloading(false);
  //           setToaster({
  //             variant: "danger",
  //             message: "Failed Add Product ",
  //           });
  //         }
  //       }
  //     );
  //   }
  // };

  const updateProduct: any = async (
    form: any,
    newImageURL: string = updateProduct.image
  ) => {
    const price = priceCount.map((price: { category: string; idr: number }) => {
      return {
        category: price.category,
        idr: parseInt(`${price.idr}`),
      };
    });

    const stock = stockCount.map((stock: { category: string; qty: number }) => {
      return {
        category: stock.category,
        qty: parseInt(`${stock.qty}`),
      };
    });
    const data = {
      name: form.name.value,
      genres: genreCount,
      region: form.region.value,
      description: form.description.value,
      status: form.status.value,
      prices: price,
      stocks: stock,
      image: newImageURL,
    };
    const result = await productServices.updateProduct(updatedProduct.id, data);
    if (result.status === 200) {
      setIsloading(false);
      setUploadedImage(null);
      form.reset();
      setUpdatedProduct(false);
      const { data } = await productServices.getAllProducts();
      setProductsData(data.data);
      setToaster({
        variant: "success",
        message: "Success Update Concert ",
      });
    } else {
      setIsloading(false);
      setToaster({
        variant: "danger",
        message: "Failed Update Concert ",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    const form: any = event.target as HTMLFormElement;

    const file = form.image.files[0];

    if (file) {
      const newName = "main." + file.name.split(".")[1];
      uploadFile(
        updatedProduct.id,
        file,
        newName,
        "products",
        async (status: boolean, newImageURL: string) => {
          if (status) {
            updateProduct(form, newImageURL);
          } else {
            setIsloading(false);
            setToaster({
              variant: "danger",
              message: "Failed Add Product ",
            });
          }
        }
      );
    } else {
      updateProduct(form);
    }
  };

  return (
    <Modal onClose={() => setUpdatedProduct(false)}>
      <h1>Add Concert</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          className={styles.form__input}
          label="Name"
          name="name"
          type="text"
          placeholder="Insert Concert Name"
          defaultValue={updatedProduct.name}
        />
        <label htmlFor="price">Genre</label>
        {genreCount.map((item: any, i: number) => (
          <div className={styles.form__genre} key={i}>
            <div className={styles.form__genre__item}>
              <Input
                className={styles.form__input}
                name="genre"
                type="text"
                placeholder={`Insert Genre ${i + 1}`}
                onChange={(e) => {
                  handleGenre(e, i);
                }}
                defaultValue={item}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className={styles.form__genre__button}
          onClick={() => setGenreCount([...genreCount, ""])}
        >
          Add New Genre
        </Button>

        <Input
          className={styles.form__input}
          label="Region"
          name="region"
          type="text"
          placeholder="Insert Region"
          defaultValue={updatedProduct.region}
        />

        <Select
          className={styles.form__input}
          label="Status"
          name="status"
          options={[
            { label: "Released", value: "true" },
            { label: "Not Released", value: "false" },
          ]}
          defaultValue={updatedProduct.status}
        />
        <label htmlFor="price">Price</label>
        {priceCount.map(
          (item: { category: string; idr: number }, i: number) => (
            <div className={styles.form__price} key={i}>
              <div className={styles.form__price__item}>
                <Input
                  className={styles.form__input}
                  label="Category"
                  name="category"
                  type="text"
                  placeholder="Insert Concert Category"
                  onChange={(e) => {
                    handlePrice(e, i, "category");
                  }}
                  defaultValue={item.category}
                />
              </div>
              <div className={styles.form__price__item}>
                <Input
                  className={styles.form__input}
                  label="IDR"
                  name="idr"
                  type="number"
                  placeholder="Insert Concert Amount"
                  onChange={(e) => {
                    handlePrice(e, i, "idr");
                  }}
                  defaultValue={item.idr}
                />
              </div>
            </div>
          )
        )}
        <Button
          type="button"
          className={styles.form__price__button}
          onClick={() =>
            setPriceCount([...priceCount, { category: "", idr: 0 }])
          }
        >
          Add New Price
        </Button>

        <label htmlFor="stock">Stock</label>
        {stockCount.map(
          (item: { category: string; qty: number }, i: number) => (
            <div className={styles.form__stock} key={i}>
              <div className={styles.form__stock__item}>
                <Input
                  className={styles.form__input}
                  label="Category"
                  name="category"
                  type="text"
                  placeholder="Insert Concert Category"
                  onChange={(e) => {
                    handleStock(e, i, "category");
                  }}
                  defaultValue={item.category}
                />
              </div>
              <div className={styles.form__stock__item}>
                <Input
                  className={styles.form__input}
                  label="Qty"
                  name="qty"
                  type="number"
                  placeholder="Insert Concert Qty"
                  onChange={(e) => {
                    handleStock(e, i, "qty");
                  }}
                  defaultValue={item.qty}
                />
              </div>
            </div>
          )
        )}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() =>
            setStockCount([...stockCount, { category: "", qty: 0 }])
          }
        >
          Add New Stock
        </Button>
        <Input
          className={styles.form__input}
          label="Description"
          name="description"
          type="text"
          placeholder="Insert Concert Description"
          defaultValue={updatedProduct.description}
        />
        <div className={styles.form__image}>
          <Image
            width={150}
            height={200}
            src={
              uploadedImage
                ? URL.createObjectURL(uploadedImage)
                : updatedProduct.image
            }
            className={styles.form__image__preview}
            alt="image"
          />
          <div className={styles.form__image__input}>
            <label htmlFor="image">Image</label>
            <InputFile
              name="image"
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Update Concert"}
        </Button>
      </form>
    </Modal>
  );
};

export default ModalUpdateProduct;
