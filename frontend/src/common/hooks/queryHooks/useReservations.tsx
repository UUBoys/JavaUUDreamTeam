// hooks/useDoctors.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IReservation } from "@/common/utils/models/reservation";

const fetchReservations = async (): Promise<IReservation[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/reservation?startDate=1.1.2021&endDate=10.5.2025`,
  );
  const parsedData: IReservation[] = data.items.map(
    (reservation: any) =>
      ({
        id: reservation.id,
        from: reservation.from,
        to: reservation.to,
        doctor: reservation.doctor,
        operationRoom: reservation.operationRoom,
        procedure: reservation.procedureDto.name,
      }) as IReservation,
  );
  return parsedData;
};

export const useReservations = (): UseQueryResult<IReservation[], unknown> => {
  return useQuery("reservation", fetchReservations);
};
