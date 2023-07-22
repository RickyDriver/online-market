<template>
  <div class="main">
    <BgTitle :title="'热门目的地'"></BgTitle>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import BgTitle from '../bgTitle/index.vue'
import { ref, onMounted } from 'vue'

// 引入echarts
import * as echarts from 'echarts'

// 初始化echarts
let charts = ref()
onMounted(() => {
  let mycharts = echarts.init(charts.value)
  mycharts.setOption({
    //x|y轴组件
    xAxis: {
      show: true,
      type: 'category',
      data: ['北京', '上海', '广州', '深圳', '成都', '重庆', '香港'],
    },
    yAxis: {
      show: true,
    },
    //系列:决定你展示什么样的图形图标
    series: [
      {
        colorBy: 'data',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        label: {
          show: true,
          position: 'insideTop',
        },
      },
      {
        type: 'line',
        data: [120, 200, 150, 80, 70, 110, 130],
      },
    ],

    // 布局组件
    grid: {
      left: 30,
      right: 30,
      top: 50,
      bottom: 20,
    },
  })
})
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  display: flex;
  flex-flow: column nowrap;

  color: #ffffff;
  background-image: url(../../images/dataScreen-main-rt.png);
  background-size: cover;
  background-repeat: no-repeat;
}

.charts {
  margin-top: 20px;
  align-self: center;
  width: 100%;
  height: 200px;
}
</style>
