import HomePgae from "../pages/HomePage/HomePgae"
import CourtPickle from "../pages/CourtPickleball/CourtPickleball"
import SearchPage from "../pages/SearchPage/SearchPage"

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

]
