//需要一个路由的配置,它是一个数组
import { ReactNode } from "react";
import Media from "../views/media/index";
import Travel from "../views/travel/index";
const routes:ReactNode = [
    {
        path: "/jiuyou/travel",
        component: Media
    },
    {
        path: "/jiuyou/media",
        component: Travel
    }
]

export default routes