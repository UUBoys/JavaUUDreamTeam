// hooks/useProcedures.ts
import axios from "axios";
import { useQuery, UseQueryResult } from "react-query";

const fetchProcedures = async (): Promise<string[]> => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/procedure`,
  );
  if (!data.items) return [];
  const parsedData: string[] = data.items.map((procedure: string) => {
    return procedure;
  });
  return parsedData;
};

export const useProceduresForAutocomplete = (): UseQueryResult<
  string[],
  unknown
> => {
  return useQuery("procedures", fetchProcedures);
};
