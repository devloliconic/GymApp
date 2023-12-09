import { Button, Space } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./ticketCard.module.scss";

interface Props {
  name: string;
  titcketId: number;
  onButtonClick?: (id: number) => void;
}

export const TicketCard = ({ onButtonClick, name, titcketId }: Props) => {
  const { t } = useTranslation("ticketsPage");

  return (
    <div className={styles.card}>
      <Space direction="vertical">
        <p>{name}</p>
        {onButtonClick && (
          <Button onClick={() => onButtonClick(titcketId)}>{t("buy")}</Button>
        )}
      </Space>
    </div>
  );
};
