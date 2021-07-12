<template>
  <div style="height: 100vh">
		<DynamicScroller
			:items="photos"
			:min-item-size="30"
			class="scroller"
			key-field="id"
		>
			<template v-slot="{ item, index, active }">
				<DynamicScrollerItem
					:item="item"
					:active="active"
					:size-dependencies="[item.id]"
					:data-index="index"
				>
					<van-row>
						<div class="text">{{ item.id }}</div>
					</van-row>
					<van-row >
						<van-col 
							span="8"
							v-for="photo in item.footageList"
							:key="photos.id"
							style="overflow: hidden; height: 200px"
						>
							<img
								v-lazy="photo.url +'?imageMogr2/auto-orient/thumbnail/500x500>/interlace/1/blur/3x0/quality/20'"
								style="object-fit: cover"
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
		name: "Photo",
		components: {},
		data() {
			return {
				photos: [],
				actoken:
					"62efh5W-7vXVEAqlmqC8nkFVa8SzEvDp_of0JWscQ9VDRrxq40ky7Sz7qjQ-1gVnxjNrnt5X6XvB3f8NEA",
			};
		},
		created() {
      axios({
        url:"http://192.168.0.101:8033/lives/list",
        method:"POST",
        data:{
          page:1,
          pageSize:1000,
        }
      }).then((res) => {
				this.photos = res.data;
			});
			// axios.po("http://192.168.0.101:8033/lives/list").then((res) => {
			// 	this.photos = res.data.data;
			// });
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