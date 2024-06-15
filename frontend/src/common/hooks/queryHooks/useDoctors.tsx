/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useDoctors.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IDoctor } from "@/common/utils/models/doctor";

const fetchDoctors = async (): Promise<IDoctor[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/doctor`,
  );
  const parsedData: IDoctor[] = data.items.map(
    (doctor: any) =>
      ({
        id: doctor.id,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        procedures: doctor.procedures,
      }) as IDoctor,
  );

  return parsedData;
};

export const useDoctors = (): UseQueryResult<IDoctor[], unknown> => {
  return useQuery("doctors", fetchDoctors);
};
