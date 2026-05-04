import { useState } from "react";
import { Services } from "../../../@types/services.type";
import Image from "../../../@ui/Image";
import ServicesProductText from "./ServicesProductText";
import ServiceInfo from "../ServiceInfo/ServiceInfo";
import useScrollLock from "../../../@hooks/useScrollLock.hook";
import { useUpdateSearchParams } from "../../../@hooks/useUpdateSearchParams.hook";
import {
  CATEGORY_PARAM,
  SERVICE_PARAM,
} from "../../../@constants/searchParams";

type Props = {
  product: Services;
};

const ServicesProduct = ({ product }: Props) => {
  const { name, image, last, masters, category } = product;
  const [service, setService] = useState<Services | null>(null);
  const updateParams = useUpdateSearchParams();

  const handleClickChangeService = (service: Services) => {
    setService(service);
    updateParams({ [SERVICE_PARAM]: service.name, [CATEGORY_PARAM]: category });
  };

  useScrollLock(service !== null);

  const handleClickRemoveService = () => {
    setService(null);
    updateParams({ [SERVICE_PARAM]: undefined, [CATEGORY_PARAM]: undefined });
  };

  return (
    <section className="mobile:flex-row relative flex flex-1 flex-col place-items-center gap-4 rounded-2xl bg-gray-100 p-6">
      <div className="mobile:size-40 size-30 shrink-0 rounded-xl">
        <Image src={image!} alt={name} />
      </div>
      <section className="flex h-full flex-col justify-between">
        <hgroup className="space-y-3">
          <ServicesProductText name={name} masters={masters} last={last} />
        </hgroup>
        <button
          onClick={() => handleClickChangeService(product)}
          className="w-fit rounded-full bg-gray-200 px-4 py-1 uppercase"
        >
          więcej szczegółów
        </button>
      </section>

      <ServiceInfo
        service={service}
        onClickRemoveService={handleClickRemoveService}
      />
    </section>
  );
};

export default ServicesProduct;
