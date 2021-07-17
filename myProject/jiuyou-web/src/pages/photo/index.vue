<template>
	<div style="height: 100vh">
		<RecycleScroller
			class="scroller"
			:items="photos"
			:item-size="null"
			key-field="_id"
			v-slot="{ item }"
			style="padding: 0 5px"
		>
			<van-row>
				<div class="text">{{ item._id }}</div>
			</van-row>
			<van-row gutter="5">
				<van-col
					span="8"
					v-for="photo in item.photos"
					:key="photos.id"
					style="margin-bottom: 5px"
				>
					<div
						style="
							background-color: #e3e3e3;
							height: 140px;
							width: 100%;
							border-radius: 3px;
							overflow: hidden;
						"
					>
						<img
							v-lazy="{
								err: 'https://qn.soulfree.cn/mysoulfree/2.png?imageView2/1/w/1200/h/800/interlace/1/q/45',
								loading:
									'https://qn.soulfree.cn/Snipaste_2021-06-27_13-48-51.png?imageView2/1/w/1200/h/800/interlace/1/q/1',
								src:
									'http://192.168.0.106:9634/?explorer/index/fileOut&path=' +
									photo.path +
									'&type=image&width=250&etag=1625304750&accessToken=' +
									actoken,
							}"
							style="
								object-fit: cover;
								max-width: 100%;
								min-height: 100%;
							"
						/>
					</div>
				</van-col>
			</van-row>
		</RecycleScroller>
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
					"0dcbT28C4I0E6z_9qVxbaBci7GqV0aLzy0XHY17OHk9YDoMclTJOHTp7tHgiHEunj_SzRSg7_joXrSecTQ",
			};
		},
		created() {
			axios.get("http://192.168.0.101:8033/kbox/geToken").then((res) => {
				this.actoken = res.data;
			});
			axios({
				url: "http://192.168.0.101:8033/kbox/group",
				method: "GET",
			}).then((res) => {
				var data = res.data.data;
				for (const item of data) {
					item.size = Math.ceil(item.count / 3) * 145 + 18;
				}
				this.photos = data;
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