<style scoped>
* {
    color: white;
}
</style>
<template>
    <!-- <p>{{ props }}</p> -->
    <template v-for="item in props.menu_list" :key="item.path">
        <!-- 先将所有的父级路由渲染出来 -->
        <template v-if="!item.children">
            <el-menu-item
                v-if="!item.meta.hidden"
                path="item.path"
                :index="item.path"
                @click="go_route"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>

                    <span>{{ item.meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 如果有子路由且子路由的数量只有一个,那直接用item展示而不是折叠 -->
        <template v-if="item.children && item.children.length == 1">
            <el-menu-item
                v-if="!item.children[0].meta.hidden"
                :index="item.children[0].path"
                @click="go_route"
            >
                <template #title>
                    <el-icon>
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <span>{{ item.children[0].meta.title }}</span>
                </template>
            </el-menu-item>
        </template>

        <!-- 如果有子路由,且子路由的数量大于1个 -->

        <el-sub-menu
            v-if="item.children && item.children.length > 1"
            :index="item.path"
        >
            <template #title>
                <el-icon>
                    <component :is="item.meta.icon"></component>
                </el-icon>

                <span>{{ item.meta.title }}</span>
            </template>
            <Menu :menu_list="item.children"></Menu>
        </el-sub-menu>
    </template>
</template>

<script lang="ts" setup>
// 引入路由器
import { useRouter } from 'vue-router'

const $router = useRouter()
let props = defineProps(['menu_list'])
// 点击菜单的回调
const go_route = function (vc: any) {
    console.log(vc.index)
    $router.push(vc.index)
}
</script>
<script lang="ts">
export default {
    name: 'Menu',
}
</script>
