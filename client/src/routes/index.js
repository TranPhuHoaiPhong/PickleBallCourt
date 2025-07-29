import HomePgae from "../pages/User/PickleBallBrand/BrandHomePage/HomePgae";
import CourtPickle from "../pages/User/PickleBallCourt/CourtPickleball/CourtPickleball";
import SearchPage from "../pages/User/PickleBallCourt/SearchPage/SearchPage";
import DetailCourt from "../pages/User/PickleBallCourt/DatailCourt/DetailCourt";
import BookCourt from "../pages/User/PickleBallCourt/BookCourt/BookCourtComponent";
import Register from "../pages/User/Common/Register/Register";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import CourtBookingManager from "../pages/Admin/CourtBookingManager/CourtBookingManager";
import Login from "../pages/User/Common/Login/Login";
import Profile from "../pages/User/Common/Profile/Profile";
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
  {
    path: "/login",
    page: Login,
    isShowHeader: false,
  },
  {
    path: "/profile",
    page: Profile,
    isShowHeader: false,
  },
];
