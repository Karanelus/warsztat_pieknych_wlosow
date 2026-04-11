/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import dayjs from "dayjs";
import { Booking } from "../@types/booking.type";
import { getBookings } from "../@api/booking.api";
import { useQuery } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};

const useBooking = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const { data, isFetching, error } = useQuery({
    queryKey: ["booking"],
    queryFn: getBookings,
  });

  useEffect(() => {
    if (data) {
      setBookings(data);
    }
  }, [data]);

  const addBookingToCache = (newBooking: Booking) => {
    if (!newBooking) return;
    setBookings((prev) => [...prev, newBooking]);
  };

  const updateBookingInCache = (updated: Booking) => {
    if (!updated) return;
    setBookings((prev) =>
      prev.map((b) => (b._id === updated._id ? updated : b)),
    );
  };

  const deleteBookingFromCache = (id: string) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => dayjs(a.date!).diff(b.date!)),
    [bookings],
  );

  return {
    bookings: sortedBookings,
    loadingBooking: isFetching,
    errorBooking: error,
    addBookingToCache,
    updateBookingInCache,
    deleteBookingFromCache,
  };
};

type BookingsContentProps = ReturnType<typeof useBooking>;

const BookingContext = createContext({} as BookingsContentProps);

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) throw new Error("Context must be used within ServicesContext");

  return context;
};

export const BookingContextContainer = ({ children }: Props) => {
  const value = useBooking();

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
