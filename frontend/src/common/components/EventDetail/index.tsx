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
    <div className="fixed bottom-[50px] left-[15%] z-10 flex w-[70%] flex-row gap-4 rounded-md border-2 border-l-primary bg-white p-4">
      <div className="flex w-[100px] flex-col items-center justify-center">
        <p className="w-[95px]">{moment(date).format("DD. MM. YYYY")}</p>
        <button className="rounded-md px-2 py-1 text-xs text-primary transition-all hover:bg-primary hover:text-white">
          přidat akci
        </button>
      </div>
      {eventsInSelectedDay.length === 0 && (
        <div className="size-full flex-1 items-center justify-center">
          <p className="text-xs">V tento den nejsou naplánované žádné akce</p>
        </div>
      )}
      <div className="flex-1 flex-col">
        {eventsInSelectedDay.length !== 0 &&
          eventsInSelectedDay.map((event: Event) => (
            <div key={event.id} className="bg-white">
              <p>{moment(event.date).format("HH:mm:SS")}</p>
              <p>{event.date.toString()}</p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default EventDetail;
