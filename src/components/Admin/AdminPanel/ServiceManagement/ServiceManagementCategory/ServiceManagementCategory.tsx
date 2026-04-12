import { useServicesContext } from "@context/servicesContext";
import { useSearchParamsList } from "@hooks/useSearchParamsList.hook";
import SearchListView from "./SearchListView/SearchListView";
import DefaultListView from "./DefaultListView/DefaultListView";

const ServiceManagementCategory = () => {
  const { splittedServices, services } = useServicesContext();
  const { serviceQ } = useSearchParamsList();

  const serviceCategory = Object.entries(splittedServices);

  if (serviceQ) return <SearchListView services={services} />;

  return serviceCategory.map(([name, products]) => (
    <DefaultListView key={name} name={name} products={products} />
  ));
};

export default ServiceManagementCategory;
