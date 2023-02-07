import clsx from "clsx";
import Navbar from "../../component/navBar";
import styles from "./styles.module.scss";

import Link from "next/link";
const DefaultLayout = ({ children }) => {
 
  return (
    <>
    <Navbar/>
      <div className={clsx(styles.wrapper_children)}>{children}</div>
    </>
  );
};

export default DefaultLayout;
