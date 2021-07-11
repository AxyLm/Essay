<template>
    <van-empty image="error" description="empty" />
</template>
<script >
import { Empty } from 'vant'
export default {
    components:{
        [Empty.name]:Empty
    }
}
</script>