import { Expand } from '@element-plus/icons-vue/dist/types';

<style lang="scss" scoped></style>

<template>
    <!-- 顶部右侧 -->
    <!-- 右侧按钮-->
    <el-button size="small" icon="Refresh" circle="true"></el-button>
    <el-button size="small" icon="FullScreen" circle="true"></el-button>
    <el-button size="small" icon="Setting" circle="true"></el-button>
    <el-avatar
        size="small"
        src="../../../public/logo.jpg"
        class="avatar"
    ></el-avatar>

    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            Admin
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
<script lang="ts">
export default {
    name: 'Setting',
}
</script>
