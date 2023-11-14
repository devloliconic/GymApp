import classNames from "classnames/bind";
import { ReactNode } from "react";

import styles from "./boubleBox.module.scss";

interface Props {
  classNames?: string;
  children: ReactNode;
}

const cx = classNames.bind(styles);

export const BoubleBox = ({ children, classNames }: Props) => {
  const containerClasses = cx("container", classNames);

  return <div className={containerClasses}>{children}</div>;
};
