<template>
  <div class="main">
    <BgTitle :title="'年龄比例'"></BgTitle>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import BgTitle from '../bgTitle/index.vue'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()

onMounted(() => {
  //初始化echarts实例
  let mycharts = echarts.init(charts.value)
  //设置配置项
  mycharts.setOption({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: 'center',
      // left: 'center',
      right: 0,
      orient: 'vertical',
      textStyle: {
        color: '#ffffff',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
          color: 'white',
        },

        labelLine: {
          show: false,
        },
        textStyle: {
          color: '#ffffff',
        },
        data: [
          { value: 1048, name: '儿童' },
          { value: 735, name: '青少年' },
          { value: 580, name: '青年' },
          { value: 484, name: '中年' },
          { value: 300, name: '老年' },
        ],
      },
    ],
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;

  background-image: url(../../images/dataScreen-main-lb.png);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column nowrap;
}
.charts {
  width: 100%;
  height: 260px;
}
</style>
