import { NavLink } from "react-router";
import logo from "/img/logo_transparent_name.webp";
import burgerMenuClose from "/img/CloseBurgerMenu.svg";
import { motion } from "framer-motion";
import Image from "../../../@ui/Image";
import { appUrls, toLink } from "../../../appUrls";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAM,
  SERVICE_PARAM,
} from "../../../@constants/searchParams";
import dayjs from "dayjs";
import { useServicesContext } from "../../../@context/servicesContext";

type Props = {
  onClickCloseMenu: (state: boolean) => void;
};

const BurgerMenu = ({ onClickCloseMenu }: Props) => {
  const { categories, services } = useServicesContext();

  const menuOptions = [
    {
      title: "Główna",
      to: { pathname: toLink(appUrls.ROOT), search: undefined },
    },
    {
      title: "Mistrzowie",
      to: { pathname: toLink(appUrls.MASTERS), search: undefined },
    },
    {
      title: "Usługi",
      to: { pathname: toLink(appUrls.SERVICES), search: undefined },
    },
    {
      title: "Zapisać się",
      to: {
        pathname: toLink(appUrls.BOOKING),
        search: `${SELECTED_DATE_PARAM}=${dayjs().toISOString()}&${CATEGORY_PARAM}=${categories[0] ?? ""}&${SERVICE_PARAM}=${services[0]?.name}`,
      },
    },
    {
      title: "Kontakt",
      to: { pathname: toLink(appUrls.CONTACT), search: undefined },
    },
  ];

  return (
    <motion.section
      data-testid="burger-menu"
      key="burger-menu"
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 z-100 flex h-full w-full flex-col items-center justify-center gap-16 bg-black text-white ease-in-out"
    >
      <button
        onClick={() => onClickCloseMenu(false)}
        className="absolute top-4 right-8 size-10"
      >
        <img src={burgerMenuClose} alt="Close menu" loading="lazy" />
      </button>
      <div className="aspect-65/16 h-10">
        <Image src={logo} alt="Logo" />
      </div>
      <nav className="flex flex-col items-center gap-8 text-xl">
        {menuOptions.map((option) => (
          <NavLink
            to={option.to}
            key={option.title}
            onClick={() => onClickCloseMenu(false)}
          >
            {option.title}
          </NavLink>
        ))}
      </nav>
    </motion.section>
  );
};

export default BurgerMenu;
