import { Card, Space, Spin } from "antd";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { useGym } from "@/api/queries/gym";
import { Layout } from "@/components/Layout";

import styles from "./gymPage.module.scss";

const GymPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("gymPage");

  console.log(id);

  const { data: gymData, isLoading } = useGym(id || "");

  if (isLoading) {
    return <Spin />;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <Card title={gymData?.name}>
            <div>
              <Space>
                <p className={styles.labelText}>{t("address")}:</p>
                <p className={styles.valueText}>{gymData?.address.address}</p>
              </Space>
            </div>
          </Card>
          <div></div>
        </div>
      </div>
    </Layout>
  );
};

export default GymPage;
