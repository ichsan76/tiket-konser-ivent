import { useContext } from "react";
import styles from "./AuthLayout.module.scss";
import Link from "next/link";
import { ToasterContext } from "@/contexts/ToasterContext";

type Propstypes = {
  title?: string;
  children: React.ReactNode;
  link: string;
  linkText?: string;
};

const AuthLayout = (props: Propstypes) => {
  const { setToaster } = useContext(ToasterContext);
  const { title, children, link, linkText } = props;
  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      <div className={styles.auth__form}>{children}</div>
      <p className={styles.auth__link}>
        {linkText}
        <Link href={link}>Here</Link>{" "}
      </p>
    </div>
  );
};

export default AuthLayout;
