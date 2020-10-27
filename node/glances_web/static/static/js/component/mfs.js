Vue.component('mFs',{
    template:'#mfs',
    name:'mfs',
    props:{
        fsList:{
            type:Array,
            default:[]
        }
    },
    computed: {
        active() {
            return function(val){
                if(val >= 90){
                    return {
                        '0%': '#f0362d',
                        '100%': '#f0362d',
                    }
                }
                if(val >= 50){
                    return {
                        '0%': '#fd6833',
                        '100%': '#fd6833',
                      }
                }
            }
        }
    },
    created () {
        console.log('fs create');
    },
    data() {
      return {

      }
    },
})
  