Vue.component('mCpu',{
    template:'#mcpu',
    name:'mcpu',
    props:{
        info:{
            default:1
        },
        percpu:{
            type:Array,
            default:[]
        }
    },
    updated () {
        console.log(this.percpu);
    },
    created () {
        console.log('cpu');
    },
    mounted () {
        console.log(this.percpu);
    },
    data() {
      return {
        cpuInfo: 12,
      }
    },
})
  