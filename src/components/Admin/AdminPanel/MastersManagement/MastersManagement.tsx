import { useNavigate } from "react-router";
import PageButton from "../../../../@ui/PageButton";
import loadingImage from "/loading.svg";
import { useMastersContext } from "../../../../@context/mastersContext";
import Image from "../../../../@ui/Image";
import { useState } from "react";
import classNames from "classnames";

const MastersManagement = () => {
  const { masters, mastersLoading } = useMastersContext();
  const nav = useNavigate();
  const [activeMaster, setActiveMaster] = useState<number | null>(null);

  const handleClickBack = () => {
    nav(-1);
  };

  const handleClickMaster = (id: number) => {
    setActiveMaster(id);
  };

  return (
    <div className="relative space-y-4">
      <h2>Zarządzanie pracownikami</h2>
      {mastersLoading && (
        <div className="flex size-5">
          <img
            src={loadingImage}
            alt="Ładowanie…"
            loading="lazy"
            className="size-4 animate-spin"
          />
        </div>
      )}
      {!mastersLoading && masters && (
        <section className="mobile:grid-cols-2 tablet:grid-cols-4 grid grid-cols-1 gap-5">
          {masters.map(({ _id, name, image }) => (
            <div
              onClick={() => handleClickMaster(_id)}
              className={classNames(
                "relative items-end rounded-xl duration-150",
                "flex aspect-square overflow-hidden",
                "hover:inset-shadow-sm hover:inset-shadow-gray-900",
                { "col-span-2 row-span-2": activeMaster === _id },
              )}
            >
              <section className="z-10 p-4 w-full text-white">
                <h3
                  className={classNames(
                    activeMaster === _id
                      ? "midpoint:text-4xl! text-3xl!"
                      : "midpoint:text-2xl! text-xl!",
                  )}
                >
                  {name}
                </h3>
              </section>
              <Image isAbsolute src={image} alt={name} />
            </div>
          ))}
        </section>
      )}
      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </div>
  );
};

export default MastersManagement;
