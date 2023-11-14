import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, message } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

import { useSignUp } from "@/api/mutations/signUp";
import { pageRoutes } from "@/config/pageRoutes";
import { PageAsFormContainer } from "@/modules/PageAsFormContainer";

import styles from "./signUpPage.module.scss";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "passwordDontMatch")
  })
  .required();

const SignUpPage = () => {
  const { t } = useTranslation("signUpPage");

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid, errors }
  } = useForm<FormValues>({ mode: "onChange", resolver: yupResolver(schema) });
  const navigate = useNavigate();

  const { mutate: login } = useSignUp();

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    login(
      { email, password },
      {
        onSuccess: () => {
          message.success(t("message.success"), 3);
          navigate(pageRoutes.login);
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
          rules={{ required: true }}
          render={({ field }) => (
            <Input placeholder={t("emailPlaceholder")} {...field} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Input.Password placeholder={t("passwordPlaceholder")} {...field} />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: true
          }}
          render={({ field }) => (
            <Input.Password
              placeholder={t("confirmPasswordPlaceholder")}
              {...field}
            />
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

export default SignUpPage;
