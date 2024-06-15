import React from "react";

import Navbar from "@/common/components/Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="mt-[100px]">{children}</div>
    </>
  );
};

export default MainLayout;
