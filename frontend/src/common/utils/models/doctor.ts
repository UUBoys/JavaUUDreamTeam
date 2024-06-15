import { IProcedure } from "./procedure";

export type IDoctor = {
  id: number;
  firstName: string;
  lastName: string;
  procedures: IProcedure[];
};
