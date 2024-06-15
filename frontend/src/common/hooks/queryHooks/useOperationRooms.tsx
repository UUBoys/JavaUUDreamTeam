// hooks/useOperationRooms.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IOperationRoom } from "@/common/utils/models/operationRoom";

const fetchOperationRooms = async (): Promise<IOperationRoom[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/operationRoom`,
  );
  return data;
};

export const useOperationRooms = (): UseQueryResult<
  IOperationRoom[],
  unknown
> => {
  return useQuery("operationRooms", fetchOperationRooms);
};
