<template>
  <el-card>
    <el-row :gutter="0">
      <el-col :span="4">
        <el-avatar size="large" :src="user_store.user_avatar_url"></el-avatar>
      </el-col>
      <el-col :span="20">
        <el-text size="large" style="display: block; margin: 10px 0">
          {{ get_time() }}!欢迎回来, {{ user_store.user_name }} 同志
        </el-text>

        <div>
          <el-text tag="i">不要温驯的走入那个良夜</el-text>
        </div>
      </el-col>
    </el-row>
  </el-card>

  <div class="bottom">
    <svg_icon name="welcome" width="500px" height="500px"></svg_icon>
  </div>
</template>

<script setup lang="ts">
import { get_time } from '@/utils/time'
import { onMounted } from 'vue'
import use_user_store from '@/store/modules/user'

let user_store = use_user_store()

onMounted(() => {
  user_store.user_info()
})
</script>

<style lang="scss">
.bottom {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
