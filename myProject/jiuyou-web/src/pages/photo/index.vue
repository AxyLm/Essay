<template>
	<div style="height: 100vh">
		<DynamicScroller
			:items="photos"
			:min-item-size="30"
			class="scroller"
			key-field="_id"
		>
			<template v-slot="{ item, index, active }">
				<DynamicScrollerItem
					:item="item"
					:active="active"
					:size-dependencies="[item.message]"
					:data-index="index"
				>
					<van-image
                        v-if="item.ext == 'jpg'"
                        class="picture-show"
                        draggable="false"
                        :src="'http://192.168.0.106:9634/?explorer/index/fileOut&path='+item.path+
                        '&type=image&width=250&etag=1625304750&accessToken='+actoken"
                        width="250"
                        height="333"
                        fit="cover"
                    />
                    <div v-else>
                        <span>{{item.name}}</span>
                    </div>
					<div class="text">{{ item._id }}</div>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</div>
</template>
<script>
	import axios from "../../utils/axios";

	export default {
		components: {},
		data() {
			return {
				photos: [],
                actoken: "789fqz4uZ_I59O03W7P2483glyyxCbfh8CLS5EspW5DSDX1dCqegc7CWxBSY58wWXQ-nwhKAMJBBuV3W_w"
			};
		},
		created() {
			axios.get("http://127.0.0.1:8033/travel/mediaList").then((res) => {
				this.photos = res.data;
				console.log(res.data);
			});
		},
	};
</script>
<style scoped>
.scroller {
	height: 100%;
}

.user {
	height: 32%;
	padding: 0 12px;
	display: flex;
	align-items: center;
}
</style>