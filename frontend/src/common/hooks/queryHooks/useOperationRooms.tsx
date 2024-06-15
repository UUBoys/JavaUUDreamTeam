/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useOperationRooms.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IOperationRoom } from "@/common/utils/models/operationRoom";

const fetchOperationRooms = async (): Promise<IOperationRoom[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/operationRoom`,
  );
  const parsedData: IOperationRoom[] = data.items.map(
    (operationRoom: any) =>
      ({
        id: operationRoom.id,
        name: operationRoom.name,
        procedures: operationRoom.procedures,
      }) as IOperationRoom,
  );
  return parsedData;
};

export const useOperationRooms = (): UseQueryResult<
  IOperationRoom[],
  unknown
> => {
  return useQuery("operationRooms", fetchOperationRooms);
};
