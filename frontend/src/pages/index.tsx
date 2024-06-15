/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import Calendar from "rsuite/Calendar";
import "rsuite/Calendar/styles/index.css";

import EventDetail, { Event } from "@/common/components/EventDetail";

import { AnimatePresence } from "framer-motion";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const events: Event[] = [
    {
      id: 1,
      startDate: new Date(2024, 5, 16, 13, 25),
      endDate: new Date(2024, 5, 16, 14, 0),
      title: "Colonoscopy",
      doctor: "Kamil",
    },
    {
      id: 2,
      startDate: new Date(2024, 5, 18, 16, 15),
      endDate: new Date(2024, 5, 18, 17, 20),
      title: "Therapy Session",
      doctor: "Kamil",
    },
    {
      id: 3,
      startDate: new Date(2024, 5, 21, 7, 0, 0),
      endDate: new Date(2024, 5, 21, 7, 50, 0),
      title: "Surgery",
      doctor: "Jarda",
    },
    {
      id: 4,
      startDate: new Date(2024, 5, 16, 10, 30, 0),
      endDate: new Date(2024, 5, 16, 11, 0),
      title: "Test",
      doctor: "Karel",
    },
  ];

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderCell = (date: Date) => {
    const dayEvents = events.filter((event) =>
      isSameDay(new Date(event.startDate), date),
    );

    return (
      <div className="flex flex-col gap-1">
        {dayEvents.slice(0, 2).map((event) => (
          <div key={event.id} className="rounded-lg bg-primary px-2 py-1">
            <p className="truncate text-xs text-white">{event.title}</p>
          </div>
        ))}
        {dayEvents.length > 2 && (
          <div className="flex flex-row items-center gap-1">
            <div className="size-1 rounded-full bg-warning" />
            <p className="text-xs text-gray-500">
              {dayEvents.length - 2} další
            </p>
          </div>
        )}
      </div>
    );
  };

  const handleCellEventClick = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      <AnimatePresence>
        {selectedDate && (
          <EventDetail
            date={selectedDate}
            onClose={() => setSelectedDate(null)}
            events={events}
          />
        )}
      </AnimatePresence>
      <div className="absolute top-0 z-[-1] h-[500px] w-full bg-primary" />
      <div className="flex w-full flex-col items-center justify-center gap-[50px] bg-transparent pt-[50px]">
        <p className="text-3xl font-bold text-white">Kalendář</p>
        <div className="w-[70%] rounded-md bg-white p-4 shadow-lg">
          <Calendar onSelect={handleCellEventClick} renderCell={renderCell} />
        </div>
      </div>
    </div>
  );
};
export default Home;
