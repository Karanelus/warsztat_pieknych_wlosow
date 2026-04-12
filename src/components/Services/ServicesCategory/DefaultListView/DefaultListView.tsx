import { Services } from "@models/services.type";
import ServicesProduct from "../../ServicesProduct/ServicesProduct";

type Props = {
  name: string;
  products: Services[];
};

const DefaultListView = ({ name, products }: Props) => {
  return (
    <div className="space-y-2">
      <h2>{name}</h2>
      <section className="tablet:grid-cols-2 grid gap-3">
        {products.map((service) => (
          <ServicesProduct key={service._id} product={service} />
        ))}
      </section>
    </div>
  );
};

export default DefaultListView;
