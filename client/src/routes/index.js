<<<<<<< HEAD
import HomePgae from "../pages/HomePage/HomePgae"
import CourtPickle from "../pages/CourtPickleball/CourtPickleball"
import SearchPage from "../pages/SearchPage/SearchPage"
import DetailCourt from "../pages/DatailCourt/DetailCourt"
import BookCourt from "../pages/BookCourt/BookCourtComponent"
import Register from "../pages/Register/Register"

export const routes = [
    { 
        path: '/', 
        page: HomePgae,
        isShowHeader: true
    }, 
    { 
        path: '/court', 
        page: CourtPickle,
        isShowHeader: false
    },
    { 
        path: '/searchPage', 
        page: SearchPage,
        isShowHeader: false
    },
    {
        path: '/detailCourt/:id', 
        page: DetailCourt,
        isShowHeader: false
    },
    {
        path: '/bookCourt', 
        page: BookCourt,
        isShowHeader: false
    },
    {
        path: '/register', 
        page: Register,
        isShowHeader: false
    }

]
=======
import HomePgae from "../pages/HomePage/HomePgae";
import CourtPickle from "../pages/CourtPickleball/CourtPickleball";
import SearchPage from "../pages/SearchPage/SearchPage";
import DetailCourt from "../pages/DatailCourt/DetailCourt";
import BookCourt from "../pages/BookCourt/BookCourtComponent";
import DashboardAdmin from "../pages/Admin/Dashboard/Dashboard";
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
    path: "/admin/dashboard",
    page: DashboardAdmin,
    isShowAdminLayout: true,
  },
  {
    path: "/admin/court",
    page: CourtBookingManager,
    isShowAdminLayout: true,
  },
];
>>>>>>> c9e3a9c6f8da4068edab193713f7e7fa3db0dd98
