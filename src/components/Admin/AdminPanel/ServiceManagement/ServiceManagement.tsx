import { useNavigate } from "react-router";
import PageButton from "../../../../@ui/PageButton";
import { useState } from "react";
import ServiceManagementCategory from "./ServiceManagementCategory/ServiceManagementCategory";
import loadingImage from "/loading.svg";
import classNames from "classnames";
import NewServiceAdding from "./NewServiceAdding/NewServiceAdding";
import useScrollLock from "../../../../@hooks/useScrollLock.hook";
import { useServicesContext } from "../../../../@context/servicesContext";
import { AnimatePresence } from "framer-motion";
import Searchbar from "@ui/Searchbar/Searchbar";
import { useUpdateSearchParams } from "@hooks/useUpdateSearchParams.hook";
import { SERVICE_QUERY_PARAM } from "@constants/searchParams";
import SearchResults from "@ui/SearchResults/SearchResults";

const ServiceManagement = () => {
  const { errorServices, loadingServices } = useServicesContext();
  const updateParams = useUpdateSearchParams();

  const nav = useNavigate();
  const [newServiceAdding, setNewServiceAdding] = useState(false);

  const handleServicesQuery = (query: string) => {
    updateParams({ [SERVICE_QUERY_PARAM]: query });
  };

  useScrollLock(newServiceAdding);

  const handleClickBack = () => {
    nav(-1);
  };

  const handleClickAddNewService = () => {
    setNewServiceAdding((prev) => !prev);
  };

  if (errorServices)
    return (
      <h1>
        Niestety nie udało się pobrać dane z powodu: {errorServices.toString()}
      </h1>
    );

  return (
    <section className="relative flex flex-col space-y-4">
      <h2>Zarządzanie usługami</h2>
      <section className="grid gap-4">
        <Searchbar
          name="serviceSearchbar"
          placeholder="Wpisz nazwę usługi"
          onSubmit={handleServicesQuery}
        />
        <SearchResults />
        {loadingServices ? (
          <div className="flex size-5">
            <img
              src={loadingImage}
              alt="Loading"
              loading="lazy"
              className="size-4 animate-spin"
            />
          </div>
        ) : (
          <ServiceManagementCategory />
        )}
      </section>

      <button
        className={classNames(
          "mx-auto rounded-full border px-4 py-2 font-bold",
          { "pointer-events-none opacity-50": loadingServices },
        )}
        onClick={handleClickAddNewService}
      >
        Dodaj nową usługę
      </button>

      <PageButton text="< Wstecz" onClick={handleClickBack} />

      <AnimatePresence>
        {newServiceAdding && (
          <NewServiceAdding onClickAddNewService={handleClickAddNewService} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServiceManagement;
