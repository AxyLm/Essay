<template>

	<div id="app-content">
		<div id="pages">
			<router-view></router-view>
		</div>
		<Tabbar />
	</div>
</template>
<script>
	import Tabbar from "./tabbar.vue";
	import Header from "./header.vue";


	export default {
        components:{
            Tabbar, Header
        }
    }
</script>