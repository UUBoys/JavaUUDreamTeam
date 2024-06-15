import React, { useState } from "react";
import { CiHospital1 } from "react-icons/ci";
import { FaUserDoctor } from "react-icons/fa6";
import { LiaProceduresSolid } from "react-icons/lia";
import "rsuite/Calendar/styles/index.css";

import {
  AddNewProcedureModal,
  IAddNewProcedureModalValues,
} from "@/common/modals/AddNewProcedure";
import { useModalStore } from "@/common/stores/use-modal-store";

const Admin = () => {
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const [error, setError] = useState<string>("");

  const createNewProcedureFormSubmit = async (
    values: IAddNewProcedureModalValues,
  ) => {};

  const openCreateNewCourseModal = () => {
    openModal({
      isClosable: true,
      content: (
        <AddNewProcedureModal
          onSubmit={createNewProcedureFormSubmit}
          closeModal={closeModal}
          error={error}
        />
      ),
    });
  };
  return (
    <div>
      <div className="absolute top-0 z-[-1] h-[500px] w-full bg-primary" />
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-transparent pt-[100px]">
        <p className="text-6xl font-bold text-white">Admin</p>
        <div className="flex w-[70%] flex-col justify-between gap-10 rounded-md p-4 sm:flex-row">
          <button className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white">
            <CiHospital1 className="size-14 text-primary transition-all group-hover:text-white" />
            Sály
          </button>
          <button
            onClick={openCreateNewCourseModal}
            className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white"
          >
            <LiaProceduresSolid className="size-14 text-primary transition-all group-hover:text-white" />
            Procedůry
          </button>
          <button className="group flex min-h-[300px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-white bg-white text-4xl font-bold shadow-lg transition-all hover:scale-105 hover:border-4 hover:bg-primary hover:text-white">
            <FaUserDoctor className="size-14 text-primary transition-all group-hover:text-white" />
            Doktoři
          </button>
        </div>
      </div>
    </div>
  );
};
export default Admin;
