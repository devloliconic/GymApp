import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useLogin } from "@/api/mutations/login";
import { pageRoutes } from "@/config/pageRoutes";
import { PageAsFormContainer } from "@/modules/PageAsFormContainer";

import styles from "./loginPage.module.scss";

interface FormValues {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required()
  })
  .required();

const LoginPage = () => {
  const { t } = useTranslation(["loginPage", "translation"]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    formState: { isValid }
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login } = useLogin();

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    login(
      { email, password },
      {
        onSuccess: (data) => {
          localStorage.setItem("token", `Bearer ${data.accessToken}`);
          queryClient.invalidateQueries(["me"]);
          message.success(t("message.success"), 3);
          navigate(pageRoutes.main);
        },
        onError: () => {
          message.error(t("message.error"), 3);
        }
      }
    );
  };

  const formErrorMessages = Object.entries(errors).map(([_, { message }]) => {
    const transitionMessageKey = message
      ? message.split(" ").join("")
      : undefined;

    return t(`${transitionMessageKey}`, { ns: "translation" });
  });

  return (
    <PageAsFormContainer>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input placeholder={t("emailPlaceholder")} {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password placeholder={t("passwordPlaceholder")} {...field} />
          )}
        />
        <ul className={styles.errorList}>
          {formErrorMessages.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
        <Button disabled={!isValid} htmlType="submit">
          {t("signIn")}
        </Button>
      </form>
    </PageAsFormContainer>
  );
};

export default LoginPage;
