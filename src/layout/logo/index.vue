<style scoped lang="scss">
.logo {
    justify-content: center;
    align-items: center;

    color: var(--el-color-primary-light-9);

    background-color: $base-menu-bgc;
    P {
        margin-left: 10px;
    }
}
.img {
    width: $sidebar-img-size;
    height: $sidebar-img-size;
}
</style>
<template>
    <el-container class="logo" v-if="setting.logo_active">
        <el-image class="img" :src="setting.logo" :fit="fits[1]" />
        <p>{{ setting.title }}</p>
    </el-container>
    <div class="logo"></div>
</template>
<script setup lang="ts">
// 引入设置
import setting from '@/setting'
// 定义logo图片的排列方式和链接
const fits = ['fill', 'contain', 'cover', 'none', 'scale-down']
</script>
