import { useTranslation } from "react-i18next";

import { Logo } from "@/components/Logo";

import styles from "./infoCard.module.scss";

export const InfoCard = () => {
  const { t } = useTranslation("mainPage");

  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <Logo tag="h2" className={styles.shadowLogo} />
        <Logo tag="h2" className={styles.logo} />
        <p className={styles.description}>{t("logoDescription")}</p>
      </div>
    </div>
  );
};
