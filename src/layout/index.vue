<style lang="scss" scoped>
.layout-container {
    width: 100%;
    height: 100vh;
    background-color: pink;
    overflow: hidden;
}
.layout-tabbar {
    width: 100%;
    height: $tabbar-height;
    background-color: var(--el-color-primary-light-5);
}
.layout-main {
    width: 100%;
    height: 100vh;
    background-color: #fff;
    overflow: auto;
    color: black;
}
.scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
}
.layout-sidebar {
    background-color: $base-menu-bgc;
}
.slidebar-left {
    width: 100%;
    height: calc(100vh - $sidebar-img-size);
    .el-menu {
        border: none;
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
            <el-col :span="6">
                <!-- 侧边栏 -->
                <div class="layout-sidebar">
                    <!-- logo栏 -->
                    <Logo></Logo>
                    <!-- 侧边栏滚动组件 -->
                    <el-scrollbar class="slidebar-left">
                        <el-menu
                            background-color="$base-menu-bgc"
                            text-color="white"
                            class="el-menu"
                        >
                            <Menu :menu_list="user_store.menu_routes"></Menu>
                        </el-menu>
                    </el-scrollbar>
                </div>
            </el-col>
            <el-col :span="18">
                <!-- 头部导航栏 -->
                <div class="layout-tabbar">111</div>
                
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
import Menu from './menu/index.vue'
import Logo from './logo/index.vue'
import Main from './main/index.vue'

// 引入用户数据小仓库
import use_user_store from '@/store/modules/user'
let user_store = use_user_store()
</script>
