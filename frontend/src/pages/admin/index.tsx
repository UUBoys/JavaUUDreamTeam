/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { CiHospital1 } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaProceduresSolid } from "react-icons/lia";
import { toast } from "react-toastify";
import "rsuite/Calendar/styles/index.css";

import Loader from "@/common/components/Loader";
import { useCreateDoctor } from "@/common/hooks/mutationHooks/useCreateDoctor";
import { useCreateOperationRoom } from "@/common/hooks/mutationHooks/useCreateOperationRoom";
import { useCreateProcedure } from "@/common/hooks/mutationHooks/useCreateProcedure";
import AddNewDoctorModal from "@/common/modals/AddNewDoctorModal";
import AddNewOperationRoom from "@/common/modals/AddNewOperationRoom";
import {
  AddNewProcedureModal,
  IAddNewProcedureModalValues,
} from "@/common/modals/AddNewProcedure";
import { useModalStore } from "@/common/stores/use-modal-store";
import { ICreateNewDoctorFormValues } from "@/common/utils/form-values/createNewDoctor";
import { ICreateNewOperationRoomFormValues } from "@/common/utils/form-values/createNewOperationRoom";

const Admin = () => {
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const [error, setError] = useState<string>("");

  const {
    mutateAsync: mutateAsyncCreateProcedure,
    isLoading: isLoadingCreatingProcedure,
  } = useCreateProcedure({
    onSuccess: (data: unknown) => {
      console.log("Procedure created:", data);
    },
    onError: (errorPar: unknown) => {
      console.error("Error creating procedure:", errorPar);
      setError(`Error creating procedure ${errorPar}`);
    },
  });

  const { mutateAsync: mutateAsyncCreateDoctor } = useCreateDoctor({
    onSuccess: (data: unknown) => {
      console.log("Doctor created:", data);
    },
    onError: (errorPar: unknown) => {
      console.error("Error creating doctor:", errorPar);
      setError(`Error creating doctor ${errorPar}`);
    },
  });

  const { mutateAsync: mutateAsyncCreateOperationRoom } =
    useCreateOperationRoom({
      onSuccess: (data: unknown) => {
        console.log("Operation room created:", data);
      },
      onError: (errorPar: unknown) => {
        console.error("Error creating operation room:", errorPar);
        setError(`Error creating operation room ${errorPar}`);
      },
    });

  const createNewProcedureFormSubmit = async (
    values: IAddNewProcedureModalValues,
  ) => {
    try {
      const res: any = (await mutateAsyncCreateProcedure(values)) as any;

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(`Procedůra ${res.name} byla úspěšně vytvořena!`);
      closeModal();
      console.log("Procedure created:", res);
    } catch (errorPar: any) {
      toast.error(`Error creating procedure: ${errorPar.message}`);
      console.error("Error creating procedure:", error);
    }
  };
  const createNewDoctorFormSubmit = async (
    values: ICreateNewDoctorFormValues,
  ) => {
    try {
      const res = (await mutateAsyncCreateDoctor(values)) as any;

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(
        `Doktor ${res.firstName} ${res.lastName} byl úspěšně vytvořen!`,
      );
      closeModal();
      console.log("Doctor created:", res);
    } catch (errorPar: any) {
      toast.error(`Error creating doctor: ${errorPar.message}`);
      console.error("Error creating doctor:", error);
    }
  };

  const createNewOperationRoomFormSubmit = async (
    values: ICreateNewOperationRoomFormValues,
  ) => {
    try {
      const res = (await mutateAsyncCreateOperationRoom(values)) as any;

      if (res.error) {
        throw new Error(res.error);
      }

      toast.success(`Operační místnost ${res.name} byla úspěšně vytvořena!`);
      closeModal();
      console.log("Operation room created:", res);
    } catch (errorPar: any) {
      toast.error(`Error creating operation room: ${errorPar.message}`);
      console.error("Error creating operation room:", error);
    }
  };

  const openCreateNewProcedureModal = () => {
    openModal({
      isClosable: true,
      content: (
        <AddNewProcedureModal
          onSubmit={createNewProcedureFormSubmit}
          closeModal={closeModal}
        />
      ),
    });
  };

  const openCreateNewDoctorModal = () => {
    openModal({
      isClosable: true,
      content: (
        <AddNewDoctorModal
          onSubmit={createNewDoctorFormSubmit}
          closeModal={closeModal}
        />
      ),
    });
  };

  const openCreateNewOperationRoom = () => {
    openModal({
      isClosable: true,
      content: (
        <AddNewOperationRoom
          onSubmit={createNewOperationRoomFormSubmit}
          closeModal={closeModal}
        />
      ),
    });
  };
  return (
    <div>
      <Loader isLoading={isLoadingCreatingProcedure} />
      <div className="absolute top-0 z-[-1] h-[500px] w-full bg-primary" />
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-transparent pt-[100px]">
        <p className="text-6xl font-bold text-white">Admin</p>
        <div className="flex w-[70%] flex-col justify-between gap-10 rounded-md p-4 sm:flex-row">
          <button
            onClick={openCreateNewOperationRoom}
            className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white"
          >
            <CiHospital1 className="size-14 text-primary transition-all group-hover:text-white" />
            Sály
          </button>
          <button
            onClick={openCreateNewProcedureModal}
            className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white"
          >
            <LiaProceduresSolid className="size-14 text-primary transition-all group-hover:text-white" />
            Procedůry
          </button>
          <button
            onClick={openCreateNewDoctorModal}
            className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white"
          >
            <FaUserDoctor className="size-14 text-primary transition-all group-hover:text-white" />
            Doktoři
          </button>
        </div>
      </div>
    </div>
  );
};
export default Admin;
