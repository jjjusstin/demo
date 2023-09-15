<template>
    <div class="countent">
        <div class="echartsClass" ref="echartBing"></div>
        
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    mounted(){
        this.initCharts()
    },
methods:{
    // echarts函数
    initCharts(){
      // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(this.$refs.echartBing)
    // 绘制图表
    myChart.setOption({
  title: {
    text: '手机数据',
    subtext: '对比数据',
    left: 'left',
    textStyle: {
      color: '#333',  // 标题文本颜色
      fontSize: 28,   // 标题字号
      fontWeight: 'bold'  // 标题字体粗细
    },
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'right'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: '小米' },
        { value: 735, name: '三星' },
        { value: 580, name: '魅族' },
        { value: 484, name: '苹果' },
        { value: 300, name: 'oppo' },
        { value: 800, name: 'vivo' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
});
    },
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