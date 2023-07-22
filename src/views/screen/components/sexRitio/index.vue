<template>
  <div class="main">
    <BgTitle :title="'男女比例'"></BgTitle>

    <div class="sex-icon">
      <div class="male">
        <div>
          <img src="../../images/man.png" alt="" />
        </div>
      </div>
      <div class="female">
        <div>
          <img src="../../images/woman.png" alt="" />
        </div>
      </div>
    </div>
    <div class="rate">
      <span>男生:58%</span>
      <span>女生:42%</span>
    </div>
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import BgTitle from '../bgTitle/index.vue'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

let charts = ref()

onMounted(() => {
  let bar_chart = echarts.init(charts.value)
  bar_chart.setOption({
    xAxis: {
      min: 0,
      max: 100,
      show: false,
    },
    yAxis: {
      type: 'category',
      show: false,
    },
    series: [
      {
        data: [58],
        type: 'bar',
        barWidth: 20,
        z: 100,
        itemStyle: {
          color: 'rgb(0, 122, 254)',
          borderRadius: 20,
        },
      },
      {
        data: [100],
        type: 'bar',
        barWidth: 20,
        //调整女士柱条位置
        barGap: '-100%',
        itemStyle: {
          color: 'rgb(255, 75, 122)',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 50,
      top: 0,
      right: 50,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.main {
  margin-top: 30px;
  background-image: url(../../images/dataScreen-main-lc.png);
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  flex-flow: column nowrap;
}
.sex-icon {
  display: flex;
  justify-content: space-around;
  height: 40%;

  margin-top: 20px;
  .male,
  .female {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 111px;
    height: 116px;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .male {
    background-image: url(../../images/man-bg.png);
  }
  .female {
    background-image: url(../../images/woman-bg.png);
  }
}
.charts {
  width: 100%;
  height: 50px;
}
.rate {
  display: flex;
  color: white;
  justify-content: space-around;
  span {
    display: inline-block;
  }
}
</style>
