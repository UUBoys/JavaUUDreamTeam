import React from "react";
import Calendar from "rsuite/Calendar";
import "rsuite/Calendar/styles/index.css";

const Home = () => {
  return (
    <div>
      <div className="absolute top-0 z-[-1] h-[500px] w-full bg-primary" />
      <div className="flex w-full flex-col items-center justify-center gap-10 bg-transparent pt-[100px]">
        <p className="text-white">input search</p>
        <div className="w-[70%] rounded-md bg-white p-4 shadow-lg">
          <Calendar />
        </div>
      </div>
    </div>
  );
};
export default Home;
