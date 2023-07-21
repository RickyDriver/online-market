<template>
  <div class="main">
    <div class="title">实时游客统计</div>
    <div class="sum-people">
      <p>
        可预约总量
        <span>999999</span>
        人
      </p>
    </div>

    <div class="number-title">
      <span v-for="(item, index) in number_title" :key="index">{{ item }}</span>
      <span>人</span>
    </div>

    <div class="charts" ref="charts"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
let number_title = ref('216908')

// 引入echarts
import * as echarts from 'echarts'
import 'echarts-liquidfill'

// 初始化echarts
const charts = ref()
onMounted(() => {
  let liquid_fill_charts = echarts.init(charts.value)
  liquid_fill_charts.setOption({
    //x|y轴组件
    xAxis: {},
    yAxis: {},
    //系列:决定你展示什么样的图形图标
    series: {
      type: 'liquidFill', //系列
      data: [0.6], //展示的数据
      waveAnimation: true, //动画
      animationDuration: 3,
      animationDurationUpdate: 0,
      radius: '95%', //半径
      outline: {
        //外层边框颜色设置
        show: true,
        borderDistance: 8,
        itemStyle: {
          // color: '#ffffff',
          borderColor: '#294D99',
          borderWidth: 8,
          shadowBlur: 20,
          shadowColor: 'rgba(0, 0, 0, 0.25)',
        },
      },
      label: {
        formatter: function (parmas) {
          return `预约量${parmas.value * 100}%`
        },
        fontSize: 28,
      },
    },
    label: {
      show: true,
      text: '预约量',
    },
    //布局组件
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
  })
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-flow: column nowrap;

  color: #ffffff;
  background-image: url(../../images/dataScreen-main-lt.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.title {
  font-size: 20px;
  &::after {
    content: '';
    display: block;
    margin-top: 10px;
    width: 50px;
    height: 5px;
    background-image: url(../../images/dataScreen-title.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
}
.sum-people {
  margin-right: 10px;
  align-self: flex-end;
  span {
    font-style: italic;
    color: rgb(255, 129, 0);
  }
}
.number-title {
  align-self: center;
  margin-top: 30px;

  span {
    display: inline-block;
    width: 60px;
    height: 60px;
    background-image: url(../../images/total.png);
    background-size: cover;
    background-repeat: no-repeat;
    color: rgb(109, 181, 210);
    line-height: 60px;
    text-align: center;
    font-weight: 800;
    font-size: 25px;
  }
}

.charts {
  margin-top: 20px;
  align-self: center;
  width: 100%;
  height: 200px;
}
</style>
