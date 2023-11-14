import { UserOutlined } from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Menu, MenuProps, Space } from "antd";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useGetMe } from "@/api/queries/me";
import { ReactComponent as Exit } from "@/assets/icons/exit.svg";
import { pageRoutes } from "@/config/pageRoutes";

import { Logo } from "../Logo";

import styles from "./header.module.scss";

type MenuItem = Required<MenuProps>["items"][number];

const menuKey = ["coaches", "addresses", "tickets"];
const getMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem;
};

export const Header = () => {
  const { t } = useTranslation("layout");
  const { data: user } = useGetMe();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const [currentMenuKey] = pathname
    .split("/")
    .filter((it) => menuKey.includes(it));

  const menuItems = useMemo(
    () => menuKey.map((item) => getMenuItem(t(item), item)),
    [t]
  );

  const handleMenuItemClick: MenuProps["onClick"] = (e) => {
    navigate(`/${e.key}`);
  };

  const handleExitClick = async () => {
    localStorage.clear();
    navigate(pageRoutes.main);
    queryClient.invalidateQueries(["me"]);
    queryClient.resetQueries(["me"]);
  };

  return (
    <header className={styles.header}>
      <Link to={pageRoutes.main} className={styles.logoLink}>
        <Logo tag="h1" />
      </Link>
      <Menu
        items={menuItems}
        className={styles.menu}
        onClick={handleMenuItemClick}
        mode="horizontal"
        activeKey={currentMenuKey}
      />
      {user ? (
        <Space>
          {user?.firstName && <p>{user?.firstName}</p>}
          <div className={styles.icon}>
            <UserOutlined
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(pageRoutes.account);
              }}
            />
          </div>
          <button className={styles.exitButton} onClick={handleExitClick}>
            <Exit />
          </button>
        </Space>
      ) : (
        <Space>
          <Button type="primary" onClick={() => navigate(pageRoutes.login)}>
            {t("signIn")}
          </Button>
          <Button type="default" onClick={() => navigate(pageRoutes.signUp)}>
            {t("signUp")}
          </Button>
        </Space>
      )}
    </header>
  );
};
