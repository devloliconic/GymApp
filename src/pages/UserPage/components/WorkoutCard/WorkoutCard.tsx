import { Space } from "antd";
import classNames from "classnames/bind";
import { parse } from "date-fns";
import { useTranslation } from "react-i18next";

import { Coach } from "@/_types/coach";
import { SimpleGym } from "@/_types/gym";

import styles from "./workoutCard.module.scss";

const cx = classNames.bind(styles);

interface Props {
  coach: Coach;
  gym: SimpleGym;
  date: string;
}

const getFullName = (lastName: string, firstName: string, middleName: string) =>
  [lastName, firstName, middleName].filter(Boolean).join(" ");

export const WorkoutCard = ({ coach, gym, date }: Props) => {
  const { t } = useTranslation("clientPage");

  const currentDate = new Date();
  const workoutDate = parse(date, "dd.MM.yyyy", new Date());

  console.log(currentDate > workoutDate);

  const {
    lastName: coachLastName,
    firstName: coachFirstName,
    middleName: coachMiddleName
  } = coach;

  const { name: gymName } = gym;

  const coachFullName = getFullName(
    coachLastName,
    coachFirstName,
    coachMiddleName
  );

  return (
    <div className={cx("card", { opacity: currentDate > workoutDate })}>
      <header className={styles.header}>
        <h3 className={styles.titleText}>{coachFullName}</h3>
        <h4 className={styles.titleText}>
          {t("workoutDate")}: {date}
        </h4>
      </header>
      <div>
        <Space>
          <p className={styles.descriptionText}>{t("gym")}:</p>
          <p className={styles.valueText}>{gymName}</p>
        </Space>
      </div>
    </div>
  );
};
