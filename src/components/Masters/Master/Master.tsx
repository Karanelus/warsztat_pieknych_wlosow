import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router";
import MasterInfo from "./MasterInfo/MasterInfo";
import MasterWorks from "./MasterWorks/MasterWorks";
import PageButton from "../../../@ui/PageButton";
import { useMastersContext } from "../../../@context/mastersContext";
import { MasterType } from "../../../@types/masterType.type";

type Props = {
  masterInfo?: MasterType;
};

const Master = ({ masterInfo }: Props) => {
  const { masters } = useMastersContext();
  const { name } = useParams();
  const navigate = useNavigate();
  const info = masterInfo ?? masters.find((master) => master.name === name);

  const handleClickBack = () => {
    navigate(-1);
  };

  if (!info) return <div data-testid="master-not-found">Master not found</div>;

  const masterProfessionText = info.profession.join(", ") ?? "";
  const masterExpirianceText = `${info.experience} lat doświadczenia`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative space-y-4"
      data-testid="master"
    >
      <h1>Master {info.name}</h1>
      <h2>
        {masterProfessionText} | {masterExpirianceText}
      </h2>
      <MasterInfo
        name={info.name}
        photo={info.image}
        description={info.description}
      />
      <MasterWorks name={info.name} masterWorks={info.masterWorksPhotos} />
      <PageButton text="< Wstecz" onClick={handleClickBack} />
    </motion.div>
  );
};

export default Master;
