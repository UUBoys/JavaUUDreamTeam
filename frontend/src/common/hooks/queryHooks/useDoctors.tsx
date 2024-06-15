// hooks/useDoctors.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

import { IDoctor } from "@/common/utils/models/doctor";

const fetchDoctors = async (): Promise<IDoctor[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/doctor`,
  );
  return data;
};

export const useDoctors = (): UseQueryResult<IDoctor[], unknown> => {
  return useQuery("doctors", fetchDoctors);
};
