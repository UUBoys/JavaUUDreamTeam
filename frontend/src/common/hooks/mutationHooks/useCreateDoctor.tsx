// hooks/useCreateDoctor.ts
import axios from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { toast } from "react-toastify";

import { ICreateNewDoctorFormValues } from "../../utils/form-values/createNewDoctor";

const createDoctor = async (newDoctor: ICreateNewDoctorFormValues) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/doctor`,
    newDoctor,
  );
  return data;
};

export const useCreateDoctor = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    ICreateNewDoctorFormValues,
    unknown
  >,
): UseMutationResult<unknown, unknown, ICreateNewDoctorFormValues, unknown> => {
  return useMutation(createDoctor, {
    ...options,
    onSuccess(data) {
      toast.success(
        `Doktor ${data.firstName} ${data.lastName} byl úspěšně vytvořen!`,
      );
    },
  });
};
