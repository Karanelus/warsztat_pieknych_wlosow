import { Services } from "../../../../../../@types/services.type";
import CategoryText from "../../../../../../@ui/CategoryText";
import Image from "../../../../../../@ui/Image";
import Edit from "/Edit.svg";

type Props = {
  product: Services;
  onCLickOpen: () => void;
};

const ServiceManagementProductInfo = ({ product, onCLickOpen }: Props) => {
  return (
    <>
      <hgroup className="flex justify-between">
        <CategoryText category="Kategoria" body={product.category} />
        <CategoryText category="ID" body={String(product._id)} />
      </hgroup>
      <CategoryText
        category="Czas trwania"
        body={`${product.last * 15} minut`}
      />
      {product.masters && (
        <CategoryText
          category="Mistrz"
          body={`${product.masters.join(", ")}` || ""}
        />
      )}
      <section className="mobile:grid-cols-[1fr_150px] grid grid-cols-1 items-center border-t">
        <article>
          {Array.isArray(product.cost) ? (
            product.cost.map((el, i) => (
              <CategoryText
                key={i}
                category={product.options[i] ?? ""}
                body={String(el)}
                isCost={true}
              />
            ))
          ) : (
            <CategoryText
              category="Koszt"
              body={String(product.cost)}
              isCost={true}
            />
          )}
        </article>
        <section className="size-full overflow-hidden rounded-xl">
          <Image src={product.image ?? ""} alt={product.name} />
        </section>
      </section>
      <section className="flex justify-end gap-2">
        <button className="serviceManagementButton" onClick={onCLickOpen}>
          <img src={Edit} alt="Edit" loading="lazy" />
        </button>
      </section>
    </>
  );
};

export default ServiceManagementProductInfo;
