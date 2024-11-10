import Toaster from "@/components/ui/Toaster";
import { Lato } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { useContext, useEffect } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "admin", "member"];

type PropTypes = {
  children: React.ReactNode;
};

declare global {
  interface Window {
    snap: any;
  }
}

const AppShell = (props: PropTypes) => {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey: any = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <div className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </div>
    </>
  );
};

export default AppShell;
