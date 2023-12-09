import { MutationFunction, useMutation } from "@tanstack/react-query";

import { User } from "@/_types/user";

import { instanse } from "../instanse";

type Params = {
  id: number;
  ticketId: number;
};

type Response = User;

const addTicket: MutationFunction<Response, Params> = async ({
  ticketId,
  id
}) => {
  return (
    await instanse.post(`/client/${id}/add-ticket`, {
      ticketId
    })
  ).data;
};

export const useAddTicketForClient = () => useMutation(addTicket);
