import { Footer } from "../Footer";
import { Header } from "../Header";

import styles from "./layout.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
