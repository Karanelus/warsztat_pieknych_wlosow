import { Services } from "@models/services.type";
import ServicesProduct from "../../ServicesProduct/ServicesProduct";

type Props = {
  services: Services[];
};

const SearchListView = ({ services }: Props) => {
  return (
    <section className="tablet:grid-cols-2 grid gap-3">
      {services.map((service) => (
        <ServicesProduct key={service._id} product={service} />
      ))}
    </section>
  );
};

export default SearchListView;
