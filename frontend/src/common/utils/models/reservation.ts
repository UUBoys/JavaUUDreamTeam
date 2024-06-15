import { IDoctor } from "./doctor";

export type IReservation = {
  id: number;
  from: string;
  to: string;
  procedure: string;
  doctor: IDoctor;
};
