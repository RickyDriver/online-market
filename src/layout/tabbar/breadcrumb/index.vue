import { Expand } from '@element-plus/icons-vue/dist/types';

<style lang="scss" scoped>
.icon {
    margin-left: 10px;
    margin-right: 10px;
    cursor: pointer;
}
.icon-title {
    line-height: $tabbar-height;
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
        <!-- 使用路由的match属性来生成面包屑 -->
        <el-breadcrumb-item
            v-for="(item, index) in $route.matched"
            :key="index"
            v-show="item.meta.title"
            :to="item.path"
        >
            <div class="icon-title">
                <el-icon size="10px">
                    <component :is="item.meta.icon"></component>
                </el-icon>
                {{ item.meta.title }}
            </div>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
// 引入layout设置小仓库
import use_layout_setting_store from '@/store/modules/setting'
// 引入路由方法
import { useRoute } from 'vue-router'
let $route = useRoute()
// 动态变量决定是否折叠
let setting_store = use_layout_setting_store()

let change_icon = function () {
    setting_store.fold = !setting_store.fold
}
</script>
<script lang="ts">
export default {
    name: 'Breadcrumb',
}
</script>
