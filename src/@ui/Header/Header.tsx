import { NavLink } from "react-router";
import logo from "/img/logo_transparent_name.webp";
import burgerMenuIcon from "/img/BurgerMenu.svg";
import { useEffect, useState } from "react";
import BurgerMenu from "./BurgerMenu/BurgerMenu";
import useWindowSize from "../../@hooks/useWindowSize.hook";
import useScrollLock from "../../@hooks/useScrollLock.hook";
import { AnimatePresence } from "framer-motion";
import Image from "../../@ui/Image";
import { appUrls, toLink } from "../../appUrls";
import {
  CATEGORY_PARAM,
  SELECTED_DATE_PARAM,
  SERVICE_PARAM,
} from "../../@constants/searchParams";
import dayjs from "dayjs";
import { useServicesContext } from "../../@context/servicesContext";

const Header = () => {
  const [isBurgerMenu, toggleBurgerMenu] = useState(false);
  const { categories, services } = useServicesContext();

  const { width } = useWindowSize();
  const screenWidth = width < 640;
  useScrollLock(isBurgerMenu && screenWidth);

  const toggleMenu = (state: boolean) => {
    toggleBurgerMenu(state);
  };

  useEffect(() => {
    if (!screenWidth) {
      toggleBurgerMenu(false);
    }
  }, [screenWidth, toggleBurgerMenu]);

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
    <header
      data-testid="header"
      className="font-buford z-50 flex w-full justify-between bg-black px-8 py-4 text-3xl text-white"
    >
      <div className="aspect-65/16 h-10">
        <Image src={logo} alt="Logo" />
      </div>
      <nav className="flex items-center gap-8 text-xl">
        {screenWidth ? (
          <button onClick={() => toggleMenu(true)} className="size-10">
            <img src={burgerMenuIcon} alt="Burger menu" loading="lazy" />
          </button>
        ) : (
          menuOptions.map(({ title, to }) => (
            <NavLink
              to={{ pathname: to.pathname, search: to.search }}
              key={title}
              className="tablet:text-2xl text-base"
            >
              {title}
            </NavLink>
          ))
        )}
      </nav>
      <AnimatePresence mode="wait">
        {screenWidth && isBurgerMenu && (
          <BurgerMenu onClickCloseMenu={toggleMenu} />
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
