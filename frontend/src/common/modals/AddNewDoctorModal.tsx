import { Autocomplete, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import LabelInputContainer from "../components/LabelInputContainer";
import Loader from "../components/Loader";
import { useProceduresForAutocomplete } from "../hooks/queryHooks/useProceduresForAutocomplete";
import { ICreateNewDoctorFormValues } from "../utils/form-values/createNewDoctor";

interface IAddNewDoctorModalProps {
  onSubmit: (values: ICreateNewDoctorFormValues) => void;
  defaultValues?: ICreateNewDoctorFormValues;
  error?: string;
  closeModal: () => void;
}

export const AddNewDoctorModal: React.FC<IAddNewDoctorModalProps> = ({
  onSubmit,
  defaultValues,
  closeModal,
  error,
}) => {
  const { register, handleSubmit } = useForm<ICreateNewDoctorFormValues>({
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
      >
        <div className="flex w-full flex-col gap-5 p-10 pb-20">
          <h1 className="text-3xl font-bold text-primary">
            Zaregistrovat nového doktora
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <div className="flex w-full gap-4">
              <LabelInputContainer className="mb-8">
                <Label htmlFor="twitterpassword">Jméno</Label>
                <Input {...register("firstName")} />
              </LabelInputContainer>
              <LabelInputContainer className="mb-8">
                <Label htmlFor="twitterpassword">Příjmení</Label>
                <Input {...register("lastName")} />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Procedůry</Label>
              <Autocomplete
                multiple
                id="tags-standard"
                {...register("procedures")}
                options={procedures ?? []}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Vyberte procedůry"
                  />
                )}
              />
            </LabelInputContainer>
            {error !== "" && (
              <p className="mt-2 text-xl italic text-red-500">{error}</p>
            )}
          </div>

          <div className="flex w-full items-center justify-center gap-6">
            <div className="flex gap-5 text-end">
              <div className="flex gap-4 text-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-20 !bg-primary hover:bg-blue-900"
                >
                  Vytvořit
                </Button>
                <Button
                  onClick={() => {
                    closeModal();
                  }}
                  color="gray"
                  size="lg"
                  className="w-20"
                  type="button"
                >
                  Zrušit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewDoctorModal;
