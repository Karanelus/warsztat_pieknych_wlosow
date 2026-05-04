import { useNavigate } from "react-router";
import PageButton from "@ui/PageButton";
import loadingImage from "/loading.svg";
import AddIcon from "/img/Add.svg";
import { useMastersContext } from "@context/mastersContext";
import { useState } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import MasterManagementInfo from "./MasterManagementInfo";
import NewMasters from "./MastersDrawer/MastersDrawer";

const MastersManagement = () => {
  const { masters, mastersLoading } = useMastersContext();
  const [isEdited, setEdited] = useState(false);
  const nav = useNavigate();
  const [activeMaster, setActiveMaster] = useState<number | null>(null);

  const handleClickBack = () => {
    nav(-1);
  };

  const handleClickMaster = (id: number) => {
    setActiveMaster(id);
  };

  const handleCloseMaster = () => {
    setActiveMaster(null);
  };

  const handleCLickOpenDrawer = () => {
    setEdited((prev) => !prev);
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
      <section className="mobile:grid-cols-2 tablet:grid-cols-4 grid grid-cols-1 gap-5">
        {!mastersLoading && masters && (
          <>
            {masters.map((master) => (
              <MasterManagementInfo
                key={master._id}
                master={master}
                activeMaster={activeMaster}
                onClickMaster={handleClickMaster}
                onCloseMaster={handleCloseMaster}
                onCLickOpenWindowEdit={handleCLickOpenDrawer}
              />
            ))}
            <motion.button
              layout
              transition={{ layout: { duration: 0.37, ease: "linear" } }}
              type="button"
              onClick={handleCLickOpenDrawer}
              className={classNames(
                "relative rounded-xl duration-150",
                "flex aspect-square items-center justify-center overflow-hidden",
                "inset-ring-2 inset-ring-gray-200",
              )}
            >
              <img src={AddIcon} alt="add" className="size-16" />
            </motion.button>
          </>
        )}
      </section>

      <PageButton text="< Wstecz" onClick={handleClickBack} />
      <NewMasters
        isVisible={isEdited}
        onCLickOpenWindowNew={handleCLickOpenDrawer}
      />
    </div>
  );
};

export default MastersManagement;
