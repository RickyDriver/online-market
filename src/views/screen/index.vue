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
  left: 50%;
  top: 50%;
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
      margin: 0 30px;
      height: 1000px;
      flex: 2;
      // background-color: skyblue;
      .center-top {
        width: 100%;
        height: 60%;
        margin-top: 40px;
        flex: 2;
        // background-color: orange;
      }
      .center-bottom {
        width: 100%;
        height: 40%;
        flex: 1;
        // background-color: pink;
      }
    }
    .right {
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      height: 100%;
      flex: 1;
      .right-top {
        flex: 1.2;
      }
      .right-center {
        flex: 1;
      }
      .right-bottom {
        flex: 1;
      }
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
        <div class="center">
          <MapLine class="center-top"></MapLine>
          <Line class="center-bottom"></Line>
        </div>
        <div class="right">
          <HotPoint class="right-top"></HotPoint>
          <Year class="right-center"></Year>
          <Channel class="right-bottom"></Channel>
        </div>
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
// 引入航线图
import MapLine from './components/mapLine/index.vue'
// 引入折线图
import Line from './components/lines/index.vue'
// 引入热门景区图
import HotPoint from './components/hotPoint/index.vue'
// 引入年度统计图
import Year from './components/year/index.vue'
// 引入渠道统计图
import Channel from './components/channel/index.vue'
const screen = ref()
// 目的是拿到两个比例中较大的一个,按此比例缩放
function get_scale(weight = 1920, height = 1080) {
  const vh_scale = window.innerHeight / height
  const vw_scale = window.innerWidth / weight
  return vw_scale < vh_scale ? vw_scale : vh_scale
}
onMounted(() => {
  screen.value.style.transform = `scale(${get_scale()}) translate(-50%,-50%) `
})
window.onresize = () => {
  screen.value.style.transform = `scale(${get_scale()} translate(-50%,-50%)) `
}
</script>
