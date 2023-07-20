<template>
  <el-card>
    <el-table :data="menu_data" border rowKey="id" default-expand-all>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            @click="add_menu(row)"
            size="small"
            :disabled="row.level === 4 ? true : false"
          >
            添加菜单
          </el-button>

          <el-button
            type="primary"
            @click="edit_menu(row)"
            size="small"
            :disabled="row.level === 1 ? true : false"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            @click="delete_menu(row)"
            size="small"
            :disabled="row.level === 1 ? true : false"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog
    :title="add_form.id ? '修改菜单' : '新增菜单'"
    width="600px"
    v-model="add_menu_dialog"
  >
    <el-form ref="form" :model="add_form" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input placeholder="请填写名称" v-model="add_form.name"></el-input>
      </el-form-item>

      <el-form-item label="权限" prop="code">
        <el-input placeholder="请填写权限值" v-model="add_form.code"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button size="small" @click="handle_cancel">取消</el-button>
        <el-button size="small" type="primary" @click="handle_ok">
          确定
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import {
  api_get_permission_menu,
  api_add_or_update_menu,
  api_delete_menu,
} from '@/api/acl/menu/index.ts'
import { ElMessage } from 'element-plus'

const menu_data = ref([])
const get_permission_menu = async () => {
  let res = await api_get_permission_menu()
  if (res.code == 200) {
    menu_data.value = res.data
  }
}
onMounted(() => {
  get_permission_menu()
})

// 新增菜单业务
// 初始化携带参数
const add_form = reactive({
  code: '',
  id: null,
  level: 0,
  name: '',
  pid: 0,
})
// 控制弹窗打开/关闭
let add_menu_dialog = ref(false)

// 编辑/添加菜单
const edit_menu = (row) => {
  add_menu_dialog.value = true
  Object.assign(add_form, {
    code: row.code,
    id: row.id,
    level: row.level,
    name: row.name,
    pid: row.pid,
  })
}

const add_menu = (row) => {
  add_menu_dialog.value = true
  Object.assign(add_form, {
    code: '',
    id: null,
    level: row.level + 1,
    name: '',
    pid: row.id,
  })
}

const handle_cancel = () => {
  add_menu_dialog.value = false
}

const handle_ok = async () => {
  let res = await api_add_or_update_menu(add_form)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: add_form.id ? '修改成功' : '添加成功',
    })
    get_permission_menu()
    add_menu_dialog.value = false
  }
}

// 删除菜单
const delete_menu = async (row) => {
  let res = await api_delete_menu(row.id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    get_permission_menu()
  }
}
</script>
