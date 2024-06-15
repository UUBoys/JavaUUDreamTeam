import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import { Tooltip } from "react-tooltip";

export type Event = {
  id: number;
  startDate: Date;
  endDate: Date;
  title: string;
  doctor: string;
};

type EventDetailProps = {
  date: Date;
  onClose: () => void;
  events: Event[];
};

const EventDetail = ({ date, onClose, events }: EventDetailProps) => {
  const dayEvents = events.filter(
    (event) =>
      event.startDate.getDate() === date.getDate() &&
      event.startDate.getMonth() === date.getMonth(),
  );

  const getDurationString = (startDate: Date, endDate: Date) => {
    const duration = moment.duration(moment(endDate).diff(moment(startDate)));
    const hours = Math.floor(duration.asHours());
    const minutes = duration.minutes();
    if (hours === 0) return `${minutes} minut`;
    return `${hours} hodin ${minutes} minut`;
  };

  return (
    <motion.div
      className="fixed left-[20px] z-10 flex h-[80vh] w-[300px] flex-col gap-4 rounded-lg border-r-4 border-primary bg-[rgba(255,255,255,0.92)] p-4 shadow-lg backdrop-blur"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {moment(date).format("DD. MM. YYYY")}
          </p>
        </div>
        <button
          className="flex size-6 items-center justify-center rounded-md bg-error text-xs uppercase text-white"
          onClick={onClose}
        >
          x
        </button>
      </div>
      {dayEvents.length === 0 && (
        <div className="size-full flex-1 items-center justify-center">
          <p className="text-xs">V tento den nejsou naplánované žádné akce</p>
        </div>
      )}
      <div className="size-full flex-col">
        {dayEvents.length !== 0 &&
          dayEvents.map((event: Event) => (
            <div
              key={event.id}
              className="mb-3 flex flex-row items-center gap-4 rounded-md border-b border-gray-200 bg-white px-3 py-2 shadow-md"
            >
              <div
                className="flex flex-col items-center justify-center"
                data-tooltip-id="my-tooltip"
                data-tooltip-content={getDurationString(
                  event.startDate,
                  event.endDate,
                )}
                data-tooltip-place="top"
              >
                <Tooltip id="my-tooltip" />

                <p className="w-[45px] text-sm text-gray-400">
                  {moment(event.startDate).format("HH:mm")}
                </p>
                <p className="w-[45px] text-sm text-gray-400">
                  {moment(event.endDate).format("HH:mm")}
                </p>
              </div>
              <div className="h-[18px] w-[2px] rounded-full bg-primary" />
              <div className="flex flex-col">
                <p className="text-[10px] text-gray-400">{event.doctor}</p>
                <p className="text-sm">{event.title}</p>
              </div>
            </div>
          ))}
      </div>
    </motion.div>
  );
};

export default EventDetail;
