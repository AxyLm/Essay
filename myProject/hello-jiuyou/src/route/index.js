const _import = path => () => import( /* @vite-ignore */ '/src' + path + '.vue')

import Layout from "../layout/index.vue"
import Photo from "../pages/photo/index.vue"
import Travel from "../pages/travel/index.vue"
const router = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        children: [
            {
                path: 'photo',
                name: 'Photo',
                component: Photo
            },
            {
                path: 'travel',
                name: 'Travel',
                component: Travel
            },
        ]
    },
    {
        path: "/err/:type?",
        name: 'errPage',
        component: _import("/pages/errPage/index")
    }
]


export default router