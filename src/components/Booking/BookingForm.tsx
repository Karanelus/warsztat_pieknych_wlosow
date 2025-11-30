import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import DropdownSelect from "../../@ui/DropdownSelect";
import TimeSelection from "../../@ui/TimeSection/TimeSelection";
import { addBookings } from "../../@api/booking.api";
import classNames from "classnames";
import { proveForm } from "./Booking.data";
import { useNotificationContext } from "../../@context/notificationContent";
import { useServicesContext } from "../../@context/servicesContext";
import loadingImage from "/loading.svg";
import { useMutation } from "@tanstack/react-query";
import { useBookingContext } from "../../@context/bookingContext";
import BookingExplaining from "./BookingExplaining";
import { Booking } from "../../@types/booking.type";
import { useUpdateSearchParams } from "../../@hooks/useUpdateSearchParams.hook";
import dayjs from "dayjs";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAM,
  SERVICE_PARAM,
} from "../../@constants/searchParams";
import { useSearchParamsList } from "../../@hooks/useSearchParamsList.hook";

const BookingForm: React.FC = () => {
  const {
    services,
    categories,
    servicesOnCategory,
    mastersOnService,
    loadingServices,
  } = useServicesContext();

  const { addNewNotification } = useNotificationContext();
  const { addBookingToCache } = useBookingContext();
  const updateParam = useUpdateSearchParams();
  const { category: categoryParam, service: serviceParam } =
    useSearchParamsList();

  const initializedRef = useRef(false);

  const canonicalCategory = useMemo(() => {
    if (!categories || categories.length === 0) return "";
    if (categoryParam && categories.includes(categoryParam))
      return categoryParam;
    return categories[0];
  }, [categories, categoryParam]);

  const serviceOptionsForCategory = useMemo(() => {
    if (!canonicalCategory) return [] as string[];
    return servicesOnCategory(canonicalCategory) ?? [];
  }, [canonicalCategory, servicesOnCategory]);

  const canonicalService = useMemo(() => {
    if (!serviceOptionsForCategory || serviceOptionsForCategory.length === 0)
      return "";
    if (serviceParam && serviceOptionsForCategory.includes(serviceParam))
      return serviceParam;
    return serviceOptionsForCategory[0];
  }, [serviceOptionsForCategory, serviceParam]);

  const currentServiceObject = useMemo(() => {
    return services.find((s) => s.name === canonicalService) ?? null;
  }, [services, canonicalService]);

  const defaultForm = useMemo(() => {
    return {
      fullName: "",
      email: "",
      category: canonicalCategory,
      service: canonicalService,
      last: currentServiceObject?.last ?? 0,
      master: currentServiceObject?.masters?.[0] ?? "",
      date: null as Date | null,
    };
  }, [canonicalCategory, canonicalService, currentServiceObject]);

  const [bookingForm, setBookingForm] = useState<
    Omit<Booking, "_id" | "isConfirmed"> & { category: string }
  >(defaultForm);

  const { fullName, email, category, service, master, date, last } =
    bookingForm;

  useEffect(() => {
    if (
      !initializedRef.current &&
      categories.length > 0 &&
      services.length > 0
    ) {
      setBookingForm((prev) => ({
        ...prev,
        category: canonicalCategory,
        service: canonicalService,
        last: currentServiceObject?.last ?? prev.last,
        master: currentServiceObject?.masters?.[0] ?? prev.master ?? "",
      }));

      updateParam({
        [CATEGORY_PARAM]: canonicalCategory,
        [SERVICE_PARAM]: canonicalService,
      });

      initializedRef.current = true;
    } else if (initializedRef.current) {
      setBookingForm((prev) => ({
        ...prev,
        category: canonicalCategory,
        service: canonicalService,
        last: currentServiceObject?.last ?? prev.last,
        master: currentServiceObject?.masters?.includes(prev.master)
          ? prev.master
          : (currentServiceObject?.masters?.[0] ?? ""),
      }));
    }
  }, [
    categories,
    services,
    canonicalCategory,
    canonicalService,
    currentServiceObject,
    updateParam,
  ]);

  const handleChangeFormOption = (
    name: string,
    newOption: string,
    param?: string,
  ) => {
    setBookingForm((prev) => ({ ...prev, [name]: newOption }));

    if (param) {
      updateParam({ [param]: newOption });
    }
  };

  const onChangeFormInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeDate = (newDate: Date | null) => {
    setBookingForm((prev) => ({ ...prev, date: newDate }));
    updateParam({
      [SELECTED_DATE_PARAM]: newDate ? dayjs(newDate).toISOString() : "",
    });
  };

  const [isValidDate, setIsValidDate] = useState(true);
  const handleChangesValidDate = (
    fullTime: string[] = [],
    timeService: string[] = [],
  ) => {
    if (!Array.isArray(fullTime) || !Array.isArray(timeService)) {
      setIsValidDate(true);
      return;
    }

    const anyConflict = timeService.some((t) => !fullTime.includes(t));

    setIsValidDate(!anyConflict);
  };

  const { mutate, isPending: loading } = useMutation({
    mutationFn: (
      newBooking: Omit<Booking, "_id" | "isConfirmed"> & { category?: string },
    ) => addBookings(newBooking),
    onSuccess: (update: Booking) => {
      addBookingToCache(update);
      addNewNotification(
        "added",
        "Wizyta zapisana",
        "Wizyta została wysłana do weryfikacji. Proszę poczekać na potwierdzenie od salonu.",
      );

      setBookingForm((prev) => ({
        ...prev,
        fullName: "",
        email: "",
        category: canonicalCategory,
        service: canonicalService,
        last: currentServiceObject?.last ?? 0,
        master: currentServiceObject?.masters?.[0] ?? "",
        date: null,
      }));

      updateParam({
        [CATEGORY_PARAM]: canonicalCategory,
        [SERVICE_PARAM]: canonicalService,
        [SELECTED_DATE_PARAM]: "",
      });
    },
    onError: (e) => {
      console.error(e);
      addNewNotification(
        "error",
        "Wystąpił błąd",
        "Coś poszło nie tak. Spróbuj jeszcze raz",
      );
    },
  });

  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!proveForm(bookingForm))
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Proszę sprawdzić imię i nazwisko oraz email",
      );

    if (!date)
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Nie została wybrana data wizyty",
      );

    if (!isValidDate)
      return addNewNotification(
        "error",
        "Nieprawidłowe dane",
        "Ustawiony przez ciebie czas będzie się nakładał na inną wizytę. Wybierz trochę inny czas.",
      );

    const found = services.find((el) => el.name === service);
    const lastValue = found ? found.last : last;

    mutate({
      fullName,
      email,
      service,
      master,
      last: lastValue,
      date,
      category,
    });
  };

  const categoryOptions = categories ?? [];
  const serviceOptions = serviceOptionsForCategory ?? [];
  const masterOptions = mastersOnService(service) ?? [];

  return (
    <form
      onSubmit={handleSubmitForm}
      className={classNames("mobile:grid-cols-2 grid gap-4", {
        "pointer-events-none opacity-50": loadingServices,
      })}
    >
      <label>
        <p className="font-bold">Imię i nazwisko</p>
        <input
          type="text"
          value={fullName}
          onChange={onChangeFormInput}
          name="fullName"
        />
      </label>

      <label>
        <p className="font-bold">Email</p>
        <input
          type="text"
          value={email}
          onChange={onChangeFormInput}
          name="email"
        />
      </label>

      <DropdownSelect
        name="category"
        current={category}
        options={categoryOptions}
        param={CATEGORY_PARAM}
        title="Wybież kategorię"
        onClickChangeCurrent={handleChangeFormOption}
      />

      <DropdownSelect
        name="service"
        current={service}
        param={SERVICE_PARAM}
        options={serviceOptions}
        title="Wybież usługę"
        onClickChangeCurrent={handleChangeFormOption}
      />

      <DropdownSelect
        name="master"
        current={master}
        options={masterOptions}
        onClickChangeCurrent={handleChangeFormOption}
        title="Wybież mistrza"
      />

      <BookingExplaining />

      <TimeSelection
        last={last}
        master={master}
        onChangesValidDate={handleChangesValidDate}
        onChangeDate={handleChangeDate}
      />

      <div className="mobile:col-span-2 grid place-items-center">
        <button
          type="submit"
          className={classNames(
            "grid place-items-center px-4 py-2",
            "aspect-4/1 w-44 rounded-xl border",
            "duration-150 hover:bg-black hover:text-white",
            { "cursor-not-allowed": loading },
          )}
          disabled={loading}
        >
          {loading ? (
            <img
              src={loadingImage}
              alt="Loading"
              loading="lazy"
              className="size-4 animate-spin"
            />
          ) : (
            "Zarezerwuj wizytę"
          )}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
