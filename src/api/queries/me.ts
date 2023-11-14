import {
  QueryFunction,
  UseQueryOptions,
  useQuery
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { User } from "@/_types/user";

import { instanse, queryClient } from "../instanse";

type Response = User;

const queryKey = ["me"];

type QueryKey = typeof queryKey;

const getMe: QueryFunction<Response, QueryKey> = async () => {
  return (await instanse.get("/user/me", {})).data;
};

export const useMeHook = <TData = Response>(
  options?: Omit<
    UseQueryOptions<Response, AxiosError, TData, QueryKey>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery(queryKey, getMe, {
    ...options
  });
};

export const useGetMe = Object.assign(useMeHook, {
  prefetch: async () => {
    await queryClient.prefetchQuery(queryKey, getMe);
  }
});
