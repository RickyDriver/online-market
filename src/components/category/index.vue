<template>
    <!-- 三级选项卡 -->
    <el-card style="margin-bottom: 10px">
        <el-form inline="true">
            <!-- 行内表单样式 -->
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" v-model="catagory_store.c1_id">
                    <el-option
                        v-for="item in catagory_store.c1_arr"
                        :label="item.name"
                        :value="item.id"
                        :key="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="二级分类">
                <el-select placeholder="请选择" v-model="catagory_store.c2_id">
                    <div v-if="catagory_store.c2_arr">
                        <el-option
                            v-for="item in catagory_store.c2_arr"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </div>
                </el-select>
            </el-form-item>

            <el-form-item label="三级分类">
                <el-select placeholder="请选择" v-model="catagory_store.c3_id">
                    <div v-if="catagory_store.c3_arr">
                        <el-option
                            v-for="item in catagory_store.c3_arr"
                            :label="item.name"
                            :value="item.id"
                            :key="item.id"
                        ></el-option>
                    </div>
                </el-select>
            </el-form-item>
            <!-- 行内表单样式结束 -->
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
// 引入生命周期钩子
import { onMounted, ref, watch } from 'vue'
// 引入相关的仓库
import use_catagory_store from '@/store/modules/catagory'
// 使用小仓库
const catagory_store = use_catagory_store()

// 当c1的v-model有值的时候,发送请求拿c2的数据
watch(
    () => catagory_store.c1_id,
    () => {
        catagory_store.c2_id = ''
        catagory_store.getc2()
    },
)
// 当c2的v-model有值的时候,发送请求拿c3的数据
watch(
    () => catagory_store.c2_id,
    () => {
        catagory_store.c3_id = ''
        catagory_store.getc3()
    },
)
// 分类全局组件挂载完毕,通知仓库发请求获取一级分类的数据
onMounted(() => {
    catagory_store.getc1()
})
</script>
