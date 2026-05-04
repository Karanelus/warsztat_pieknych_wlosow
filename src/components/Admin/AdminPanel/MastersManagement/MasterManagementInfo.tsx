import { MasterType } from "@models/masterType.type";
import classNames from "classnames";
import Image from "@ui/Image";
import Edit from "/Edit.svg";
import { motion } from "framer-motion";
import Cancel from "/Cancel.svg";
import { formatExperience } from '@helpers/formatExperience.helper';


type Props = {
  master: MasterType;
  activeMaster: number | null;
  onClickMaster: (id: number) => void;
  onCloseMaster: () => void;
  onCLickOpenWindowEdit: () => void;
};

const MasterManagementInfo = ({
  master,
  activeMaster,
  onClickMaster,
  onCloseMaster,
  onCLickOpenWindowEdit,
}: Props) => {
  const { _id, name, image, experience, profession } = master;

  const isActiveMaster = activeMaster === _id;

  const masterExpirianceText = formatExperience(experience);

  const handleClickMaster = () => {
    if (!isActiveMaster) onClickMaster(_id);
  };

  return (
    <motion.div
      layout
      onClick={handleClickMaster}
      transition={{ layout: { duration: 0.75, ease: "easeInOut" } }}
      className={classNames(
        "relative items-end rounded-xl",
        "flex aspect-square cursor-pointer overflow-hidden",
        "hover:inset-shadow-sm hover:inset-shadow-gray-900",
        { "col-span-2 row-span-2 cursor-default!": isActiveMaster },
      )}
    >
      <section
        className={classNames("z-10 w-full p-4 text-white", {
          "flex size-full items-end p-8 backdrop-blur-sm duration-300":
            isActiveMaster,
        })}
      >
        <h3
          className={classNames(
            isActiveMaster
              ? "midpoint:text-4xl! text-3xl!"
              : "midpoint:text-2xl! text-xl!",
          )}
        >
          {name}
          {isActiveMaster && (
            <>
              <p className="text-xl! font-normal">{masterExpirianceText}</p>
              <p className="text-lg!">{profession.join(", ")}</p>
            </>
          )}
        </h3>
        <section
          className={classNames(
            "flex gap-2",
            "absolute top-4 right-4",
            isActiveMaster
              ? "cursor-pointer opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <button
            type="button"
            onClick={onCLickOpenWindowEdit}
            className={classNames(
              "serviceManagementButton p-0.5",
              "size-8! border-2! border-black bg-gray-200",
            )}
          >
            <img src={Edit} alt="Edit" loading="lazy" />
          </button>
          <button
            type="button"
            onClick={onCloseMaster}
            className={classNames(
              "rounded-full border-2 border-black bg-gray-200 p-1",
              "size-8 duration-150",
            )}
          >
            <img src={Cancel} alt="Close" />
          </button>
        </section>
      </section>
      <Image isAbsolute src={image} alt={name} />
    </motion.div>
  );
};

export default MasterManagementInfo;
