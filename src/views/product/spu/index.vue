<template>
    <div>
        <!-- 场景切换业务:to_page1是去修改spu页面,to_page0是返回数据展示页 -->
        <catagory :scene="scene"></catagory>
        <el-card v-show="scene === 0">
            <el-button
                type="primary"
                icon="Plus"
                :disabled="!catagory_store.c3_id"
                @click="add_spu"
            >
                添加SPU
            </el-button>
            <!-- spu列表展示页 -->
            <el-table
                :border="true"
                style="margin: 10px 0"
                :data="spu_data_arr.records"
            >
                <el-table-column
                    label="序号"
                    width="100"
                    type="index"
                ></el-table-column>
                <el-table-column
                    label="spu名称"
                    prop="spuName"
                ></el-table-column>
                <el-table-column
                    label="spu描述"
                    prop="description"
                ></el-table-column>
                <el-table-column label="spu操作">
                    <template v-slot="{ row, $index }">
                        <el-button
                            type="primary"
                            icon="Plus"
                            size="small"
                        ></el-button>
                        <el-button
                            type="primary"
                            icon="Edit"
                            size="small"
                            @click="edit_spu(row)"
                        ></el-button>
                        <el-button
                            type="primary"
                            icon="View"
                            size="small"
                        ></el-button>
                        <el-button
                            type="primary"
                            icon="Delete"
                            size="small"
                        ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination
                v-model:current-page="page_num"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]"
                background="true"
                layout="prev, pager, next, jumper,->,sizes,total"
                :total="total"
            />
        </el-card>

        <spu_form v-show="scene === 1" @switch_number="to_page0"></spu_form>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
// 引入多选框组件
import catagory from '@/components/category/index.vue'
// 引入属性管理仓库
import use_catagory_store from '@/store/modules/catagory'
const catagory_store = use_catagory_store()
// 引入spu仓库
import use_spu_store from '@/store/modules/spu'
const spu_store = use_spu_store()
// 引入api接口
import { api_get_has_spu_list } from '@/api/product/spu'
// 引入ts数据类型
import type { spu_res_data_data, single_spu_data } from '@/api/product/spu/type'

// 引入新增spu,sku的页面组件
import spu_form from './update_spu.vue'
// 定义切换页面显示的状态码,显示为1则切换到新增spu页面,显示为0返回数据展示页
let scene = ref(0)
// 定义自定义事件触发返回0
const to_page0 = (number: number) => {
    scene.value = number
}
// 修改spu事件
const edit_spu = async (row: single_spu_data) => {
    scene.value = 1
    spu_store.get_spu_info(row.id)
    spu_store.find_spu_has_trmark(row.category3Id)
    spu_store.spu_parmas = row
}

const add_spu = () => (scene.value = 1)

// 定义分页器的页码
let page_num = ref<number>(1)
let limit = ref<number>(3)
// 获取数据后拿总数
let total = ref<number>(0)
// 封装请求函数
//当仓库中的c3_id发生变化的时候,发送请求拿数据
let spu_data_arr = ref<spu_res_data_data>([] as any)
let get_has_spu_list = async () => {
    let res = await api_get_has_spu_list(
        page_num.value,
        limit.value,
        catagory_store.c3_id,
    )
    spu_data_arr.value = res.data
    total.value = spu_data_arr.value.total
    console.log(spu_data_arr.value)
}
// 一进入页面,就发一次请求初始化页面
onMounted(() => {
    if (catagory_store.c3_id) {
        return get_has_spu_list()
    }
})
// 监听仓库内的c3_id是否有变化,有就发请求拿数据
watch(
    () => catagory_store.c3_id,
    () => {
        if (!catagory_store.c3_id) {
            spu_data_arr.value.records.length = 0
            total.value = 0
            return
        } else return get_has_spu_list()
    },
)
watch(
    () => page_num.value,
    () => get_has_spu_list(),
)
watch(
    () => limit.value,
    () => get_has_spu_list(),
)
</script>

<style lang="stylus" scoped></style>
