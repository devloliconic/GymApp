import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useMeHook } from "@/api/queries/me";
import { useWorkoutByUserId } from "@/api/queries/workoutsByUser";
import { Layout } from "@/components/Layout";
import { CreateClientModal } from "@/components/modals/CreateClientModal/CreateClientModal";
import { getConverterdDateToString } from "@/helpers/dateHelper";

import { TicketCard } from "./components/TicketCard/TicketCard";
import { WorkoutCard } from "./components/WorkoutCard/WorkoutCard";
import styles from "./userPage.module.scss";

const UserPage = () => {
  const { data: userData } = useMeHook();
  const { data: workoutData } = useWorkoutByUserId(userData?.user_id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { t } = useTranslation("clientPage");

  const userName = [
    userData?.lastName,
    userData?.firstName,
    userData?.middleName
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <>
      <CreateClientModal
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        clientId={userData?.user_id}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.cardContainer}>
            <Card title={userName || userData?.email}>
              <Space>
                <Avatar size={64} icon={<UserOutlined />} />
                <p className={styles.baseText}>{userName}</p>
              </Space>
              {userData?.gender && (
                <p className={styles.baseText}>
                  {t("gender")}: {userData?.gender === "female" ? "👧" : "👦"}
                </p>
              )}
              {userData?.email && (
                <p className={styles.baseText}>
                  {t("email")}: {userData?.email}
                </p>
              )}
              {userData?.birthDate && (
                <p className={styles.baseText}>
                  {t("birthDate")}: {userData?.birthDate}
                </p>
              )}
              <Button onClick={() => setIsModalOpen(true)}>
                {t("editInformation")}
              </Button>
            </Card>
          </div>

          <div>
            <h3 className={styles.ticketTitle}>{t("tickets")}:</h3>
            <div className={styles.ticketContainer}>
              {userData?.tickets?.length &&
                userData?.tickets?.length > 0 &&
                userData.tickets.map((it) => <TicketCard name={it.type} />)}
            </div>
            <div className={styles.workoutContainer}>
              <h3 className={styles.ticketTitle}>{t("workouts")}:</h3>
              {workoutData?.length &&
                workoutData?.length > 0 &&
                workoutData?.map((it) => (
                  <WorkoutCard
                    coach={it.coach}
                    gym={it.gym}
                    date={getConverterdDateToString(it.date)}
                  />
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserPage;
