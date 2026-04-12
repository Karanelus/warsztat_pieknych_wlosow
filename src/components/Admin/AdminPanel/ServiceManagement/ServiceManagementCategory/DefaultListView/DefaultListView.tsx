import { AnimatePresence } from "framer-motion";
import ServiceManagementProduct from "../../ServiceManagementProduct";
import { Services } from "@models/services.type";

type Props = {
  name: string;
  products: Services[];
};

const DefaultListView = ({ name, products }: Props) => {
  return (
    <div className="space-y-2">
      <h3>{name}</h3>
      <section className="grid gap-2">
        <AnimatePresence initial={false}>
          {products.map((service) => (
            <ServiceManagementProduct key={service._id} product={service} />
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
};

export default DefaultListView;
