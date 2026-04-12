import { useSearchParamsList } from "@hooks/useSearchParamsList.hook";
import { useServicesContext } from "@context/servicesContext";
import DefaultListView from "./DefaultListView/DefaultListView";
import SearchListView from "./SearchListView/SearchListView";

const ServicesCategory = () => {
  const { services, splittedServices } = useServicesContext();
  const isEmpty = Object.keys(splittedServices).length === 0;
  const serviceCategory = Object.entries(splittedServices);
  const { serviceQ } = useSearchParamsList();

  if (isEmpty) return <h2>Nie znaleziono żadnych usług</h2>;

  if (serviceQ) return <SearchListView services={services} />;

  return serviceCategory.map(([name, products]) => (
    <DefaultListView key={name} name={name} products={products} />
  ));
};

export default ServicesCategory;
