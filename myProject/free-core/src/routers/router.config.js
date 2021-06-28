//需要一个路由的配置,它是一个数组
import Page404 from "../views/pages/index.jsx"
import ChatHome from "../views/chatHome"
import Home from "../views/motion"
import { Redirect } from "react-router"
import React from "react"
import { routeLoadable } from "./route-loadable.js"
const routes = [
    {
        path: "/chatHome",
        component: ChatHome
    },
    {
        path: "/404",
        component: Page404
    },
    {
        path: "/",
        component: Home
    },
    {
        path: "*",
        component: function () {
            return (<Redirect to={{ pathname: '/404' }}></Redirect>)
        }
    }
]

export default routes