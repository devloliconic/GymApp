import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { pageRoutes } from "@/config/pageRoutes";

import styles from "./pageAsFormContainer.module.scss";

interface Props {
  children: ReactNode;
}

export const PageAsFormContainer = ({ children }: Props) => {
  const { t } = useTranslation("loginPage");

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <header className={styles.header}>
          <Link to={pageRoutes.main} className={styles.link}>
            {t("title")}
          </Link>
        </header>
        {children}
      </div>
    </div>
  );
};
