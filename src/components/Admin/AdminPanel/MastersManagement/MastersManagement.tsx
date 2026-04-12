import { useNavigate } from "react-router";
import PageButton from "../../../../@ui/PageButton";
import loadingImage from "/loading.svg";
import AddIcon from "/img/Add.svg";
import { useMastersContext } from "../../../../@context/mastersContext";
import { useState } from "react";
import classNames from "classnames";
import MasterManagementInfo from "./MasterManagementInfo";
import NewMasters from "./MastersDrawer/NewMasters/NewMasters";
import EditMasters from "./MastersDrawer/EditMasters/EditMasters";

const MastersManagement = () => {
  const { masters, mastersLoading } = useMastersContext();
  const [{ isEdit, isNew }, setMastersWindows] = useState({
    isEdit: false,
    isNew: false,
  });
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

  const handleCLickOpenWindowNew = () => {
    setMastersWindows((prev) => ({ ...prev, isNew: !prev.isNew }));
  };

  const handleCLickOpenWindowEdit = () => {
    setMastersWindows((prev) => ({ ...prev, isEdit: !prev.isEdit }));
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
          {masters.map((master) => (
            <MasterManagementInfo
              key={master._id}
              master={master}
              activeMaster={activeMaster}
              onClickMaster={handleClickMaster}
              onCloseMaster={handleCloseMaster}
              onCLickOpenWindowEdit={handleCLickOpenWindowEdit}
            />
          ))}
          <button
            type="button"
            onClick={handleCLickOpenWindowNew}
            className={classNames(
              "relative rounded-xl duration-150",
              "flex aspect-square items-center justify-center overflow-hidden",
              "inset-ring-2 inset-ring-gray-200",
            )}
          >
            <img src={AddIcon} alt="add" className="size-16" />
          </button>
        </section>
      )}
      <PageButton text="< Wstecz" onClick={handleClickBack} />
      {isNew && <NewMasters onCLickOpenWindowNew={handleCLickOpenWindowNew} />}
      {isEdit && (
        <EditMasters onCLickOpenWindowEdit={handleCLickOpenWindowEdit} />
      )}
    </div>
  );
};

export default MastersManagement;
