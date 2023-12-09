import { Button, Modal, Select, message } from "antd";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useCreateWorkout } from "@/api/mutations/createWorkout";
import { useCoach } from "@/api/queries/coach";
import { useCoaches } from "@/api/queries/coaches";
import { useGyms } from "@/api/queries/gyms";
import { DatePicker } from "@/components/DatePicker";

import styles from "./newWorkoutModal.module.scss";
import { format } from "date-fns";

interface Props {
  coachId: number;
  userId: number;
  isOpen: boolean;
  onModalClose: () => void;
}

interface FormValues {
  currentCoachId: number;
  gymId: number;
  date: Date;
}

export const NewWorkoutModal = ({
  coachId,
  isOpen,
  onModalClose,
  userId
}: Props) => {
  const { t } = useTranslation("workoutModal");
  const { data: coachesData } = useCoaches();
  const { data: gymsData } = useGyms();
  const { data: coachData } = useCoach(coachId);

  const { mutate: createWorkout } = useCreateWorkout();

  const defaultValues = useMemo(
    () => ({
      currentCoachId: coachId,
      gymId: coachData?.gym.gym_id
    }),
    [coachData?.gym.gym_id, coachId]
  );

  const getFullName = (
    lastName: string,
    firstName: string,
    middleName: string
  ) => [lastName, firstName, middleName].filter(Boolean).join(" ");

  const coachesOptions = coachesData
    ? coachesData.map((it) => ({
        label: getFullName(it.lastName, it.firstName, it.middleName),
        value: it.coach_id
      }))
    : undefined;
  const gymsOptions = gymsData
    ? gymsData.map((it) => ({
        label: it.name,
        value: it.gym_id
      }))
    : undefined;

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const onSubmit = (data: FormValues) => {
    const { date } = data;
    const convertedDate = date ? format(date, "dd.MM.yyyy") : "";

    if (coachData) {
      createWorkout({
        client_id: userId,
        coach_id: coachId,
        date: convertedDate,
        gym_id: coachData?.gym.gym_id
      });
      message.success(t("messages.success"), 3);
      reset();
      onModalClose();
    }
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <Modal
      open={isOpen}
      onCancel={onModalClose}
      title={t("title")}
      footer={[
        <Button
          type="primary"
          key="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!isValid}
        >
          Отправить
        </Button>,
        <Button key="reset" onClick={onModalClose}>
          Отменить
        </Button>
      ]}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Controller
          name="currentCoachId"
          control={control}
          render={({ field }) => (
            <Select placeholder="Тренер" options={coachesOptions} {...field} />
          )}
        />
        <Controller
          name="gymId"
          control={control}
          render={({ field }) => (
            <Select
              placeholder="Зал"
              disabled
              options={gymsOptions}
              {...field}
            />
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker placeholder="Дата" {...field} format="dd.MM.y" />
          )}
        />
      </form>
    </Modal>
  );
};
