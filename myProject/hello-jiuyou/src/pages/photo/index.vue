<template>
	<div style="height: 100vh">
		<DynamicScroller
			:items="photos"
			:min-item-size="30"
			class="scroller"
			key-field="_id" >
			<template v-slot="{ item, index, active }">
				<DynamicScrollerItem
					:item="item"
					:active="active"
					:size-dependencies="[
						item.count
					]"
					:data-index="index" >
					<van-row>
						<div class="text">{{ item._id }}</div>
					</van-row>
					<van-row :style="{height:Math.ceil(item.count / 3) * 100 +'px'}">
						<van-col span="8" v-for="photo in item.photos" :key="photos.id" style="overflow:hidden;height:100px;">
							<img
								v-lazy="'http://cloud.soulfree.cn/?explorer/index/fileOut&path='+photo.path+ '&type=image&width=250&etag=1625304750&accessToken='+actoken"
								style="object-fit:cover;"
								v-if="photo.ext == 'jpg'"
							/>
						</van-col>
					</van-row>
				</DynamicScrollerItem>
			</template>
		</DynamicScroller>
	</div>
</template>
<script>
	import axios from "@/utils/axios";

	export default {
    name:"Photo",
		components: {},
		data() {
			return {
				photos: [],
        		actoken: "62efh5W-7vXVEAqlmqC8nkFVa8SzEvDp_of0JWscQ9VDRrxq40ky7Sz7qjQ-1gVnxjNrnt5X6XvB3f8NEA"
			};
		},
		created() {
			axios.get("http://127.0.0.1:8033/kbox/group").then((res) => {
				this.photos = res.data.data;
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