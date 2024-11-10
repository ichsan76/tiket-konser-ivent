import Sidebar from "@/components/fragments/Sidebar";
import styles from "./AdminLayout.module.scss";

type Proptypes = {
  children: React.ReactNode;
};

const listSidebarItem = [
  {
    title: "Home",
    url: "/",
    icon: "bx bx-home",
  },
  // {
  //   title: "Dashboard",
  //   url: "/admin",
  //   icon: "bxs-dashboard",
  // },
  {
    title: "Products",
    url: "/admin/products",
    icon: "bxs-box",
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: "bxs-user-account",
  },
  {
    title: "Transactions",
    url: "/admin/transactions",
    icon: "bx-receipt",
  },
];

const AdminLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.admin}>
      <Sidebar title="Admin Panel" lists={listSidebarItem} />
      <div className={styles.admin__main}>{children}</div>
    </div>
  );
};

export default AdminLayout;
