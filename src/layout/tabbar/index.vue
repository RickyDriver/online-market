<style lang="scss">
.tabbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid;
}
.tabbar-left {
  display: flex;
  align-items: center;
}
.tabbar-right {
  display: flex;
  align-items: center;
  .avatar {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>

<template>
  <div class="tabbar">
    <!-- 顶部左侧 -->
    <div class="tabbar-left">
      <Breadcrumb />
    </div>

    <!-- 顶部右侧 -->
    <div class="tabbar-right">
      <Setting />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<script lang="ts">
export default {
  name: 'Tabbar',
}
</script>
