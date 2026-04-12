import { createBrowserRouter } from "react-router";
import Main from "./components/Main/Main";
import Admin from "./components/Admin/Admin";
import Masters from "./components/Masters/Masters";
import Master from "./components/Masters/Master/Master";
import EmptyPage from "./components/EmptyPage/EmptyPage";
import Contact from "./components/Contact/Contact";
import Booking from "./components/Booking/Booking";
import Services from "./components/Services/Services";
import App from "./App";
import AdminPanel from "./components/Admin/AdminPanel/AdminPanel";
import ServiceManagement from "./components/Admin/AdminPanel/ServiceManagement/ServiceManagement";
import BookingManagement from "./components/Admin/AdminPanel/BookingManagement/BookingManagement";
import { appUrls } from "./appUrls";
import MastersManagement from "./components/Admin/AdminPanel/MastersManagement/MastersManagement";

export const router = createBrowserRouter(
  [
    {
      path: appUrls.ROOT,

      Component: App,
      children: [
        { index: true, Component: Main },
        {
          path: appUrls.ADMIN,
          Component: Admin,
          children: [
            { path: appUrls.ADMIN_PANEL, Component: AdminPanel },
            { path: appUrls.ADMIN_SERVICE, Component: ServiceManagement },
            { path: appUrls.ADMIN_BOOKING, Component: BookingManagement },
            { path: appUrls.ADMIN_MASTERS, Component: MastersManagement },
          ],
        },
        { path: appUrls.MASTERS, Component: Masters },
        { path: appUrls.MASTER_INFO, Component: Master },
        { path: appUrls.SERVICES, Component: Services },
        { path: appUrls.BOOKING, Component: Booking },
        { path: appUrls.CONTACT, Component: Contact },
        { path: "*", Component: EmptyPage },
      ],
    },
  ],
  {
    basename: "/warsztat_pieknych_wlosow/",
  },
);
