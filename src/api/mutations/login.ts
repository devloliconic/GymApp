import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

const login: MutationFunction<Response, Params> = async ({
  email,
  password
}) => {
  return (await instanse.post("/user/login", { email, password })).data;
};

export const useLogin = () => useMutation(login);
