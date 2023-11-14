import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, Modal, Select, message } from "antd";
import { format, parse } from "date-fns";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { useUpdateCliet } from "@/api/mutations/updateClient";
import { useGetMe, useMeHook } from "@/api/queries/me";
import { DatePicker } from "@/components/DatePicker";
import { genderList } from "@/config/constants";

import styles from "./createClientModal.module.scss";

interface Props {
  isOpen: boolean;
  onModalClose: () => void;
  clientId?: number;
}

interface FormValues {
  email: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  birthDate?: Date | null;
}

export const CreateClientModal = ({
  isOpen,
  onModalClose,
  clientId
}: Props) => {
  const { t } = useTranslation("clientModal");
  const { data: userData } = useMeHook();
  const queryClient = useQueryClient();
  const { mutate: updateClient } = useUpdateCliet();

  const defaultValues = useMemo(
    () => ({
      email: userData?.email,
      firstName: userData?.firstName,
      middleName: userData?.middleName,
      lastName: userData?.lastName,
      gender: userData?.gender,
      birthDate: userData?.birthDate
        ? parse(userData?.birthDate, "dd.MM.yyyy", new Date())
        : null
    }),
    [
      userData?.birthDate,
      userData?.email,
      userData?.firstName,
      userData?.gender,
      userData?.lastName,
      userData?.middleName
    ]
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", defaultValues });

  const onSubmit = (data: FormValues) => {
    const { birthDate } = data;
    const convertedBirthDate = birthDate
      ? format(birthDate, "dd.MM.yyyy")
      : null;

    if (clientId) {
      updateClient(
        { ...data, id: clientId, birthDate: convertedBirthDate },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(["me"]);
            message.success(t("message.success"), 3);
            onModalClose();
          }
        }
      );
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
          name="email"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input placeholder="Почта" {...field} />}
        />
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => <Input placeholder="Имя" {...field} />}
        />
        <Controller
          name="lastName"
          control={control}
          render={({ field }) => <Input placeholder="Фамилия" {...field} />}
        />
        <Controller
          name="middleName"
          control={control}
          render={({ field }) => <Input placeholder="Отчество" {...field} />}
        />
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <Select placeholder="Пол" options={genderList} {...field} />
          )}
        />
        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholder="Дата рождения"
              {...field}
              format="dd.MM.y"
            />
          )}
        />
      </form>
    </Modal>
  );
};
