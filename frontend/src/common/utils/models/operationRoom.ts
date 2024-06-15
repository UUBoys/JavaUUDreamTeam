import { IProcedure } from "./procedure";

export type IOperationRoom = {
  id: number;
  name: string;
  procedures: IProcedure[];
};
