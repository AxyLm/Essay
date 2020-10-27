new Vue({
  el: '#app',
  name: 'glancesWeb',
  components: {
    mcpu,
  },
  data() {
    return {
      app_title:'app',
      details:dates,
      cpu:{
        total:0,
        percpu:[]
      },
      system:{
        "os_name": "",
        "os_version": "",
        "linux_distro": "",
        "hostname": "",
        "platform": "",
        "hr_name": ""
      },
      systemTime:'',
      uptime:'',
      fs:[],
      skeleton:true,
      mem:0,
    }
  },
  computed: {
    active() {
      return function (val) {
        if (val >= 90) {
          return {
            '0%': '#f0362d',
            '100%': '#f0362d',
          }
        }
        if (val >= 50) {
          return {
            '0%': '#fd6833',
            '100%': '#fd6833',
          }
        }
      }
    }
  },
  created () {
    console.log('create')
    this.init();
  },
  mounted () {
    setInterval(()=>{
      this.init()
    },3000)
  },
  methods: {
    init() {
      axios.get('http://gweb.frp.soulfree.cn/api/3/all')
      .then((res)=>{
        let data = res.data
        this.cpu = data.cpu
        this.system = data.system
        this.uptime = data.uptime
        this.details = data
        this.fs = data.fs
        this.systemTime = data.now
        this.mem = data.mem
        this.skeleton = false
        this.cpu.percpu = data.quicklook.percpu
      })
      .catch((err)=>{
        console.warn(err)
      })
    }
  },
})
