<template>
  <div id="home">
    <a-layout id="components-layout-demo-top" class="layout">
      <a-layout-header class="app_header"></a-layout-header>
      <a-layout-content class="content">
        <a-row :gutter="[10,10]">
          <a-col :span="24">
            <span>系统信息</span>
          </a-col>
          <a-col :span="8" :xs="24" :md="8" :lg="8" class="col-xs">
            <a-card style="width: 100%;height:100px">
              <a-skeleton active :loading='skeleton' :paragraph="{ rows: 2 }" :title='false'>
                <p>版本信息：</p>
                <p>{{system.hr_name}}</p>
              </a-skeleton>
            </a-card>
          </a-col>
          <a-col :span="8" :xs="24" :md="8" :lg="8" class="col-xs">
            <a-card style="width: 100%;height:100px">
              <a-skeleton active :loading='!uptime' :paragraph="{ rows: 2 }" :title='false'>
                <p>运行时间：</p>
                <p>{{uptime}}</p>
              </a-skeleton>
            </a-card>
          </a-col>
          <a-col :span="8" :xs="24" :md="8" :lg="8" class="col-xs">
            <a-card style="width: 100%;height:100px">
              <a-skeleton active :loading='!systemTime' :paragraph="{ rows: 2 }" :title='false'>
                <p>系统时间：</p>
                <p>{{systemTime}}</p>
              </a-skeleton>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="[10,10]">
          <a-col :span="5" :xs="24" :md="12" :lg="12" class="col-xs">
            <a-card title="CPU占用" style="width: 100%;height:100%">
              <a-col style="text-align: center;" :span="10">
                <a-skeleton active avatar :loading='!(cpu&&cpu.total)' :paragraph='false' :title='false' size='large'>
                  <a-progress type="dashboard" :percent="cpu.total" style="margin:auto" />
                  <!-- <span>总使用率</span> -->
                </a-skeleton>
              </a-col>
              <a-col style="text-align: left;" :span="13" :push="1">
                <p>核心数：4</p>
                <div style="display: flex;">
                  <p>user：</p>
                  <a-progress
                    :percent="cpu.user"
                    size="small"
                    status="active"
                    :stroke-color="active(cpu.user)"
                  />
                </div>
                <!-- <div style="display: flex;">
                  <p>system：</p>
                  <a-progress
                    :percent="cpu.system"
                    size="small"
                    status="active"
                    :stroke-color="active(cpu.system)"
                  />
                </div> -->
                <div style="display: flex;">
                  <p>idle：</p>
                  <a-progress
                    :percent="cpu.idle"
                    size="small"
                    status="active"
                    :stroke-color="active(cpu.idle)"
                  />
                </div>
              </a-col>
            </a-card>
          </a-col>
          <a-col :span="5" :xs="24" :md="12" :lg="12" class="col-xs">
            <a-card title="内存使用" style="width: 100%;height:100%">
              <a-col style="text-align: center;height:100%;overflow:hidden" :span="10">
                <!-- <a-skeleton active avatar :loading='!(cpu&&cpu.total)' :paragraph='false' :title='false' size='large'> -->
                  <!-- <a-progress type="dashboard" :percent="mem.percent" style="margin:auto" /> -->
                  <div ref='percent'></div>
                  <!-- <span>总使用率</span> -->
                <!-- </a-skeleton> -->
              </a-col>
              <a-col style="text-align: left;" :span="14" :push="1">
                <a-skeleton active :loading='!mem' :paragraph="{ rows: 2 }" :title='false'>
                  <p>总内存：{{(mem.total / 1024 / 1024 / 1024 ).toFixed(2)}} GB</p>
                  <p>已使用：{{(mem.used / 1024 / 1024 ).toFixed(2)}} MB</p>
                </a-skeleton>
              </a-col>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="[10,10]">
          <a-col :span="8" :xs="24" :lg="12" class="col-xs" style="padding-right: 10px;">
            <span>核心占用</span>
            <m-cpu :percpu="cpu.percpu" />
          </a-col>
          <a-col :span="8" :xs="24" :lg="12" class="col-xs" style="padding-right: 10px;">
            <span>文件使用</span>
            <m-fs :fs-list="fs" />
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer class="app_footer" style="text-align: center"></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { Liquid } from '@antv/g2plot';
import dates from "./date";
import axios from 'axios'
import mCpu from './components/mcpu'
import mFs from './components/mfs'
export default {
  name:'glances_web',
  components: {
    mCpu,mFs
  },
  data() {
    return {
      app_title: "app",
      details: dates,
      cpu: {
        total: 0,
        percpu: [],
      },
      system: {
        os_name: "",
        os_version: "",
        linux_distro: "",
        hostname: "",
        platform: "",
        hr_name: "",
      },
      systemTime: "",
      uptime: "",
      fs: [],
      skeleton: true,
      mem: 0,
      memPerent:''
    };
  },
  computed: {
    active() {
      return function (val) {
        if (val >= 90) {
          return {
            "0%": "#f0362d",
            "100%": "#f0362d",
          };
        }
        if (val >= 50) {
          return {
            "0%": "#fd6833",
            "100%": "#fd6833",
          };
        }
      };
    },
  },
  created() {
    console.log("create");
    this.init();
  },
  mounted() {
    this.initChart()
    setInterval(() => {
      this.init();
    }, 3000);
  },
  methods: {
    initChart(){
      this.memPerent = new Liquid(this.$refs.percent, {
        title: {
          visible: true,
          text: '内存占用',
        },
        statictic:{
          style:{
            fontSize: 12,
          }
        },
        min: 0,
        max: 100,
        value: 10,
      });
      this.memPerent.render()
    },
    init() {
      axios.get("http://gweb.frp.soulfree.cn/api/3/all")
      .then((res) => {
        let data = res.data;
        this.cpu = data.cpu;
        this.system = data.system;
        this.uptime = data.uptime;
        this.details = data;
        this.fs = data.fs;
        this.systemTime = data.now;
        this.mem = data.mem;
        this.skeleton = false;
        this.cpu.percpu = data.quicklook.percpu;
      })
      .catch((err) => {
        console.warn(err);
      });
    
    },
  },
};
</script>

<style lang="css" scoped>
.app_header{
  display: none;
}
.content{
  height: calc(100vh - 50px); 
  padding:0 10px;
  background-color: #fff;
  overflow-y: auto;
  overflow-x: hidden;
}
.app_footer{
  height: 50px;
  padding: 0px 50px;
  line-height: 50px;
}
</style>