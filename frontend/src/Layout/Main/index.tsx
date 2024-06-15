import React from "react";

import Modal from "@/common/components/Modal";
import Navbar from "@/common/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <Modal />
      <div className="mt-[100px]">{children}</div>
    </>
  );
};

export default MainLayout;
