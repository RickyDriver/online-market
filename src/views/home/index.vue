<template>
    <h1>登录成功后一级路由</h1>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import request from '@/utils/request'
import use_user_store from '@/store/modules/user'

let user_store = use_user_store()

onMounted(() => {
    user_store.user_info()
})
</script>
