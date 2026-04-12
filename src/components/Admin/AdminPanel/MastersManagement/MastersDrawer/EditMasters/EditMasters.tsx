import DrawerContainer from "@ui/DrawerContainer";

type Props = {
  onCLickOpenWindowEdit: () => void;
};

const EditMasters = ({ onCLickOpenWindowEdit }: Props) => {
  return (
    <DrawerContainer>
      <button type="button" onClick={onCLickOpenWindowEdit}>
        X
      </button>
      EditMasters
    </DrawerContainer>
  );
};

export default EditMasters;
