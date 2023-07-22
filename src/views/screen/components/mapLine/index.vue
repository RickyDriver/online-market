<template>
  <div class="main">
    <div class="title">景区实时客流量</div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
import chinaJSON from './china.json'

let charts = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
  let my_charts = echarts.init(charts.value)
  my_charts.setOption({
    //地图组件
    geo: {
      map: 'china', //中国地图
      roam: true, //鼠标缩放的效果
      //地图的位置调试
      top: 150,

      zoom: 1.6,

      //地图上的文字的设置
      label: {
        show: true, //文字显示出来
        color: 'white',
        fontSize: 14,
      },

      itemStyle: {
        //每一个多边形的样式
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#30cfd0', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#330867', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
        opacity: 0.8,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: '#330867',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    //布局位置
    grid: {
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
    },
    series: [
      {
        type: 'lines', //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.075302], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
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
  flex-flow: column;
}
.title {
  width: 520px;
  height: 50px;
  background-image: url(../../images/map-title-bg.png);
  background-size: cover;
  background-repeat: no-repeat;

  color: #ffffff;
  text-align: center;
  line-height: 50px;
  letter-spacing: 10px;
}
.charts {
  align-self: center;
  width: 100%;
  height: 100%;
}
</style>
