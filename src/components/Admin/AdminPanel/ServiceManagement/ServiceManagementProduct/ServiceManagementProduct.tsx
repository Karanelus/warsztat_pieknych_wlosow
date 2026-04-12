import { useState } from "react";
import { Services } from "../../../../../@types/services.type";
import { motion, Variants } from "framer-motion";
import ServiceManagementProductInfo from "./Info/ServiceManagementProductInfo";
import classNames from "classnames";
import Expand from "/Expand.svg";

import ServiceManagementProductEdit from "./Edit/ServiceManagementProductEdit";

type Props = {
  product: Services;
};

const mainSectionVariants: Variants = {
  initial: { height: 0, opacity: 0 },
  exit: { height: 0, opacity: 0 },
  animate: { height: "auto", opacity: 1 },
};

const containerSectionVariants: Variants = {
  initial: { scale: 0.9, x: -60, opacity: 0.3 },
  exit: { scale: 0.9, x: 30, opacity: 0.3 },
  animate: { scale: 1, x: 0, opacity: 1 },
};

const ServiceManagementProduct = ({ product }: Props) => {
  const [{ isOpen, isEditing }, setOptionState] = useState({
    isOpen: false,
    isEditing: false,
  });

  const [optionStorage, setOptionStorage] = useState<
    (Omit<Services, "_id" | "image"> & { image: File | null }) | null
  >(null);

  const handleClickEditing = () => {
    setOptionState((prev) => ({ ...prev, isEditing: !prev.isEditing }));
  };

  const handleClickOpen = () => {
    setOptionState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  };

  const handleChangeStorage = (
    newItem: (Omit<Services, "_id" | "image"> & { image: File | null }) | null,
  ) => {
    setOptionStorage(() => newItem);
  };

  return (
    <motion.section
      key={product._id}
      variants={mainSectionVariants}
      initial="initial"
      exit="exit"
      animate="animate"
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="grid rounded-3xl border px-4 py-2"
    >
      <motion.section
        transition={{ duration: 0.15, ease: "easeInOut" }}
        initial="initial"
        exit="exit"
        animate="animate"
        variants={containerSectionVariants}
      >
        <div className="flex justify-between">
          <p className="font-bold">{product.name}</p>
          <section>
            <button
              className={classNames("serviceManagementButton", {
                "pointer-events-none opacity-50": isEditing,
              })}
              onClick={handleClickOpen}
            >
              <img
                src={Expand}
                alt="expand"
                loading="lazy"
                className={classNames("duration-75", { "-rotate-180": isOpen })}
              />
            </button>
          </section>
        </div>
        <section
          className={classNames("grid duration-300", {
            "grid-rows-[0fr]": !isOpen,
            "grid-rows-[1fr]": isOpen,
          })}
        >
          <div className="mt-2 overflow-hidden">
            {isEditing ? (
              <ServiceManagementProductEdit
                product={product}
                storage={optionStorage}
                onChangeStorage={handleChangeStorage}
                onClickEdit={handleClickEditing}
              />
            ) : (
              <ServiceManagementProductInfo
                product={product}
                onCLickOpen={handleClickEditing}
              />
            )}
          </div>
        </section>
      </motion.section>
    </motion.section>
  );
};

export default ServiceManagementProduct;
