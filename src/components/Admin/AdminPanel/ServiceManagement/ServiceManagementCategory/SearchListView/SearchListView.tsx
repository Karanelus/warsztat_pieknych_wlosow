import { Services } from "@models/services.type";
import ServiceManagementProduct from "../../ServiceManagementProduct/ServiceManagementProduct";

type Props = {
  services: Services[];
};

const SearchListView = ({ services }: Props) => {
  return (
    <section className="grid gap-2">
      {services.map((service) => (
        <ServiceManagementProduct key={service._id} product={service} />
      ))}
    </section>
  );
};

export default SearchListView;
