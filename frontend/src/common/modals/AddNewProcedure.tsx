import { useForm } from "react-hook-form";

import Button from "../components/Button";
import { Input } from "../components/Input";
import { Label } from "../components/Label";
import LabelInputContainer from "../components/LabelInputContainer";

export interface IAddNewProcedureModalValues {
  name: string;
}

interface IAddNewProcedureModalProps {
  onSubmit: (values: IAddNewProcedureModalValues) => void;
  defaultValues?: IAddNewProcedureModalValues;
  closeModal: () => void;
}

export const AddNewProcedureModal: React.FC<IAddNewProcedureModalProps> = ({
  onSubmit,
  defaultValues,
  closeModal,
}) => {
  const { register, handleSubmit } = useForm<IAddNewProcedureModalValues>({
    defaultValues,
  });

  return (
    <div className="flex w-full flex-col items-center gap-32 align-top">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-start rounded-lg bg-white text-center shadow-xl"
      >
        <div className="flex w-full flex-col gap-5 p-10 pb-20">
          <h1 className="text-3xl font-bold text-primary">
            Vytvořit novou procedůru
          </h1>
          <div className="space-y-4 text-start md:space-y-6">
            <LabelInputContainer className="mb-8">
              <Label htmlFor="twitterpassword">Název procedůry</Label>
              <Input {...register("name")} />
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
