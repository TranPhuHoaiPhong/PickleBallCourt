import HomePgae from "../pages/HomePage/HomePgae";
import CourtPickle from "../pages/CourtPickleball/CourtPickleball";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailCourt from "../pages/DatailCourt/DetailCourt";
import BookCourt from "../pages/BookCourt/BookCourtComponent";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import CourtBookingManager from "../pages/Admin/CourtBookingManager/CourtBookingManager";

export const routes = [
  {
    path: "/",
    page: HomePgae,
    isShowHeader: true,
  },
  {
    path: "/court",
    page: CourtPickle,
    isShowHeader: false,
  },
  {
    path: "/searchPage",
    page: SearchPage,
    isShowHeader: false,
  },
  {
    path: "/detailCourt/:id",
    page: DetailCourt,
    isShowHeader: false,
  },
  {
    path: "/bookCourt",
    page: BookCourt,
    isShowHeader: false,
  },
  {
    path: "/register",
    page: Register,
    isShowHeader: false,
  },
  {
    path: "/admin/dashboard",
    page: Dashboard,
    isShowAdminLayout: true,
  },
  {
    path: "/admin/court",
    page: CourtBookingManager,
    isShowAdminLayout: true,
  },
];
