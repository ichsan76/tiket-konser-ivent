import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { title } from "process";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Concerts",
    url: "/products",
  },
];

const Navbar = () => {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropdownUser, setDropdownUser] = useState(false);

  console.log(data);
  return (
    <div className={styles.navbar}>
      <h2>I-Vent Tiket Konser</h2>
      <div className={styles.navbar__nav}>
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            className={`${styles.navbar__nav__item}  ${
              pathname === item.url && styles["navbar__nav__item--active"]
            }  `}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__cart}>
            <Link href="/cart">
              <i
                className={`bx bx-cart-alt ${styles.navbar__user__cart__icon}`}
              />
            </Link>
          </div>
          <div className={styles.navbar__user__profile}>
            <Image
              width={40}
              height={40}
              src={data?.user?.image}
              alt={data?.user?.name}
              className={styles.navbar__user__profile__image}
              onClick={() => setDropdownUser(!dropdownUser)}
            />
            <div
              className={`${styles.navbar__user__profile__dropdown} ${
                dropdownUser &&
                styles["navbar__user__profile__dropdown--active"]
              }`}
            >
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => push("/member/profile")}
              >
                <i className="bx bxs-user"></i>
                Profile
              </button>
              {data.user.role === "admin" && (
                <button
                  className={styles.navbar__user__profile__dropdown__item}
                  onClick={() => push("/admin")}
                >
                  <i className="bx bxs-server"></i> Admin
                </button>
              )}
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => signOut()}
              >
                <i className="bx bxs-log-out"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          className={styles.navbar__button}
          onClick={() => signIn()}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Navbar;
