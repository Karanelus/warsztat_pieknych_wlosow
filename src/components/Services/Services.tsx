import ServicesCategory from "./ServicesCategory/ServicesCategory";
import loadingImage from "/loading.svg";
import { useServicesContext } from "../../@context/servicesContext";
import Searchbar from "../../@ui/Searchbar/Searchbar";
import { useUpdateSearchParams } from "../../@hooks/useUpdateSearchParams.hook";
import { SERVICE_QUERY_PARAM } from "../../@constants/searchParams";
import ServicesSearch from "./ServicesSearch/ServicesSearch";

const Services = () => {
  const { errorServices, loadingServices } = useServicesContext();
  const updateParams = useUpdateSearchParams();

  const handleServicesQuery = (query: string) => {
    updateParams({ [SERVICE_QUERY_PARAM]: query });
  };

  if (errorServices)
    return (
      <h1>
        Niestety nie udało się pobrać dane z powodu: {errorServices.toString()}
      </h1>
    );

  return (
    <div>
      <h1>Nasze usłigi</h1>

      <section className="space-y-8">
        <Searchbar
          name="serviceSearchbar"
          placeholder="Wpisz nazwę usługi"
          onSubmit={handleServicesQuery}
        />
        <ServicesSearch />
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
          <ServicesCategory />
        )}
      </section>
    </div>
  );
};

export default Services;
