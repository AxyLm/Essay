//这个文件通过routes配置来编译出路由
import React from 'react'
import { Switch, Route } from "react-router-dom";
export default class CompileRouter extends React.Component {
    constructor() {
        super()
        this.state = {
            c: []
        }
    }
    renderRoute() {
        let { routes } = this.props;//获取routes路由配置
        //1.通过routes生成Route组件
        //确保routes是一个数组
        // console.log(routes)
        //render 不会重复让组件的componentDidMount和componentWillUnmount重复调用
        if (Array.isArray(routes) && routes.length > 0) {
            //确保传入的routes是个数组
           // 循环迭代传入的routes
            let finalRoutes = routes.map(route => {
                //每个route是这个样子的 {path:"xxx",component:"xxx"}
                //如果route有子节点 {path:"xxx",component:"xxx",children:[{path:"xxx"}]}
                return <Route path={route.path} key={route.path} render={
                       // 这么写的作用就是,如果路由还有嵌套路由,那么我们可以把route中的children中的配置数据传递给这个组件,让组件再次调用CompileRouter的时候就能编译出嵌套路由了
                    () => <route.component routes={route.children} />
                } />
            })

            this.setState({
                c: finalRoutes
            })
        } else {
            throw new Error('routes必须是一个数组,并且长度要大于0')
        }
    }
    componentDidMount() {
        //确保首次调用renderRoute计算出Route组件
        this.renderRoute()
    }
    render() {
        let { c } = this.state;
        return (
            <Switch>
                {c}
            </Switch>
        )
    }
}