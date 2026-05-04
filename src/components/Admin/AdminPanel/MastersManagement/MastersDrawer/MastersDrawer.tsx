import DrawerContainer from "@ui/DrawerContainer";
import InputServicesString from "@ui/ServicesManagement/Inputs/InputServicesString";

type Props = {
  isVisible: boolean;
  onCLickOpenWindowNew: () => void;
};

const MastersDrawer = ({ isVisible, onCLickOpenWindowNew }: Props) => {
  return (
    <DrawerContainer isVisible={isVisible}>
      <div className="rounded-xl bg-white p-5">
        <button type="button" onClick={onCLickOpenWindowNew}>
          X
        </button>
        <InputServicesString
          value=""
          name="text"
          title="Imię"
          onChange={() => {}}
        />
        <InputServicesString
          value=""
          name="text"
          title="Zawód"
          onChange={() => {}}
        />
      </div>
    </DrawerContainer>
  );
};

export default MastersDrawer;
