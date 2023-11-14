import { Button, Card, Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  email: string;
  сapacity: number;
  address: string;
  phoneNumber: string;
  navigationLink: string;
}

export const GymCard = ({
  name,
  email,
  сapacity,
  address,
  navigationLink,
  phoneNumber
}: Props) => {
  const { t } = useTranslation("gymsPage");

  const navigate = useNavigate();
  return (
    <Card title={name}>
      {сapacity && (
        <div>
          <Space>
            <p>{t("сapacity")}</p>
            <p>{сapacity}</p>
          </Space>
        </div>
      )}
      {address && (
        <div>
          <Space>
            <p>{t("address")}</p>
            <p>{address}</p>
          </Space>
        </div>
      )}
      {email && (
        <div>
          <Space>
            <p>{t("email")}</p>
            <p>{email}</p>
          </Space>
        </div>
      )}
      {phoneNumber && (
        <div>
          <Space>
            <p>{t("phoneNumber")}</p>
            <p>{phoneNumber}</p>
          </Space>
        </div>
      )}
      <Button type="link" onClick={() => navigate(navigationLink)}>
        {t("moreInformation")}
      </Button>
    </Card>
  );
};
