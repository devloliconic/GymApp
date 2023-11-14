import { MutationFunction, useMutation } from "@tanstack/react-query";

import { instanse } from "../instanse";

type Params = {
  email: string;
  password: string;
};

type Response = {
  email: string;
  password: string;
};

const signUp: MutationFunction<Response, Params> = async ({
  email,
  password
}) => {
  return (await instanse.post("/user/signUp", { email, password })).data;
};

export const useSignUp = () => useMutation(signUp);
