/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */

import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Calendar from "rsuite/Calendar";
import "rsuite/Calendar/styles/index.css";

import Button from "@/common/components/Button";
import EventDetail, { Event } from "@/common/components/EventDetail";
import Loader from "@/common/components/Loader";
import { useCreateReservation } from "@/common/hooks/mutationHooks/useMutateCreateReservation";
import { useReservations } from "@/common/hooks/queryHooks/useReservations";
import AddNewReservationNotForm420MLG from "@/common/modals/AddNewReservationModal";
import { useModalStore } from "@/common/stores/use-modal-store";
import { ICreateNewReservationNotFormAutismn } from "@/common/utils/form-values/createNewReservation";
import { IReservation } from "@/common/utils/models/reservation";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { openModal, closeModal } = useModalStore((s) => ({
    openModal: s.openModal,
    closeModal: s.closeModal,
  }));
  const { mutateAsync: mutateAsyncCreateReservation, isLoading } =
    useCreateReservation({
      onSuccess: (data: unknown) => {
        console.log("Reservation created:", data);
      },
      onError: (errorPar: unknown) => {
        console.error("Error creating reservation:", errorPar);
      },
    });

  const {
    data: reservations,
    refetch: refetchReservations,
    isLoading: isLoadingReservations,
  } = useReservations();
  console.log(reservations);

  const isSameDay = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const renderCell = (date: Date, parsedEvents: Event[]) => {
    const dayEvents = parsedEvents.filter(
      (event: { startDate: string | number | Date }) =>
        isSameDay(new Date(event.startDate), date),
    );

    return (
      <div className="flex flex-col gap-1">
        {dayEvents
          .slice(0, 2)
          .map(
            (event: {
              id: React.Key | null | undefined;
              title:
                | string
                | number
                | bigint
                | boolean
                | React.ReactElement<
                    any,
                    string | React.JSXElementConstructor<any>
                  >
                | Iterable<React.ReactNode>
                | React.ReactPortal
                | Promise<React.AwaitedReactNode>
                | null
                | undefined;
            }) => (
              <div key={event.id} className="rounded-lg bg-primary px-2 py-1">
                <p className="truncate text-xs text-white">{event.title}</p>
              </div>
            ),
          )}
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

  const createNewReservationNotFormSubmit = async (
    values: ICreateNewReservationNotFormAutismn,
  ) => {
    try {
      const res = (await mutateAsyncCreateReservation(values)) as any;

      if (res.error) {
        throw new Error(res.error);
      }

      closeModal();
      console.log("Doctor created:", res);
      refetchReservations();
    } catch (errorPar: any) {
      toast.error(`Error creating doctor: ${errorPar.message}`);
      console.error("Error creating doctor:", errorPar);
    }
  };

  const openCreateNewCourseModal = () => {
    openModal({
      isClosable: false,
      content: (
        <AddNewReservationNotForm420MLG
          onSubmit={createNewReservationNotFormSubmit}
          closeModal={closeModal}
        />
      ),
    });
  };

  const handleCellEventClick = (newDate: Date) => {
    setSelectedDate(newDate);
  };

  return (
    <div>
      {" "}
      <Loader isLoading={isLoading || isLoadingReservations} />
      <AnimatePresence>
        {selectedDate && (
          <EventDetail
            date={selectedDate}
            onClose={() => setSelectedDate(null)}
            events={
              reservations?.map((reservation: IReservation) => {
                return {
                  id: reservation.id,
                  startDate: new Date(reservation.from),
                  endDate: new Date(reservation.to),
                  title: reservation.procedure.name,
                  doctor: `${reservation.doctor.firstName} ${
                    reservation.doctor.lastName
                  }`,
                };
              }) ?? []
            }
          />
        )}
      </AnimatePresence>
      <div className="absolute top-0 z-[-1] h-[500px] w-full bg-primary" />
      <div className="flex w-full flex-col items-center justify-center gap-[50px] bg-transparent pt-[50px]">
        <p className="text-3xl font-bold text-white">Kalendář</p>{" "}
        <Button
          type="submit"
          size="lg"
          onClick={openCreateNewCourseModal}
          className="w-32 !bg-primary-900 text-3xl hover:bg-blue-900"
        >
          Vytvořit
        </Button>
        <div className="w-[70%] rounded-md bg-white p-4 shadow-lg">
          <Calendar
            onSelect={handleCellEventClick}
            renderCell={(e) => {
              return renderCell(
                e,
                reservations?.map((reservation: IReservation) => {
                  return {
                    id: reservation.id,
                    startDate: new Date(reservation.from),
                    endDate: new Date(reservation.to),
                    title: reservation.procedure,
                    doctor: `${reservation.doctor.firstName} ${
                      reservation.doctor.lastName
                    }`,
                  };
                }) ?? [],
              );
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Home;
