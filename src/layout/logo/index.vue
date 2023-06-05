<style scoped lang="scss">
.logo {
    justify-content: center;
    align-items: center;
    color: var(--el-color-primary-light-9);
    background-color: $base-menu-bgc;
    P {
        margin-left: 10px;
        white-space: nowrap;
    }
}
.img {
    width: $sidebar-img-size;
    height: $sidebar-img-size;
    transition: none;
}
</style>
<template>
    <el-container class="logo" v-if="setting.logo_active">
        <img :src="setting.logo" alt="" class="img">
        <!-- 菜单标题在菜单收起时不展示 -->
        <p v-if="!setting_store.fold">{{ setting.title }}</p>
    </el-container>
    <div class="logo"></div>
</template>
<script setup lang="ts">
// 引入设置
import setting from '@/setting'
// 引入layout设置小仓库
import use_layout_setting_store from '@/store/modules/setting'


</script>
<script lang="ts">
export default {
    name: 'Logo',
}
// 定义logo元素随菜单折叠
let setting_store = use_layout_setting_store()
</script>
