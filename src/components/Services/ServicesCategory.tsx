import { Services } from "../../@types/services.type";
import ServicesProduct from "./ServicesProduct/ServicesProduct";

type Props = {
  splittedServices: Record<string, Services[]>;
};

const ServicesCategory = ({ splittedServices }: Props) => {
  const isEmpty = Object.keys(splittedServices).length === 0;
  const serviceCayegory = Object.entries(splittedServices);

  if (isEmpty) return <h2>Nie znaleziono żadnych usług</h2>;

  return serviceCayegory.map(([name, products]) => (
    <div className="space-y-2">
      <h2>{name}</h2>
      <section className="tablet:grid-cols-2 grid gap-3">
        {products.map((service) => (
          <ServicesProduct key={service._id} product={service} />
        ))}
      </section>
    </div>
  ));
};

export default ServicesCategory;
