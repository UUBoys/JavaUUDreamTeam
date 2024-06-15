import { Autocomplete, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { Controller, useForm } from "react-hook-form";

import Button from "../components/Button";
import { Label } from "../components/Label";
import LabelInputContainer from "../components/LabelInputContainer";
import Loader from "../components/Loader";
import { useProceduresForAutocomplete } from "../hooks/queryHooks/useProceduresForAutocomplete";

import { ICreateNewReservationNotFormAutismn } from "@/common/utils/form-values/createNewReservation";

const DurationPicker = dynamic(() => import("react-duration-picker"), {
  ssr: false,
});

interface IAddNewDoctorModalProps {
  onSubmit: (values: ICreateNewReservationNotFormAutismn) => void;
  defaultValues?: ICreateNewReservationNotFormAutismn;
  error?: string;
  closeModal: () => void;
}

export const AddNewReservationNotForm420MLG: React.FC<
  IAddNewDoctorModalProps
> = ({ onSubmit, defaultValues, closeModal }) => {
  const { handleSubmit, control, setValue } =
    useForm<ICreateNewReservationNotFormAutismn>({
      defaultValues,
    });
  const {
    data: proceduresForAutocomplete,
    isLoading,
    isError,
  } = useProceduresForAutocomplete();

  return (
    <div className="flex w-full flex-col items-center gap-32 align-top">
      <Loader isLoading={isLoading} isError={isError} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start rounded-lg !bg-white text-center shadow-xl"
      >
        <div className="flex w-full flex-col gap-5 p-10 pb-20">
          <h1 className="text-3xl font-bold text-primary">
            Vytvořit novou rezervaci
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Čas operace</Label>
              <DurationPicker
                onChange={(value) => {
                  console.log(value);

                  setValue(
                    "length",
                    (value.hours ?? 0) * 3600000 +
                      value.minutes * 60000 +
                      value.seconds * 1000,
                  );
                }}
                initialDuration={{ hours: 0, minutes: 1, seconds: 30 }}
                maxHours={30}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Procedůry</Label>
              <Controller
                name="procedureName"
                control={control}
                render={({ field: { value } }) => (
                  <Autocomplete
                    id="tags-standard"
                    options={proceduresForAutocomplete ?? []}
                    getOptionLabel={(option) => option}
                    value={value ?? ``}
                    onChange={(event, newValue) => {
                      if (newValue) setValue("procedureName", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Vyberte procedůry"
                      />
                    )}
                  />
                )}
              />
            </LabelInputContainer>
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

export default AddNewReservationNotForm420MLG;
