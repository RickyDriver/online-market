<template>
  <div class="title">{{ props.title }}</div>
</template>

<script lang="ts" setup>
let props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.title {
  height: 50px;
  font-size: 20px;
  color: #ffffff;
  &::after {
    content: '';
    display: block;
    margin-top: 10px;
    width: 50px;
    height: 5px;
    background-image: url(../../images/dataScreen-title.png);
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
