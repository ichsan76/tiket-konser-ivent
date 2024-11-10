import Link from "next/link";
import styles from "./Sidebar.module.scss";
import { useRouter } from "next/router";
import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";

type Proptypes = {
  lists: Array<{
    title: string;
    url: string;
    icon: string;
  }>;
  title: string;
};

const Sidebar = (props: Proptypes) => {
  const { lists, title } = props;
  const { pathname } = useRouter();

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebar__top}>
        <h1 className={styles.sidebar__top__title}> {title}</h1>
        <div className={styles.sidebar__top__lists}>
          {lists.map((list, index) => (
            <Link
              href={list.url}
              key={list.title}
              className={`${styles.sidebar__top__lists__item} && ${
                pathname === list.url &&
                styles.sidebar__top__lists__item__active
              }`}
            >
              <i
                className={`bx ${list.icon} ${styles.sidebar__top__lists__item__icon}`}
              />
              <h3 className={styles.sidebar__top__lists__item__title}>
                {list.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.sidebar__bottom}>
        <Button
          className={styles.sidebar__bottom__button}
          type="button"
          variant="secondary"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
