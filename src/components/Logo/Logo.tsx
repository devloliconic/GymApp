import classNames from "classnames/bind";
import { useTranslation } from "react-i18next";

import styles from "./logo.module.scss";

interface Props {
  className?: string;
  tag?: "h1" | "h2" | "h3" | "h4";
}

const cx = classNames.bind(styles);

export const Logo = ({ tag = "h1", className }: Props) => {
  const { t } = useTranslation("layout");

  const classes = cx("logo", className);
  const Tag = tag;
  return <Tag className={classes}>{t("title")}</Tag>;
};
