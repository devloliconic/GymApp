import { Spin } from "antd";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCoaches } from "@/api/queries/coaches";
import { useGetMe } from "@/api/queries/me";
import { Layout } from "@/components/Layout";
import { NewWorkoutModal } from "@/components/modals/NewWorkoutModal/NewWorkoutModal";
import { pageRoutes } from "@/config/pageRoutes";

import styles from "./coachesPage.module.scss";
import { CoachCard } from "./components/CoachCard/CoachCard";

const CoachesPage = () => {
  const { data: coachesData, isLoading } = useCoaches();
  const { data: userData } = useGetMe();
  const navigate = useNavigate();

  const [newWorkoutModalOpen, setNewWorkoutModalOpen] = useState(false);
  const [currentCoachId, setCurrentCoachId] = useState<undefined | number>(
    undefined
  );

  const handleNewWorkoutModalOpen = useCallback(
    (id: number) => {
      if (userData) {
        setCurrentCoachId(id);
        setNewWorkoutModalOpen(true);
        return;
      }
      navigate(pageRoutes.login);
    },
    [navigate, userData]
  );

  const handleNewWorkoutModalClose = () => {
    setNewWorkoutModalOpen(false);
    setCurrentCoachId(undefined);
  };

  if (isLoading) {
    return (
      <Layout>
        <Spin />
      </Layout>
    );
  }

  return (
    <>
      <NewWorkoutModal
        userId={userData?.user_id as number}
        coachId={currentCoachId as number}
        isOpen={newWorkoutModalOpen}
        onModalClose={handleNewWorkoutModalClose}
      />
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
                  id={it.coach_id}
                  onGetWorkoutClick={handleNewWorkoutModalOpen}
                />
              ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CoachesPage;
