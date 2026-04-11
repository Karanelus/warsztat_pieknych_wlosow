import classNames from "classnames";
import NotificationsContainer from "./NotificationsContainer";
import { AnimatePresence } from "framer-motion";
import { useNotificationContext } from "../../@context/notificationContent";
import { useBookingContext } from "../../@context/bookingContext";
import { useEffect, useRef } from "react";

const Notifications = () => {
  const { notifications = [], addNewNotification } = useNotificationContext();
  const { bookings } = useBookingContext();
  const prevLengthRef = useRef<number>(0);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (prevLengthRef.current === 0) {
      prevLengthRef.current = bookings.length;
    }

    if (!token || !bookings) {
      return;
    }

    if (bookings.length > prevLengthRef.current) {
      addNewNotification(
        "added",
        "Nowe umowienie wizyty",
        "Masz nową wizytę do salonu. Sprawdź swoje zarządzanie wizytami.",
      );
    }

    prevLengthRef.current = bookings.length;
  }, [bookings, addNewNotification]);

  return (
    <section
      className={classNames(
        "fixed top-0 right-0 z-50 flex justify-end p-4",
        "font-poppins mobile:w-[550px] pointer-events-none h-dvh w-dvw",
      )}
    >
      <section className="flex w-full flex-col justify-end gap-4">
        <AnimatePresence>
          {notifications.map((item) => (
            <NotificationsContainer key={item.id} notification={item} />
          ))}
        </AnimatePresence>
      </section>
    </section>
  );
};

export default Notifications;
