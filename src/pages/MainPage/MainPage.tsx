import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useTickets } from "@/api/queries/tickets";
import hulc from "@/assets/images/gym.png";
import { Layout } from "@/components/Layout";
import { pageRoutes } from "@/config/pageRoutes";

import { BoubleBox } from "./components/BoubleBox";
import { TicketCard } from "./components/TicketCard";
import styles from "./mainPage.module.scss";

const MainPage = () => {
  const { data: ticketData } = useTickets();
  const { t } = useTranslation("mainPage");

  const navigate = useNavigate();

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          <BoubleBox classNames={styles.cardContainer}>
            <div className={styles.ticketFlex}>
              {ticketData
                ?.slice(0, 4)
                .map((it) => <TicketCard name={it.type} price={it.price} />)}
            </div>
            <div className={styles.showMoreButton}>
              <Button onClick={() => navigate(pageRoutes.tickets)}>
                {t("showMore")}
              </Button>
            </div>
          </BoubleBox>
          <BoubleBox classNames={styles.imageConteiner}>
            <img src={hulc} className={styles.img} />
          </BoubleBox>
        </div>
      </div>
    </Layout>
  );
};

export default MainPage;
