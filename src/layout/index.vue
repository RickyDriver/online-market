<style lang="scss" scoped>
.layout-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.layout-tabbar {
  width: 100%;
  height: $tabbar-height;
}
.layout-main {
  width: 100%;
  height: 100vh;
  overflow: auto;
  color: black;
}

.left-col {
  transition: all 0.3s ease;
}
.right-col {
  transition: all 0.3s ease;
}
.layout-sidebar {
  background-color: $base-menu-bgc;
  overflow: hidden;
}
.slidebar-left {
  width: 100%;
  height: calc(100vh - $sidebar-img-size);
  .el-menu {
    background-color: $base-menu-bgc;
    border: none;
    transition: all 0.3s ease;
  }
}
.slidebar-right {
  width: 100%;
  height: calc(100vh - $tabbar-height);
}
</style>
<template>
  <div class="layout-container">
    <el-row>
      <!-- 左侧菜单 -->
      <el-col :span="sidebar_switch" class="left-col">
        <!-- 侧边栏 -->
        <div class="layout-sidebar">
          <!-- logo栏 -->
          <Logo></Logo>
          <!-- 侧边栏滚动组件 -->
          <el-scrollbar class="slidebar-left">
            <el-menu
              background-color="#001529"
              text-color="#ffffff"
              class="el-menu"
              :default-active="$route.path"
              :collapse="setting_store.fold ? true : false"
            >
              <Menu :menu_list="user_store.menu_routes"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
      </el-col>

      <!-- 右侧导航栏及内容 -->
      <el-col :span="tabbar_main_switch" class="right-col">
        <!-- 头部导航栏 -->
        <div class="layout-tabbar">
          <!--layout组件的tabbar -->
          <Tabbar></Tabbar>
        </div>

        <!-- 主要内容 -->
        <div class="layout-main">
          <el-scrollbar class="slidebar-right">
            <Main></Main>
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
// 获取路由对象
import { useRoute } from 'vue-router'

// 引入各个组件
import Menu from './menu/index.vue'
import Logo from './logo/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

// 引入用户数据小仓库
import use_user_store from '@/store/modules/user'

// 引入layout组件状态小仓库
import use_layout_setting_store from '@/store/modules/setting'

let user_store = use_user_store()
let setting_store = use_layout_setting_store()
let $route = useRoute()

const sidebar_switch = computed(function () {
  if (setting_store.fold === true) return 1
  else return 4
})
const tabbar_main_switch = computed(function () {
  if (setting_store.fold === true) return 23
  else return 20
})
</script>

<script lang="ts">
export default {
  name: 'Layout',
}
</script>
