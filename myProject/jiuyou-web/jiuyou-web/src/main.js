import Vue,{ createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import routers from "./route";
import { Button,Image as VanImage, Col, Row } from 'vant';
import VueVirtualScroller from 'vue-virtual-scroller'


const app = createApp(App)


app.use(VueVirtualScroller)
app.use(Button);
app.use(VanImage);
app.use(Col);
app.use(Row);

app.use(createRouter({
    history: createWebHistory(),
    routes:routers
}))


app.mount('#app')
