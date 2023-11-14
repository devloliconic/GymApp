import { Spin } from "antd";

import { useCoaches } from "@/api/queries/coaches";
import { useGetMe } from "@/api/queries/me";
import { Layout } from "@/components/Layout";
import { pageRoutes } from "@/config/pageRoutes";

import styles from "./coachesPage.module.scss";
import { CoachCard } from "./components/CoachCard/CoachCard";

const CoachesPage = () => {
  const { data: coachesData, isLoading } = useCoaches();
  const { data: userData } = useGetMe();

  const getCaochCardNavigationCard = (id: number) => {
    if (userData) {
      return `/coach/${id}`;
    }
    return pageRoutes.login;
  };

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
        <div className={styles.coachesContainer}>
          {coachesData &&
            coachesData.map((it) => (
              <CoachCard
                gym={it.gym.name}
                firstName={it.firstName}
                lastName={it.lastName}
                middleName={it.middleName}
                coast={it.coast}
                navigationLink={getCaochCardNavigationCard(it.coach_id)}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default CoachesPage;
