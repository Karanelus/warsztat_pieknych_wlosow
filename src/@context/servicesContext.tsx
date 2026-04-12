/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { Services } from "../@types/services.type";
import { getServices } from "../@api/services.api";
import { useQuery } from "@tanstack/react-query";
import { useSearchParamsList } from "../@hooks/useSearchParamsList.hook";

type Props = {
  children: ReactNode;
};

const useService = () => {
  const { serviceQ } = useSearchParamsList();

  const { data, isPending, error } = useQuery({
    queryKey: ["services", serviceQ],
    queryFn: () => getServices(serviceQ),
  });

  const [services, setServices] = useState<Services[]>([]);

  useEffect(() => {
    if (data) {
      console.log(data);
      setServices(data);
    }
  }, [data]);

  const splittedServices: Record<string, Services[]> = useMemo(() => {
    return (services ?? []).reduce(
      (acc: Record<Services["category"], Services[]>, cur: Services) => {
        const key = cur.category;
        acc[key] = acc[key] ? [...acc[key], cur] : [cur];
        return acc;
      },
      {},
    );
  }, [services]);

  const categories = useMemo(
    () => Object.keys(splittedServices),
    [splittedServices],
  );

  const servicesOnCategory = (category: string) => {
    return services
      .filter((el) => el.category === category)
      .map((el) => el.name);
  };

  const mastersOnService = (service: string) => {
    const matched = services.find((el) => el.name === service);
    return matched ? matched.masters : [];
  };

  const updateServiceInCache = (updated: Services) => {
    if (!updated) return;
    setServices((old) => old.map((s) => (s._id === updated._id ? updated : s)));
  };

  const addServiceToCache = (newService: Services) => {
    if (!newService) return;
    setServices((old) => [...old, newService]);
  };

  const deleteServicesFromCache = (id: number) => {
    setServices((old) => old.filter((s) => s._id !== id));
  };

  return {
    services,
    splittedServices,
    categories,
    servicesOnCategory,
    mastersOnService,
    loadingServices: isPending,
    errorServices: error,
    updateServiceInCache,
    addServiceToCache,
    deleteServicesFromCache,
  };
};

type ServicesContentProps = ReturnType<typeof useService>;

const ServicesContext = createContext({} as ServicesContentProps);

export const useServicesContext = () => {
  const context = useContext(ServicesContext);
  if (!context) throw new Error("Context must be used within ServicesContext");
  return context;
};

export const ServicesContextContainer = ({ children }: Props) => {
  const value = useService();
  return (
    <ServicesContext.Provider value={value}>
      {children}
    </ServicesContext.Provider>
  );
};
