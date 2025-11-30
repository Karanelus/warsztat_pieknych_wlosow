import { useNavigate } from "react-router";
import PageButton from "../../../../@ui/PageButton";
import BookingManagementInfo from "./BookingManagementInfo";
import { AnimatePresence } from "motion/react";
import loadingImage from "/loading.svg";
import { useBookingContext } from "../../../../@context/bookingContext";
import { useLoginContext } from "../../../../@context/loginContext";
import { useMemo } from "react";

const BookingManagement = () => {
  const { bookings, loadingBooking, errorBooking } = useBookingContext();
  const { user } = useLoginContext();

  const nav = useNavigate();

  const accessedBooking = useMemo(() => {
    if (user && user.role > 1) {
      return bookings.filter((book) => book.master === user.user);
    }

    return bookings;
  }, [bookings, user]);

  const handleClickBack = () => {
    nav(-1);
  };

  if (errorBooking)
    return (
      <h1>
        Niestety nie udało się pobrać dane z powodu: {errorBooking.toString()}
      </h1>
    );

  return (
    <section className="relative flex flex-col space-y-4">
      <h2>Zarządzanie wizytami</h2>

      <section className="midpoint:grid-cols-[2fr_3fr] grid gap-4">
        <p>Tutaj masz wszystkie wizytę, umowione poprzez stronę WPW</p>
        <section className="grid gap-2">
          <AnimatePresence>
            {loadingBooking && (
              <div className="flex size-5">
                <img
                  src={loadingImage}
                  alt="Ładowanie…"
                  loading="lazy"
                  className="size-4 animate-spin"
                />
              </div>
            )}

            {!loadingBooking &&
              accessedBooking.length > 0 &&
              accessedBooking.map((booking) => (
                <BookingManagementInfo key={booking._id} booking={booking} />
              ))}

            {!loadingBooking && accessedBooking.length === 0 && (
              <h3>Nie ma umówionych wizyt</h3>
            )}
          </AnimatePresence>
        </section>
      </section>

      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </section>
  );
};

export default BookingManagement;
