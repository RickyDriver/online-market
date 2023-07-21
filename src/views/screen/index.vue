<style lang="scss" scoped>
.bg-container {
  align-content: center;
  width: 100vw;
  height: 100vh;
  background-image: url(./images/bg.png);
  background-size: cover;
  background-repeat: no-repeat;
}
.scale-container {
  position: fixed;
  width: 1920px;
  height: 1080px;
  transform-origin: left top;
  .tabbar {
    width: 100%;
    height: 40px;
  }
  .main {
    width: 100%;
    height: 1040px;
    display: flex;
    .left {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      height: 100%;
      flex: 1;

      .left-top {
        flex: 1.2;
      }
      .left-center {
        flex: 1;
      }
      .left-bottom {
        flex: 1;
      }
    }
    .center {
      height: 100%;
      flex: 2;
      // background-color: skyblue;
    }
    .right {
      height: 100%;
      flex: 1;
      background-color: pink;
    }
  }
}
</style>
<template>
  <div class="bg-container">
    <div class="scale-container" ref="screen">
      <div class="tabbar">
        <Tabbar></Tabbar>
      </div>

      <div class="main">
        <div class="left">
          <LiquildFill class="left-top"></LiquildFill>
          <SexRitio class="left-center"></SexRitio>
          <AgeRitio class="left-bottom"></AgeRitio>
        </div>
        <div class="center"></div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// 引入导航栏组件
import Tabbar from './components/tabbar/index.vue'
// 引入水球图
import LiquildFill from './components/liquildFill/index.vue'
// 引入男女比例图
import SexRitio from './components/sexRitio/index.vue'
// 引入年龄比例图
import AgeRitio from './components/ageRitio/index.vue'
const screen = ref()
// 目的是拿到两个比例中较大的一个,按此比例缩放
function get_scale(weight = 1920, height = 1080) {
  const vh_scale = window.innerHeight / height
  const vw_scale = window.innerWidth / weight
  return vh_scale > vw_scale ? vh_scale : vw_scale
}
onMounted(() => {
  screen.value.style.transform = `scale(${get_scale()}) `
})
window.onresize = () => {
  screen.value.style.transform = `scale(${get_scale()}) `
}
</script>
