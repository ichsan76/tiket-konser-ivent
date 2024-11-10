import Sidebar from "@/components/fragments/Sidebar";
import styles from "./MemberLayout.module.scss";

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
  //   url: "/member",
  //   icon: "bxs-dashboard",
  // },
  {
    title: "Transactions",
    url: "/member/transaction",
    icon: "bx-receipt",
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: "bxs-user-pin",
  },
];

const MemberLayout = (props: Proptypes) => {
  const { children } = props;
  return (
    <div className={styles.member}>
      <Sidebar title="Member Panel" lists={listSidebarItem} />
      <div className={styles.member__main}>{children}</div>
    </div>
  );
};

export default MemberLayout;
