<template>
    <div class="countent">
        <div class="echartsClass" ref="echarts"></div>
    </div>
</template>

<script>
import { getLineChartData } from "@/api/homeApi.js";
import * as echarts from 'echarts';
export default {

    mounted() {
        this.getLineChartData()
    },
    methods: {
        // 初始化折线图

        // 获取折线图数据
        getLineChartData() {
            getLineChartData().then(res => {
                let arr = []
                //series的数据
                // 先拿出来所有的name key值，然后遍历，然后创建一个空数组，
                //把每一个name key值都push进去，然后再把每一个key值对应的value值push进去
                //是双重循环 map会映射一个新的数组不会改变原数组
                Object.keys(res.data.data[0]).forEach(item => {
                    arr.push({
                        name: item,
                        type: 'line',
                        data: res.data.data.map(item2 => item2[item])

                    })
                });
                // 随机7个时间有年月日 从大到小排列push进tiem里面
                let time = []
                for (let i = 0; i < 7; i++) {
                    let date = new Date()
                    date.setDate(date.getDate() - i)
                    time.push(date.toLocaleDateString())
                }


                echarts.init(this.$refs.echarts).setOption({  //初始化echarts

                    legend: { data: Object.keys(res.data.data[0]) }, //图例最上面的那个取的第一个对象的所有key值
                    series: arr, //图表的数据
                    xAxis: { data: time.reverse() },//x轴的数据 随机生成的年月日
                    yAxis: {//y轴的数据
                        type: 'value'  //配合series中的data使用
                    },
                    grid: { //图表的位置
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    title: {//图表的标题
                        text: '手机数据'
                    },
                    tooltip: {//鼠标放上去的提示框
                        trigger: 'axis',
                    },
                    toolbox: {//工具栏
                        feature: {
                            saveAsImage: {}//保存为图片
                        }
                    },
                })



            })
        },
    },
}
</script>

<style scoped>
.countent {
    margin-top: 20px;
    width: 100%;
    height: 453px;
}

.echartsClass {
    width: 100%;
    height: 100%;
}
</style>