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
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" />
        </transition>
    </router-view>
</template>
<script lang="ts">
export default {
    name: 'Main',
}
</script>
