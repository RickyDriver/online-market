import { Expand } from '@element-plus/icons-vue/dist/types';

<style lang="scss" scoped></style>

<template>
    <!-- 顶部右侧 -->
    <!-- 右侧按钮-->
    <el-button
        size="small"
        icon="Refresh"
        :circle="true"
        @click="update_refsh"
    ></el-button>
    <el-button
        size="small"
        icon="FullScreen"
        :circle="true"
        @click="full_screen"
    ></el-button>
    <el-button size="small" icon="Setting" :circle="true"></el-button>
    <el-avatar
        size="small"
        :src="user_store.user_avatar_url"
        class="avatar"
    ></el-avatar>

    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ user_store.user_name }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
export default {
    name: 'Setting',
}
</script>
<script lang="ts" setup>
// 获取骨架的小仓库
import use_layout_setting_store from '@/store/modules/setting'
// 获取用户相应的数据,应用到用户头像和名称
import use_user_store from '@/store/modules/user'
// 引入路由方法
import { useRoute, useRouter } from 'vue-router'
// 引入清除token方法
// import { REMOVE_TOKEN } from '@/utils/token'

let user_store = use_user_store()
let setting_store = use_layout_setting_store()
let $router = useRouter()
let $route = useRoute()

// 刷新按钮的方法
const update_refsh = () => {
    setting_store.refsh = !setting_store.refsh
}

// 全屏按钮的方法
const full_screen = () => {
    let full = document.fullscreenElement
    if (!full) {
        // 利用文档的根节点的方法,实现全屏模式
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}
// 退出登录按钮的方法
const logout = async () => {
    await user_store.user_logout()
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>
