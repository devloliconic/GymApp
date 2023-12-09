import { useQueryClient } from "@tanstack/react-query";
import { Button } from "antd";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Ticket } from "@/_types/ticket";
import { useAddTicketForClient } from "@/api/mutations/addTicketForClient";
import { pageRoutes } from "@/config/pageRoutes";

import { TicketCard } from "../../components/TicketCard/TicketCard";

import styles from "./ticketsSection.module.scss";

interface Props {
  name: string;
  tickets: Ticket[];
  canByTickets?: boolean;
  isLogin?: boolean;
  userId?: number;
}

export const TicketsSection = ({
  name,
  tickets,
  canByTickets,
  userId
}: Props) => {
  const [toggleTickets, setToggleTickets] = useState(false);
  const { t } = useTranslation("ticketsPage");
  const { mutate: addTicket } = useAddTicketForClient();
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const handleBuyTicketClick = (id: number) => {
    if (canByTickets && userId) {
      addTicket(
        { id: userId, ticketId: id },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["me"]);
          }
        }
      );
      return;
    }
    return navigate(pageRoutes.login);
  };

  return (
    <section className={styles.sectionContainer}>
      <h3 className={styles.ticketSectionTitle}>{name}</h3>
      <div className={styles.ticketsCard}>
        {tickets
          ?.slice(0, toggleTickets ? tickets.length : 3)
          .map((it) => (
            <TicketCard
              titcketId={it.ticket_id}
              name={it.type}
              key={it.ticket_id}
              onButtonClick={canByTickets ? handleBuyTicketClick : undefined}
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
