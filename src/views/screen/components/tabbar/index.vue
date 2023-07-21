<style lang="scss" scoped>
.main-container {
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: center;

  .left {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    flex: 1;
    background-image: url(../../images/dataScreen-header-left-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
    .left-btn {
      width: 135px;
      height: 100%;
      background-image: url(../../images/dataScreen-header-btn-bg-l.png);

      line-height: 40px;
      text-align: center;
      color: rgb(41, 252, 255);

      cursor: pointer;
    }
  }
  .middle {
    height: 74px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    flex: 2;
    background-image: url(../../images/dataScreen-header-center-bg.png);

    line-height: 80px;
    text-align: center;
    color: rgb(41, 252, 255);
    font-size: 30px;
  }
  .right {
    display: flex;
    justify-content: space-between;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    flex: 1;
    background-image: url(../../images/dataScreen-header-right-bg.png);
    line-height: 40px;
    text-align: center;
    color: rgb(41, 252, 255);
    .right-btn {
      width: 135px;
      height: 100%;
      background-image: url(../../images/dataScreen-header-btn-bg-r.png);
    }
    .time {
      justify-self: right;
    }
  }
}
</style>

<template>
  <div class="main-container">
    <div class="left">
      <div class="left-btn" @click="return_home">首页</div>
    </div>
    <div class="middle">
      <h1>智慧旅游可视化大数据平台</h1>
    </div>
    <div class="right">
      <div class="right-btn">统计报告</div>
      <div class="time">当前时间:{{ time }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const $router = useRouter()
// 设置显示时间
let time = ref(dayjs().format('YYYY年M月DD日 HH时MM分s秒'))
function get_time() {
  setInterval(() => {
    const mytime = dayjs().format('YYYY年M月DD日 HH时MM分s秒')
    time.value = mytime
  }, 1000)
}
onMounted(() => {
  get_time()
})

// 返回首页按钮点击事件

const return_home = () => {
  $router.push('/home')
}
</script>
