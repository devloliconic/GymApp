import { Card, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";

import { useGyms } from "@/api/queries/gyms";
import { Layout } from "@/components/Layout";

import { GymCard } from "./components/GymCard";
import styles from "./gymsPage.module.scss";

const GymsPage = () => {
  const { data: gymsData, isLoading } = useGyms();
  const { t } = useTranslation("gymsPage");

  if (isLoading) {
    return (
      <Layout>
        <Spin />
      </Layout>
    );
  }

  if (gymsData?.length === 0) {
    return (
      <Layout>
        <p>{t("noData")}</p>
      </Layout>
    );
  }

  const getNavigationLink = (id: number) => `/gym/${id}`;

  return (
    <Layout>
      <div className={styles.container}>
        {gymsData?.map((it) => (
          <GymCard
            key={it.gym_id}
            address={it.address.address}
            name={it.name}
            email={it.contact.email}
            сapacity={it.сapacity}
            phoneNumber={it.contact.phoneNumber}
            navigationLink={getNavigationLink(it.gym_id)}
          />
        ))}
      </div>
    </Layout>
  );
};

export default GymsPage;
