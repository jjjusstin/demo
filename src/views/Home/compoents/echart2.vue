<template>
    <div class="countent">
        <div class="echartsClass" ref="echartZhuZhuang"></div>
        
    </div>
</template>

<script>
import * as echarts from 'echarts';
import { getZhuzhuangtu } from "@/api/homeApi.js";
export default {
    mounted(){
        this.getZhuzhuangtu()
    },
methods:{

  getZhuzhuangtu(){
    getZhuzhuangtu().then(res=>{
      echarts.init(this.$refs.echartZhuZhuang).setOption(res.data.data)
    })
  }
}
}
</script>

<style scoped>
.countent{
    margin-top: 20px;
    width: 100%;
    height: 453px;
    /* background-color: #ff0000; */
    
}
.echartsClass{
    width: 100%;
    height: 100%;
    /* background-color: #00ff00; */
}
</style>