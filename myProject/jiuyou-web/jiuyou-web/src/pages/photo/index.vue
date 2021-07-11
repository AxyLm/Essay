<template>
    <van-row>
          <RecycleScroller
            class="scroller"
            :items="state.photos"
            :item-size="32"
            key-field="id"
            v-slot="{ item }"
        >
            <div class="user">
                <van-col span="6">{{ item._id }} </van-col>
            </div>
        </RecycleScroller>
    </van-row>
</template>
<script>
import Vue,{ reactive, onMounted } from 'vue'
import  axios from "../../utils/axios";



export default {
    components: {  },
    setup() {
        const state = reactive({
            photos:[]
        })

        const onLoad = function(){
            axios.get("http://127.0.0.1:8033/travel/mediaList").then(res=>{
                state.photos = res.data
                console.log(res.data);
            })
        }
        onMounted(onLoad)
        return {
            state,
            onLoad
        }
    },
    
}
</script>