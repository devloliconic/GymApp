import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  firstName: string;
  lastName: string;
  middleName: string;
  coast: number;
  onGetWorkoutClick: (id: number) => void;
  gym: string;
  id: number;
}

export const CoachCard = ({
  firstName,
  lastName,
  middleName,
  coast,
  onGetWorkoutClick,
  gym,
  id
}: Props) => {
  const { t } = useTranslation("coachesPage");
  const cardTitle = [firstName, lastName, middleName].filter(Boolean).join(" ");
  const navigate = useNavigate();

  return (
    <Card title={cardTitle}>
      <Avatar size={64} icon={<UserOutlined />} />
      <div>
        <Space>
          <p>{t("pricePerOneLeason")}</p>
          <p>{coast}</p>
        </Space>
      </div>
      <div>
        <Space>
          <p>{t("gym")}</p>
          <p>{gym}</p>
        </Space>
      </div>
      <Button onClick={() => onGetWorkoutClick(id)}>{t("getALeason")}</Button>
    </Card>
  );
};
