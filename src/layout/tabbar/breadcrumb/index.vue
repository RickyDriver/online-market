import { Expand } from '@element-plus/icons-vue/dist/types';

<style lang="scss" scoped>
.icon {
    margin-left: 10px;
    margin-right: 10px;
}
</style>

<template>
    <!-- 顶部左侧 -->
    <el-icon class="icon" @click="change_icon">
        <!-- 根据折叠handler控制显示折叠图标还是展开图标 -->
        <component :is="setting_store.fold ? 'Expand' : 'Fold'"></component>
    </el-icon>

    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// 引入layout设置小仓库
import use_layout_setting_store from '@/store/modules/setting'

// 动态变量决定是否折叠
let setting_store = use_layout_setting_store()
console.log(setting_store)

let change_icon = function () {
    setting_store.fold = !setting_store.fold
}
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb',
}
</script>
