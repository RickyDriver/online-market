<template>
  <!-- 搜索框卡片 -->
  <el-card style="margin-bottom: 30px">
    <el-form label-width="80px" inline>
      <el-form-item label="角色名称">
        <el-input
          placeholder="角色名称"
          :maxLength="20"
          v-model="search_form"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handle_search">搜索</el-button>
        <el-button type="primary" @click="reset_search_form">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!-- 表格卡片 -->
  <el-card>
    <el-button type="primary" @click="add_role" icon="Plus">添加角色</el-button>
    <el-table :data="role_data" border rowKey="id" style="margin: 30px 0">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="id" prop="id" width="150"></el-table-column>
      <el-table-column
        label="角色名称"
        prop="roleName"
        width="150"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="createTime"
        width="200"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        prop="updateTime"
        width="200"
      ></el-table-column>

      <el-table-column label="操作" fixed="right" width="300">
        <template v-slot="{ row }">
          <el-button type="primary" @click="" icon="User" size="small">
            分配权限
          </el-button>
          <el-button
            type="primary"
            @click="edit_role(row)"
            icon="Edit"
            size="small"
          >
            编辑
          </el-button>
          <el-button type="primary" @click="" icon="Delete" size="small">
            删除
          </el-button>
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

  <el-dialog
    :title="is_edit ? '修改角色' : '添加角色'"
    width="600px"
    v-model="dialog"
    @close="handle_cancel"
  >
    <el-form label-width="80px">
      <el-form-item label="角色名称">
        <el-input
          placeholder="请填写角色名称"
          :maxLength="20"
          v-model="input_role.roleName"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handle_cancel">取消</el-button>
        <el-button type="primary" @click="handle_add_role">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue'
import { api_get_has_role, api_add_or_edit_role } from '@/api/acl/roles'
import { ElMessage } from 'element-plus'
// 分页器相关
// 定义分页器的页码
let page_num = ref<number>(1)
let limit = ref<number>(3)
// 获取数据后拿总数
let total = ref<number>(0)

// 封装获取数据的函数
const role_data = ref()
const get_has_role = async (parmas?) => {
  let res = await api_get_has_role(page_num.value, limit.value, parmas)
  if (res.code == 200) {
    role_data.value = res.data.records
    total.value = res.data.total
  }
}
onMounted(() => {
  get_has_role()
})

// 监听分页器是否数据变动,更新页面
watch(
  () => ({
    page_num: page_num.value,
    limit: limit.value,
  }),
  () => get_has_role(),
)

// 添加角色
// 获取已输入的角色名称
let input_role = reactive({
  id: 0,
  roleName: '',
})
// 控制添加角色输入框是否打开
let dialog = ref(false)

// 定义标题显示的内容
let is_edit = ref(false)
const add_role = () => {
  is_edit.value = false
  dialog.value = true
  Object.assign(input_role, {
    id: 0,
    roleName: '',
  })
}
const edit_role = (row) => {
  console.log(row)
  is_edit.value = true
  dialog.value = true
  Object.assign(input_role, {
    id: row.id,
    roleName: row.roleName,
  })
}
// 确认/取消按钮的点击事件
const handle_cancel = () => {
  dialog.value = false
}

const handle_add_role = async () => {
  let res = await api_add_or_edit_role(input_role)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: input_role.id ? '修改成功' : '新增成功',
    })
    input_role.id ? '' : (page_num.value = 1)
    get_has_role()
    dialog.value = false
  } else {
    ElMessage({
      type: 'error',
      message: input_role.id ? '修改失败' : '新增失败',
    })
  }
}

// 搜索已有的用户名
let search_form = ref('')
const handle_search = () => {
  get_has_role(search_form.value)
}
const reset_search_form = () => {
  search_form.value = ''
  page_num.value = 1
  get_has_role()
}
</script>
