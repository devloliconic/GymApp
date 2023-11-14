import React from "react";

import styles from "./ticketCard.module.scss";

interface Props {
  name: string;
}

export const TicketCard = ({ name }: Props) => {
  return <div className={styles.card}>{name}</div>;
};
