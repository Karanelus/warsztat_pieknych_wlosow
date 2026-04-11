/* eslint-disable react-hooks/exhaustive-deps */
import classNames from "classnames";
import { Value } from "react-calendar/dist/shared/types.js";
import TimeSelectionCalendar from "./TimeSelectionCalendar";
import { useEffect, useState, useMemo } from "react";
import { useBookingContext } from "../../@context/bookingContext";
import {
  dataChange,
  dateAvailable,
  newTimes,
  timeString,
} from "./TimeSection.data";
import dayjs, { Dayjs } from "dayjs";
import { DATE_HOURS_FORMAT } from "../../@constants/dateFormat";
import { useSearchParamsList } from "../../@hooks/useSearchParamsList.hook";
import { useUpdateSearchParams } from "../../@hooks/useUpdateSearchParams.hook";
import { SELECTED_DATE_PARAM } from "../../@constants/searchParams";

type Props = {
  last: number;
  master: string;
  onChangesValidDate: (fullTime: string[], timeService: string[]) => void;
  onChangeDate: (newDate: Date | null) => void;
};

const TimeSelection = ({
  last,
  master,
  onChangesValidDate,
  onChangeDate,
}: Props) => {
  const { bookings } = useBookingContext();
  const { selectedDate: date } = useSearchParamsList();
  const updateParam = useUpdateSearchParams();

  const initialDate = date ? dayjs(date) : dayjs();

  const [selectedDate, setSelectedDate] = useState(initialDate);

  useEffect(() => {
    updateParam({
      [SELECTED_DATE_PARAM]: selectedDate.toISOString(),
    });
  }, []);

  const timeArray = useMemo(() => {
    if (!master) return [];

    const filteredArray = newTimes(selectedDate);

    const filteredBookings = bookings.filter((el) => {
      const bookingDate = dayjs(el.date);
      return bookingDate.isSame(selectedDate, "day") && el.master === master;
    });

    for (const bk of filteredBookings) {
      const t = dayjs(bk.date).format(DATE_HOURS_FORMAT);
      const timeTextId = filteredArray.indexOf(t);

      if (timeTextId !== -1) {
        filteredArray.splice(timeTextId, bk.last);
      }
    }

    return filteredArray;
  }, [selectedDate, bookings, master]);

  const [bookTime, setBookTime] = useState<Dayjs>(() => {
    const firstTime = timeArray[0] ?? "09:00";
    const [h, m] = firstTime.split(":").map(Number);

    const date = dayjs(selectedDate);
    date.hour(h ?? 0).minute(m ?? 0);

    return date;
  });

  useEffect(() => {
    if (timeArray.length === 0) return;

    const currentTime = timeString(bookTime.hour(), bookTime.minute());
    if (!timeArray.includes(currentTime)) {
      const [h, m] = (timeArray[0] ?? "").split(":").map(Number);
      setBookTime(dataChange(selectedDate, h ?? 0, m ?? 0));
    }
  }, [timeArray, selectedDate, master]);

  useEffect(() => {
    onChangeDate(bookTime.toDate());
  }, [bookTime]);

  useEffect(() => {
    onChangesValidDate(timeArray, dateAvailable(bookTime, last - 1));
  }, [timeArray, bookTime, last]);

  const handleClickDate = (e: Value) => {
    const newDate = dayjs(e as Date)
      .hour(0)
      .minute(0);
    const today = dayjs().hour(0).minute(0);

    if (newDate.isBefore(today, "day")) return;

    setSelectedDate(newDate);

    const newTimesArray = newTimes(newDate);
    const firstTime = newTimesArray[0] ?? "09:00";
    const [h, m] = firstTime.split(":").map(Number);
    setBookTime(dataChange(newDate, h ?? 0, m ?? 0));
  };

  const handleClickBookClock = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    setBookTime(dataChange(selectedDate, h ?? 0, m ?? 0));
  };

  return (
    <section className="mobile:col-span-2 space-y-2">
      <p className="font-bold">
        Wybież czas i datę ({`Czas trwania usługi - ${last * 15} minut`})
      </p>
      <section
        className={classNames("grid gap-2", {
          "tablet:grid-cols-10 midpoint:grid-cols-8 mobile:grid-cols-6 grid-cols-4":
            timeArray.length,
        })}
      >
        {timeArray.length > 0 ? (
          timeArray.map((t, i, arr) => {
            const currentTime = timeString(bookTime.hour(), bookTime.minute());

            const dateAvailableArray = dateAvailable(bookTime, last - 1);
            const proveDates = () => {
              return dateAvailableArray.every((el) => arr.includes(el));
            };

            return (
              <article
                key={i}
                onClick={() => handleClickBookClock(t)}
                className={classNames(
                  "cursor-pointer rounded-full border px-4 py-1 text-center text-black",
                  { "bg-black text-white": t === currentTime && proveDates() },
                  { "bg-gray-200": dateAvailableArray.includes(t) },
                  {
                    "bg-red-400": t === currentTime && !proveDates(),
                  },
                  {
                    "bg-orange-300":
                      dateAvailableArray.includes(t) && !proveDates(),
                  },
                )}
              >
                {t}
              </article>
            );
          })
        ) : (
          <p>Nie ma terminów w dany dzień</p>
        )}
      </section>
      <TimeSelectionCalendar
        currentChoice={bookTime.isValid() ? bookTime.toDate() : new Date()}
        onClick={handleClickDate}
      />
    </section>
  );
};

export default TimeSelection;
