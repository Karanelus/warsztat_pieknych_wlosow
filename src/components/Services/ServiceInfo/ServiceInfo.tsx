import { Services } from "@models/services.type";
import Cancel from "/Cancel.svg";
import CategoryText from "@ui/CategoryText";
import { masterText, timeLast } from "../Services.data";
import Image from "@ui/Image";
import ServiceInfoOptions from "./ServiceInfoOptions";
import { useKeydown } from "@hooks/useKeydown.hook";
import { NavLink } from "react-router";
import { CATEGORY_PARAM, SERVICE_PARAM } from "@constants/searchParams";
import { appUrls, toLink } from "../../../appUrls";
import DrawerContainer from "@ui/DrawerContainer";

type Props = {
  service: Services | null;
  onClickRemoveService: () => void;
};

const ServiceInfo = ({ service, onClickRemoveService }: Props) => {
  const { name, category, masters, last, image, cost, options } = service ?? {};

  useKeydown("Escape", onClickRemoveService, service !== null);

  return (
    <DrawerContainer isVisible={Boolean(service)}>
      <section className="relative space-y-2 rounded-xl bg-white p-6">
        <h2>{name}</h2>

        <section className="flex">
          <section className="space-y-4">
            <article>
              <CategoryText category="Kategoria" body={category ?? ""} />
              <CategoryText
                category={masterText(masters ?? [])}
                body={(masters ?? []).join(", ") ?? ""}
              />
              <CategoryText
                category="Trwanie wizyty"
                body={timeLast(last ?? 0)}
              />
            </article>
            <article>
              <ServiceInfoOptions cost={cost ?? 0} options={options ?? []} />
            </article>
          </section>
          <div className="mobile:size-80 size-30 shrink-0 rounded-xl">
            <Image src={image!} alt={name ?? ""} />
          </div>
        </section>

        <section className="w-fit">
          <NavLink
            to={{
              pathname: toLink(appUrls.BOOKING),
              search: `${SERVICE_PARAM}=${encodeURI(name ?? "")}&${CATEGORY_PARAM}=${encodeURI(category ?? "")}`,
            }}
          >
            <button className="bookingButton">Zapisać się</button>
          </NavLink>
        </section>

        <button
          type="button"
          onClick={onClickRemoveService}
          className="absolute top-7 right-7 size-8 rounded-full border p-1"
        >
          <img src={Cancel} alt="Close" />
        </button>
      </section>
    </DrawerContainer>
  );
};

export default ServiceInfo;
