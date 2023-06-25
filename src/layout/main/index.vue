<style scoped>
.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 0.5s;
}
.fade-enter-to {
    opacity: 1;
}
</style>
<template>
    <div style="padding: 20px">
        <router-view v-slot="{ Component }">
            <transition name="fade">
                <component :is="Component" v-if="flag" />
            </transition>
        </router-view>
    </div>
</template>
<script lang="ts">
export default {
    name: 'Main',
}
</script>
<script lang="ts" setup>
import { watch, ref, nextTick } from 'vue'
import use_layout_setting_store from '@/store/modules/setting'
let setting_store = use_layout_setting_store()
// 控制当前组件是否销毁重建
let flag = ref(true)

// 监听仓库内部的数据是否发生变化,如果发生变化,说明用户点击过刷新按钮
watch(
    () => setting_store.refsh,
    () => {
        flag.value = false
        nextTick(() => {
            flag.value = true
        })
    },
)
</script>
