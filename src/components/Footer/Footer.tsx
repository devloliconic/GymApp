import { Link } from "react-router-dom";

import { pageRoutes } from "@/config/pageRoutes";

import { Logo } from "../Logo";

import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to={pageRoutes.main} className={styles.logoLink}>
        <Logo tag="h2" className={styles.logo} />
      </Link>
    </footer>
  );
};
