<template>
    <div>
        <svg :style="{ width, height }">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>
<script setup lang="ts">
defineProps({
    // xlink-herf属性值的前缀
    prefix: {
        type: String,
        default: '#icon-',
    },
    // 提供使用的图标的名字
    name: String,
    color: {
        type: String,
        default: '',
    },
    // 接受父组件传递的图标的宽度
    width: {
        type: String,
        default: '16px',
    },
    height: {
        type: String,
        default: '16px',
    },
})
</script>
