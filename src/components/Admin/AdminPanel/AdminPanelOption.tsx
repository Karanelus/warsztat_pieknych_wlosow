import { motion, Variants } from "framer-motion";
import { NavLink } from "react-router";
import Image from "../../../@ui/Image";
import { useLoginContext } from "../../../@context/loginContext";

type Props = {
  pageSrc: string;
  mainImage: string;
  supImage: string;
  supAnimation: Variants;
  optionName: string;
  optionTitle: string;
  accessLevel: number;
};

const textVariants = {
  initial: { opacity: 0, height: 0 },
  exit: { opacity: 0, height: 0 },
  hover: { opacity: 1, height: "auto" },
};

const AdminPanelOption = ({
  pageSrc,
  mainImage,
  supImage,
  supAnimation,
  optionName,
  optionTitle,
  accessLevel,
}: Props) => {
  const { user } = useLoginContext();
  const MotionNavLink = motion.create(NavLink);

  if (user && user.role > accessLevel) return null;

  return (
    <MotionNavLink
      to={pageSrc}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className="rounded-3xl bg-gray-100 p-8"
    >
      <motion.picture
        className="tablet:size-60 relative flex size-40 overflow-hidden rounded-xl"
        layout
      >
        <Image src={mainImage} alt={"Support element" + optionName} />
        <motion.img
          className="tablet:size-12 tablet:right-8 tablet:top-18 absolute top-13 right-6 size-8"
          src={supImage}
          variants={supAnimation}
          alt={optionName}
        />
      </motion.picture>
      <motion.hgroup layout>
        <h3>{optionName}</h3>
        <motion.p variants={textVariants} className="overflow-hidden">
          <span>{optionTitle}</span>
        </motion.p>
      </motion.hgroup>
    </MotionNavLink>
  );
};

export default AdminPanelOption;
