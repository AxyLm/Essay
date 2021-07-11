<template>
    <Tabbar :route="true">
        <Tabbar-item  v-for="item in tabConfig" :icon="item.icon" :to="item.to">{{item.title}}</Tabbar-item>
    </Tabbar>
</template>
<script>
	import { Tabbar, TabbarItem } from "vant";
    export default {
		data() {
			return {
				tabConfig: [
					{
						to: "/photo",
						title: "照片",
						icon: "photo",
					},
                    {
						to: "/travel",
						title: "旅途",
						icon: "like",
					},
				],
			}
		},
        components:{
            Tabbar, TabbarItem
        }
    }

</script>

