<template>
  <div class="main">
    <BgTitle :title="'未来七天游客数量趋势图'"></BgTitle>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import BgTitle from '../bgTitle/index.vue'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    //标题组件
    //x|y轴
    xAxis: {
      type: 'category',
      //两侧不留白
      boundaryGap: false,
      //分割线不要
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      //轴线的设置
      axisLine: {
        show: true,
      },
      //刻度
      axisTick: {
        show: true,
      },
    },
    grid: {
      left: 40,
      top: 50,
      right: 20,
      bottom: 20,
    },
    //系列
    series: [
      {
        type: 'line',
        data: [120, 1240, 66, 2299, 321, 890, 1200],
        //平滑曲线的设置
        smooth: true,
        //区域填充样式
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'red', // 0% 处的颜色
              },
              {
                offset: 1,
                color: 'blue', // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  })
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  background-image: url(../../images/dataScreen-main-cb.png);
  background-size: cover;
  background-repeat: no-repeat;
  flex-flow: column nowrap;
}
.charts {
  width: 100%;
  height: calc(100% - 40px);
}
</style>
