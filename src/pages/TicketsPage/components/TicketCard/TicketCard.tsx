import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import styles from "./ticketCard.module.scss";

interface Props {
  navigationLink?: string;
  name: string;
}

export const TicketCard = ({ navigationLink, name }: Props) => {
  const { t } = useTranslation("ticketsPage");

  const navigation = useNavigate();
  return (
    <div className={styles.card}>
      <Space direction="vertical">
        <p>{name}</p>
        {navigationLink && (
          <Button onClick={() => navigation(navigationLink)}>{t("buy")}</Button>
        )}
      </Space>
    </div>
  );
};
