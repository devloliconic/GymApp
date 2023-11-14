import { Spin } from "antd";
import { useTranslation } from "react-i18next";

import { useMeHook } from "@/api/queries/me";
import { useTickets } from "@/api/queries/tickets";
import { Layout } from "@/components/Layout";

import { TicketsSection } from "./modules/TicketsSection/TicketsSection";
import styles from "./ticketsPage.module.scss";

const TicketsPage = () => {
  const { data: ticketsData, isLoading } = useTickets();
  const { data: userData } = useMeHook({
    retry: false
  });
  const { t } = useTranslation("ticketsPage");

  if (isLoading) {
    return (
      <Layout>
        <Spin />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.container}>
        {userData && (
          <TicketsSection
            name={t("clientTickets")}
            tickets={userData?.tickets}
          />
        )}
        <TicketsSection
          isLogin={!!userData}
          name={t("allTickets")}
          tickets={ticketsData || []}
          canByTickets
        />
      </div>
    </Layout>
  );
};

export default TicketsPage;
