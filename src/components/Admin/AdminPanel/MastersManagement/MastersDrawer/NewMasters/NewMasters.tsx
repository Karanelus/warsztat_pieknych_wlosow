import DrawerContainer from "@ui/DrawerContainer";

type Props = {
  onCLickOpenWindowNew: () => void;
};

const NewMasters = ({ onCLickOpenWindowNew }: Props) => {
  return (
    <DrawerContainer>
      <button type="button" onClick={onCLickOpenWindowNew}>
        X
      </button>
      NewMasters
    </DrawerContainer>
  );
};

export default NewMasters;
