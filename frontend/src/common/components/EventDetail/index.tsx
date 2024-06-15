import { motion, AnimatePresence } from "framer-motion";
import moment from "moment";
import React from "react";

export type Event = {
  id: number;
  date: Date;
  title: string;
};

type EventDetailProps = {
  date: Date;
  onClose: () => void;
  events: Event[];
};

const EventDetail = ({ date, onClose, events }: EventDetailProps) => {
  const eventsInSelectedDay: Event[] = events.filter(
    (event: Event) => event.date.getDate() === date.getDate(),
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed left-[20px] z-10 flex h-[80vh] w-[300px] flex-col gap-4 rounded-md border-l-2 border-primary bg-white p-4 shadow-lg"
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
        {eventsInSelectedDay.length === 0 && (
          <div className="size-full flex-1 items-center justify-center">
            <p className="text-xs">V tento den nejsou naplánované žádné akce</p>
          </div>
        )}
        <div className="size-full flex-col">
          {eventsInSelectedDay.length !== 0 &&
            eventsInSelectedDay.map((event: Event) => (
              <div
                key={event.id}
                className="flex flex-row items-center gap-4 border-b border-gray-200 bg-white py-1"
              >
                <p className="w-[70px]">{moment(event.date).format("HH:mm")}</p>
                <div className="h-[14px] w-[2px] rounded-full bg-primary" />
                <p>{event.title}</p>
              </div>
            ))}
        </div>
        <button className="rounded-md bg-white px-2 py-1 text-center text-primary hover:!bg-primary hover:!text-white">
          přidat událost
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
export default EventDetail;
