export const adminOptions = [
  {
    accessLevel: 2,
    pageSrc: "/admin/servicesManagement",
    mainImage: "/warsztat_pieknych_wlosow/img/admin/ServiceChanged.svg",
    supImage: "/warsztat_pieknych_wlosow/img/admin/gear.svg",
    supAnimation: {
      initial: { rotate: 0 },
      exit: { rotate: 0 },
      hover: { rotate: [0, 270, 180, 360] },
    },
    optionName: "Zarządzanie usługami",
    optionTitle:
      "Dodawaj nowe, zmieniaj potrebne Ci właściwości oraz usuwaj zbędne",
  },
  {
    accessLevel: 2,
    pageSrc: "/admin/bookingManagement",
    mainImage: "/warsztat_pieknych_wlosow/img/admin/BookingManagement.svg",
    supImage: "/warsztat_pieknych_wlosow/img/admin/pen.svg",
    supAnimation: {
      initial: { x: 0 },
      exit: { x: 0 },
      hover: { x: [0, 20, -20, 10, 15, 0], y: [0, -10, 20, 10, 22, 0] },
    },
    optionName: "Zarządzanie wizytami",
    optionTitle:
      "Kontroluj umowione wizyty: potwierdzaj, odwołuj albo po prostu prypomnij o niej siebie",
  },

  {
    accessLevel: 1,
    pageSrc: "/admin/mastersManagement",
    mainImage: "/warsztat_pieknych_wlosow/img/admin/MastersManagement.svg",
    supImage: "/warsztat_pieknych_wlosow/img/admin/loop.svg",
    supAnimation: {
      initial: { x: 0 },
      exit: { x: 0 },
      hover: { x: [0, 30, -80, 40, -20, 0], y: [0, -10, 20, 10, 22, 0] },
    },
    optionName: "Zarządzanie mistrzami",
    optionTitle:
      "Zarządzaj obecnymi mistrzami, pracującymi u Ciebie na pokładzie",
  },
];
