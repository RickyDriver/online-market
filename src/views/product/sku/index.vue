<template>
  <div>
    <!-- 表单展示 -->
    <el-card>
      <el-table
        :data="sku_list"
        :border="true"
        rowKey="id"
        style="margin-bottom: 30px"
      >
        <el-table-column
          type="index"
          label="序号"
          width="100"
        ></el-table-column>
        <el-table-column
          label="SKU名字"
          prop="skuName"
          width="300"
        ></el-table-column>
        <el-table-column
          label="SKU描述"
          prop="skuDesc"
          width="300"
        ></el-table-column>
        <el-table-column label="SKU图片" width="150px">
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
          width="150"
          prop="weight"
        ></el-table-column>

        <el-table-column label="操作" width="300" fixed="right">
          <template v-slot="{ row }">
            <el-button
              :type="row.isSale === 1 ? 'info' : 'success'"
              :icon="row.isSale === 1 ? 'Bottom' : 'Top'"
              @click="on_sale(row)"
            ></el-button>
            <el-button
              type="primary"
              icon="Edit"
              @click="edit_handler"
            ></el-button>
            <el-button
              type="info"
              icon="InfoFilled"
              @click="info_handler(row)"
            ></el-button>

            <el-popconfirm
              width="220"
              confirm-button-text="确认"
              cancel-button-text="取消"
              icon="InfoFilled"
              icon-color="#626AEF"
              title="确定删除此项吗?"
              @confirm="delete_sku(row)"
            >
              <template #reference>
                <el-button type="danger" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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

    <!-- 侧边抽提栏 -->
    <el-drawer
      v-model="drawer_switch"
      title="商品的详情"
      direction="rtl"
      show-close
    >
      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8">
          <p>名称</p>
        </el-col>
        <el-col :span="16">
          <p>{{ info_data.skuName }}</p>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8">
          <p>描述</p>
        </el-col>
        <el-col :span="16">
          <p>{{ info_data.skuDesc }}</p>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8">
          <p>平台属性</p>
        </el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in info_data.skuAttrValueList"
            :key="item.id"
            style="margin: 5px"
          >
            {{ item.attrName }}
          </el-tag>
        </el-col>
      </el-row>

      <el-row :gutter="10" style="margin-bottom: 10px">
        <el-col :span="8">
          <p>销售属性</p>
        </el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in info_data.skuSaleAttrValueList"
            :key="item.id"
            style="margin: 5px"
          >
            {{ item.saleAttrName }}
          </el-tag>
        </el-col>
      </el-row>

      <el-carousel
        :interval="800"
        type="card"
        height="200px"
        indicator-position="none"
      >
        <el-carousel-item v-for="item in info_data.skuImageList" :key="item.id">
          <img :src="item.imgUrl" style="width: 100%; height: 100%" />
        </el-carousel-item>
      </el-carousel>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import {
  api_get_sku_list,
  api_sku_on_sale,
  api_sku_cancel_sale,
  api_get_sku_info,
  api_delete_sku,
} from '@/api/product/sku'
import type { single_sku } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue/dist/types'
// 定义分页器的页码
let page_num = ref<number>(1)
let limit = ref<number>(3)
// 获取数据后拿总数
let total = ref<number>(0)
// 封装请求数据函数
const get_has_sku_list = async () => {
  let res = await api_get_sku_list(page_num.value, limit.value)
  if (res.code == 200) {
    sku_list.value = res.data.records
    total.value = res.data.total
  }
}
// 定义展示数据
let sku_list = ref<single_sku[]>([])
onMounted(() => {
  get_has_sku_list()
})
// 监听分页器是否数据变动,更新页面
watch(
  () => page_num.value,
  () => get_has_sku_list(),
)
watch(
  () => limit.value,
  () => get_has_sku_list(),
)
// 上架/下架sku操作
const on_sale = async (row) => {
  if (row.isSale === 0) {
    let res = await api_sku_on_sale(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      get_has_sku_list()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败',
      })
    }
  }
  if (row.isSale === 1) {
    let res = await api_sku_cancel_sale(row.id)
    if (res.code === 200) {
      ElMessage({
        type: 'info',
        message: '下架成功',
      })
      get_has_sku_list()
    } else {
      ElMessage({
        type: 'error',
        message: '操作失败',
      })
    }
  }
}

// 控制sku详情抽屉是否打开
let drawer_switch = ref<boolean>(false)
// 获取展示在抽屉内的数据
const info_data = ref<any>({})
const info_handler = async (row) => {
  let res = await api_get_sku_info(row.id)
  if (res.code === 200) {
    drawer_switch.value = true
    info_data.value = res.data
    console.log(info_data.value)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
}

// 删除单个sku
const delete_sku = async (row) => {
  console.log(row)
  let res = await api_delete_sku(row.id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    get_has_sku_list()
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
}

// 点击编辑按钮事件//TODO未完成
const edit_handler = () => {
  ElMessage({
    type: 'info',
    message: '正在努力更新中,敬请期待!',
  })
}
</script>
<style lang="scss" scoped></style>
