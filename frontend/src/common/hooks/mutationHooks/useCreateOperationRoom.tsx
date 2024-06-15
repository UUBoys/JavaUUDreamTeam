// hooks/useCreateOperationRoom.ts
import axios from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "react-query";
import { toast } from "react-toastify";

import { ICreateNewOperationRoomFormValues } from "../../utils/form-values/createNewOperationRoom";

const createOperationRoom = async (
  newOperationRoom: ICreateNewOperationRoomFormValues,
) => {
  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/operationRoom`,
    newOperationRoom,
  );
  return data;
};

export const useCreateOperationRoom = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    ICreateNewOperationRoomFormValues,
    unknown
  >,
): UseMutationResult<
  unknown,
  unknown,
  ICreateNewOperationRoomFormValues,
  unknown
> => {
  return useMutation(createOperationRoom, {
    ...options,
    onSuccess(data) {
      toast.success(`Operační místnost ${data.name} byla úspěšně vytvořena!`);
    },
  });
};
