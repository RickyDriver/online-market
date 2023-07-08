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
        <el-table-column label="spu名称" prop="spuName"></el-table-column>
        <el-table-column label="spu描述" prop="description"></el-table-column>
        <el-table-column label="spu操作">
          <template v-slot="{ row }">
            <el-button
              type="primary"
              icon="Plus"
              size="small"
              @click="add_sku(row)"
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
              @click="view_sku_list(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Delete"
              size="small"
              @click="delete_spu(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        v-model:current-page="page_num"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
      />
    </el-card>

    <spu_form
      v-show="scene === 1"
      @switch_number="to_page0"
      :reflesh="get_has_spu_list"
    ></spu_form>
    <update_sku
      v-show="scene === 2"
      @cancel="cancel_add_spu"
      @init="init_handler"
    ></update_sku>

    <!-- 展示已有的sku列表界面 -->
    <el-dialog v-model="toggle_dialog">
      <el-table :data="sku_list" :border="true" rowKey="id">
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column label="SKU名字" prop="skuName"></el-table-column>
        <el-table-column label="SKU图片">
          <template v-slot="{ row }">
            <img :src="row.skuDefaultImg" style="width: 100px" />
          </template>
        </el-table-column>
        <el-table-column
          label="SKU价格"
          width="100"
          prop="price"
        ></el-table-column>
        <el-table-column
          label="SKU重量(克)"
          width="100"
          prop="weight"
        ></el-table-column>
      </el-table>
    </el-dialog>
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
import {
  api_get_has_spu_list,
  api_delete_spu,
  api_spu_info,
} from '@/api/product/spu'
// 引入ts数据类型
import type { spu_res_data_data, single_spu_data } from '@/api/product/spu/type'

// 引入新增spu,sku的页面组件
import spu_form from './update_spu.vue'
import update_sku from './update_sku.vue'
import { ElMessage } from 'element-plus'
// 定义切换页面显示的状态码,显示为1则切换到新增spu页面,显示为0返回数据展示页
let scene = ref(0)
// 接受自定义事件
let init_fn
let init_handler = (init) => {
  init_fn = init
}

// 定义自定义事件触发返回0
const to_page0 = (number: number) => {
  scene.value = number
}
// 修改spu事件
const edit_spu = (row: single_spu_data) => {
  scene.value = 1
  spu_store.get_spu_info(row.id as number)
  spu_store.find_spu_has_trmark(row.category3Id as number)
  spu_store.get_sale_attr()
  spu_store.get_trmark()
  spu_store.spu_parmas = row
}
// 添加spu按钮事件
const add_spu = () => {
  scene.value = 1
  spu_store.$reset()
  spu_store.get_sale_attr()
  spu_store.get_trmark()
  // 初始化仓库中的表单值
  spu_store.spu_parmas = {
    category3Id: catagory_store.c3_id,
    description: '',
    spuImageList: [],
    spuName: '',
    spuPosterList: [],
    spuSaleAttrList: [],
  }
  // spu_store.spu_trmark_arr = []
  // spu_store.spu_sale_attr_arr = []
  // spu_store.upload_filelist = []
  // spu_store.spu_img_list = []
}
// 删除spu
const delete_spu = async (row) => {
  let res = await api_delete_spu(row.id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    get_has_spu_list()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 定义分页器的页码
let page_num = ref<number>(1)
let limit = ref<number>(3)
// 获取数据后拿总数
let total = ref<number>(0)
// 封装请求函数
//当仓库中的c3_id发生变化的时候,发送请求拿数据
let spu_data_arr = ref<spu_res_data_data>([] as any)
let get_has_spu_list = async (page?: number) => {
  if (page) page_num.value = page
  let res = await api_get_has_spu_list(
    page_num.value,
    limit.value,
    catagory_store.c3_id,
  )
  spu_data_arr.value = res.data
  total.value = spu_data_arr.value.total
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

// 点击进入新增sku页面
const add_sku = (row) => {
  scene.value = 2
  init_fn(catagory_store.c1_id, catagory_store.c2_id, row)
}
const cancel_add_spu = (num) => {
  scene.value = num
}
// 展示所有的sku页面
// 接受请求的sku
const sku_list = ref()
// 控制是否开关sku列表对话框
let toggle_dialog = ref(false)
const view_sku_list = async (row) => {
  try {
    let res = await api_spu_info(row.id)
    sku_list.value = res.data
    toggle_dialog.value = true
  } catch (err) {
    console.log(err)
  }
}
</script>

<style lang="stylus" scoped></style>
