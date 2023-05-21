<style scoped lang="scss">
div {
    background-color: skyblue;

}
</style>
<template>
    <div>
        <h1>svg测试</h1>
        <svg_icon name="phone"></svg_icon>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {req_login} from '@/api/user/index'
onMounted(() => {
    req_login({username:'admin',password:'111111'})
})
</script>
