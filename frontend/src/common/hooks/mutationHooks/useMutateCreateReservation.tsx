// useCreateProcedure.ts
import axios from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { toast } from "react-toastify";

import { ICreateNewReservationNotFormAutismn } from "@/common/utils/form-values/createNewReservation";

const createReservation = async (
  newProcedure: ICreateNewReservationNotFormAutismn,
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/reservation`,
    newProcedure,
  );
  return data;
};

export const useCreateReservation = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    ICreateNewReservationNotFormAutismn,
    unknown
  >,
): UseMutationResult<
  unknown,
  unknown,
  ICreateNewReservationNotFormAutismn,
  unknown
> => {
  return useMutation(createReservation, {
    ...options,
    onSuccess(data) {
      toast.success(`Rezervace ${data.name} byla úspěšně vytvořena!`);
    },
  });
};
