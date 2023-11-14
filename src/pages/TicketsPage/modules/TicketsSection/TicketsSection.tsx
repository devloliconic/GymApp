import { Button } from "antd";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { Ticket } from "@/_types/ticket";
import { pageRoutes } from "@/config/pageRoutes";

import { TicketCard } from "../../components/TicketCard/TicketCard";

import styles from "./ticketsSection.module.scss";

interface Props {
  name: string;
  tickets: Ticket[];
  canByTickets?: boolean;
  isLogin?: boolean;
}

export const TicketsSection = ({
  name,
  tickets,
  canByTickets,
  isLogin
}: Props) => {
  const [toggleTickets, setToggleTickets] = useState(false);
  const { t } = useTranslation("ticketsPage");

  const getNavigationLink = useCallback(
    (id: number) => {
      if (isLogin) {
        return `/tickets/${id}`;
      }
      return pageRoutes.login;
    },
    [isLogin]
  );

  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.ticketSectionTitle}>{name}</h3>
      <div className={styles.ticketsCard}>
        {tickets
          ?.slice(0, toggleTickets ? tickets.length : 3)
          .map((it) => (
            <TicketCard
              name={it.type}
              key={it.ticket_id}
              navigationLink={
                canByTickets ? getNavigationLink(it.ticket_id) : undefined
              }
            />
          ))}
        {!toggleTickets && tickets?.length > 3 && (
          <div className={styles.showMoreContainer}>
            <Button onClick={() => setToggleTickets(true)}>
              {t("showMore")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
