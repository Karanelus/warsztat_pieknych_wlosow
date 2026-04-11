import classNames from "classnames";
import { Booking } from "../../../../@types/booking.type";
import dayjs from "dayjs";
import Expand from "/Expand.svg";
import { useState } from "react";
import CategoryText from "../../../../@ui/CategoryText";
import { motion, Variants } from "framer-motion";
import { updateBookings, deleteBookings } from "../../../../@api/booking.api";
import { useNotificationContext } from "../../../../@context/notificationContent";
import { useMutation } from "@tanstack/react-query";
import { useBookingContext } from "../../../../@context/bookingContext";
import ButtonBooking from "../../../../@ui/BookingManagement/ButtonBooking";
import { DATE_DEFAULT_FORMAT } from "../../../../@constants/dateFormat";

type Props = {
  booking: Booking;
};

const mainSectionVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  exit: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
};

const containerSectionVariants: Variants = {
  initial: { x: 50, opacity: 0 },
  exit: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
};

const BookingManagementInfo = ({ booking }: Props) => {
  const { addNewNotification } = useNotificationContext();
  const { updateBookingInCache, deleteBookingFromCache } = useBookingContext();
  const [isOpen, setOpen] = useState(false);
  const { _id, fullName, isConfirmed, date, service, master, email, last } =
    booking;
  const idText = _id.slice(0, 8);

  const infoArray = [
    ["Usługa", service],
    ["Wybrany mistrz", master],
    ["Email", email],
    ["Czas trawania", `${last * 15} minut`],
  ];

  const { mutate: updateBooking, isPending: loadingAccept } = useMutation({
    mutationFn: ({ id, isConfirmed }: { id: string; isConfirmed: boolean }) =>
      updateBookings(id, isConfirmed),
    onSuccess: (update: Booking) => {
      updateBookingInCache(update);
      addNewNotification(
        "success",
        "Wizyta potwierdzona",
        `Wizyta ${idText} została pomyślnie potwierdzona. Czekaj na nowego wspaniałego klienta`,
      );
      setOpen(false);
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Nieudana próba potwierdzenia",
        `Nie udało się potwierdzić wizytę ${idText}. Spróbuj ponownie.`,
      );
    },
  });

  const { mutate: deleteBooking, isPending: loadingDelete } = useMutation({
    mutationFn: (id: string) => deleteBookings(id),
    onSuccess: () => {
      deleteBookingFromCache(_id);
      addNewNotification(
        "success",
        "Wizyta usunięta",
        `Wizyta ${idText} została pomyślnie usunięta`,
      );
      setOpen(false);
    },
    onError: (err) => {
      console.error(err);
      addNewNotification(
        "error",
        "Nieudana próba potwierdzenia",
        `Nie udało się potwierdzić wizytę ${idText}. Spróbuj ponownie.`,
      );
    },
  });

  const handleAcceptVisit = () => {
    updateBooking({ id: _id, isConfirmed: true });
  };

  const handleChangeVisit = () => {};

  const handleDeleteVisit = () => {
    deleteBooking(_id);
  };

  const bookingButtonList = [
    {
      title: "Potwierdź",
      onClick: handleAcceptVisit,
      isConfirmed: isConfirmed,
      loading: loadingAccept,
    },
    {
      title: "Zmień",
      onClick: handleChangeVisit,
    },
    {
      title: "Usuń",
      onClick: handleDeleteVisit,
      loading: loadingDelete,
      isDeleting: true,
    },
  ];

  return (
    <motion.div
      variants={mainSectionVariants}
      initial="initial"
      exit="exit"
      animate="animate"
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.15,
      }}
    >
      <motion.section
        variants={containerSectionVariants}
        initial="initial"
        exit="exit"
        animate="animate"
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="rounded-3xl border-2 px-4 py-2"
      >
        <div className="flex justify-between">
          <section className="flex items-center gap-2">
            <div
              className={classNames(
                "size-4 rounded-full duration-150",
                { "bg-yellow-400": !isConfirmed },
                { "bg-lime-400": isConfirmed },
              )}
            ></div>
            <p className={classNames("duration-150", { "opacity-0": isOpen })}>
              {`${fullName.split(" ")[0]} ➡️ ${master}`}
            </p>
          </section>
          <section className="flex items-center gap-2">
            <p>{dayjs(date!).format(DATE_DEFAULT_FORMAT)}</p>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="size-7 cursor-pointer rounded-full border"
            >
              <img
                src={Expand}
                alt="expand"
                className={classNames("duration-150", {
                  "-rotate-180": isOpen,
                })}
              />
            </button>
          </section>
        </div>
        <div
          className={classNames(
            "grid duration-150",
            { "grid-rows-[0fr]": !isOpen },
            { "grid-rows-[1fr]": isOpen },
          )}
        >
          <section className="space-y-4 overflow-hidden">
            <hgroup>
              <h3>
                Wizyta <span className="uppercase">{fullName}</span>
              </h3>
              <article className="flex justify-between">
                <CategoryText category="ID wizyty" body={idText} />
                <CategoryText
                  category="Status"
                  body={isConfirmed ? "Potwierdzona" : "Oczekuje"}
                />
              </article>
            </hgroup>
            <article>
              {infoArray.map(([category, body], i) => (
                <CategoryText
                  key={i}
                  category={category ?? ""}
                  body={body ?? ""}
                />
              ))}
            </article>
            <section className="grid grid-cols-3 gap-2">
              {bookingButtonList.map(
                ({ title, onClick, isConfirmed, isDeleting, loading }) => (
                  <ButtonBooking
                    key={title}
                    title={title}
                    onClick={onClick}
                    isConfirmed={isConfirmed}
                    isDeleting={isDeleting}
                    loading={loading}
                  />
                ),
              )}
            </section>
          </section>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default BookingManagementInfo;
