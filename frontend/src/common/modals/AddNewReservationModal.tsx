import { Autocomplete, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import LabelInputContainer from "../components/LabelInputContainer";
import Loader from "../components/Loader";
import { useProceduresForAutocomplete } from "../hooks/queryHooks/useProceduresForAutocomplete";

import { ICreateNewReservationNotFormAutismn } from "@/common/utils/form-values/createNewReservation";

interface IAddNewDoctorModalProps {
  onSubmit: (values: ICreateNewReservationNotFormAutismn) => void;
  defaultValues?: ICreateNewReservationNotFormAutismn;
  error?: string;
  closeModal: () => void;
}

export const AddNewReservationNotForm420MLG: React.FC<
  IAddNewDoctorModalProps
> = ({ onSubmit, defaultValues, closeModal, error }) => {
  const { register, handleSubmit } =
    useForm<ICreateNewReservationNotFormAutismn>({
      defaultValues,
    });
  const {
    data: procedures,
    isLoading,
    isError,
  } = useProceduresForAutocomplete();

  return (
    <div className="flex w-full flex-col items-center gap-32 align-top">
      <Loader isLoading={isLoading} isError={isError} />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start rounded-lg bg-white text-center shadow-xl"
      />
    </div>
  );
};

export default AddNewReservationNotForm420MLG;
