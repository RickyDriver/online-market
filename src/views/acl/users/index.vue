<template>
  <el-card style="margin-bottom: 30px">
    <el-form label-width="80px" inline>
      <el-form-item label="用户名">
        <el-input
          placeholder="请输入用户名"
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

  <el-card>
    <el-button type="primary" @click="add_account">添加</el-button>
    <el-button type="error" @click="delete_muti_account">批量删除</el-button>
    <el-table
      :data="user_data"
      bordered
      rowKey="id"
      style="margin-bottom: 30px"
      @selection-change="table_selection_handler"
    >
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>

      <el-table-column label="id" width="100" prop="id"></el-table-column>
      <el-table-column
        label="用户名字"
        width="200"
        prop="name"
      ></el-table-column>
      <el-table-column
        label="账号名称"
        width="200"
        prop="username"
      ></el-table-column>
      <el-table-column
        label="用户角色"
        width="200"
        prop="roleName"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        width="200"
        prop="createTime"
      ></el-table-column>
      <el-table-column
        label="更新时间"
        width="200"
        prop="updateTime"
      ></el-table-column>
      <el-table-column label="操作" width="300" fixed="right">
        <template v-slot="{ row }">
          <el-button
            type="primary"
            @click="edit_role(row)"
            icon="User"
            size="small"
          >
            分配角色
          </el-button>
          <el-button
            type="primary"
            @click="edit_account(row)"
            icon="Edit"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            type="primary"
            @click="delete_user(row)"
            icon="Delete"
            size="small"
          >
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

    <!-- 新增账号抽屉菜单 -->
    <el-drawer
      v-model="account_drawer"
      :title="is_add ? '新增用户' : '修改用户'"
    >
      <el-form
        ref="add_form_vc"
        :model="account_form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="name">
          <el-input
            placeholder="请填写用户名"
            :maxLength="20"
            v-model="account_form.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="账户名称" prop="username">
          <el-input
            placeholder="请填写账户名称"
            :maxLength="20"
            v-model="account_form.username"
          ></el-input>
        </el-form-item>

        <el-form-item label="账户密码" prop="password">
          <el-input
            placeholder="请填写账户密码"
            :maxLength="20"
            v-model="account_form.password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="comfirm_add">确认</el-button>
          <el-button type="primary" @click="cancel_add">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 用户角色赋予抽屉 -->
    <el-drawer title="角色管理" v-model="role_darwer">
      <el-form ref="form" :model="role_form" label-width="80px">
        <el-form-item label="用户名称">
          <h1>{{ current_name }}</h1>
        </el-form-item>

        <el-form-item label="用户角色">
          <el-select
            v-model="change_role_parmas.roleIdList"
            multiple
            placeholder="请选择"
            style="width: 240px"
          >
            <el-option
              v-for="item in all_roles_list"
              :key="item.id"
              :value="item.id"
              :label="item.roleName"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="comfirm_edit_role">确认</el-button>
          <el-button type="primary" @click="cancel_edit_role">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive, watch, nextTick } from 'vue'
import {
  api_get_has_user,
  api_update_or_add_user,
  api_delete_selected_user,
  api_delete_user,
  api_get_user_info,
  api_assign_role,
} from '@/api/acl/users'
import { ElMessage } from 'element-plus'
// 定义分页器的页码
let page_num = ref<number>(1)
let limit = ref<number>(3)
// 获取数据后拿总数
let total = ref<number>(0)
// 展示在页面上的数据
const user_data = ref()
const get_has_user = async (parmas?) => {
  let res = await api_get_has_user(page_num.value, limit.value, parmas)
  if (res.code == 200) {
    user_data.value = res.data.records
    total.value = res.data.total
  }
}
onMounted(() => {
  get_has_user()
})

// 监听分页器是否数据变动,更新页面
watch(
  () => ({
    page_num: page_num.value,
    limit: limit.value,
  }),
  () => get_has_user(),
)

// 收集接收框的数据
let search_form = ref('')
const reset_search_form = () => {
  search_form.value = ''
  get_has_user()
}

// 搜索业务
const handle_search = () => {
  page_num.value = 1
  get_has_user(search_form.value)
}

/*

  用户管理抽屉控制部分

*/

// 控制抽屉是否展开
let account_drawer = ref(false)
let is_add = ref(false)
// 新增/编辑 用户表单的实例
const add_form_vc = ref()
// 新增/编辑 用户的表单v-model
let account_form = reactive({
  createTime: '',
  id: 0,
  name: '',
  password: '',
  phone: null,
  roleName: '',
  updateTime: '',
  username: '',
})
// 新增账户的点击事件
const add_account = () => {
  account_drawer.value = true
  is_add.value = true
  add_form_vc.value.resetFields()

  Object.assign(account_form, {
    createTime: '',
    id: 0,
    name: '',
    password: '',
    phone: null,
    roleName: '',
    updateTime: '',
    username: '',
  })
}

// 新增/编辑 用户表单的点击事件
const cancel_add = () => {
  account_drawer.value = false
}
const comfirm_add = async () => {
  await add_form_vc.value.validate()
  let res = await api_update_or_add_user(account_form)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: account_form.id ? '修改成功' : '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: account_form.id ? '修改失败' : '添加失败',
    })
  }
  account_drawer.value = false
  window.location.reload()
}
// 定义表单校验需要的配置对象
const validator_username = (_, value: any, callback: any) => {
  const reg_username = /^\w{5,10}$/
  if (reg_username.test(value)) {
    callback()
  } else {
    callback(new Error('账号长度至少5位,至多10位'))
  }
}

const validator_password = (_, value: any, callback: any) => {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('密码长度至少6位'))
  }
}
// 新增/编辑表单的校验规则
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名!',
      trigger: 'blur',
    },
  ],
  username: [
    { required: true, message: '请输入用户名!', trigger: 'blur' },
    { trigger: 'change', validator: validator_username },
  ],
  password: [
    { required: true, message: '请输入密码!', trigger: 'blur' },
    { trigger: 'change', validator: validator_password },
  ],
}

// 编辑已有账户的点击事件
const edit_account = (row) => {
  Object.assign(account_form, row)
  account_drawer.value = true
  is_add.value = false
}

/*

  用户管理抽屉控制部分结束

*/

/*

  角色管理抽屉控制部分

*/
// 控制抽屉是否打开
const role_darwer = ref(false)

// 初始化修改角色的请求参数
const change_role_parmas = reactive({
  roleIdList: [],
  userId: 0,
})

// 点击编辑按钮,获取角色列表
const all_roles_list = ref([])

const edit_role = async (row) => {
  current_name.value = row.name
  change_role_parmas.userId = row.id
  let res = await api_get_user_info(row.id)
  change_role_parmas.roleIdList = res.data.assignRoles.map((ele) => {
    return ele.id
  })
  all_roles_list.value = res.data.allRolesList
  // 给请求parmas赋值id

  role_darwer.value = true
  console.log(row)
  console.log(res)
}
// 展示当前账号的用户名
let current_name = ref('')

// 确认/取消按钮的点击事件
const comfirm_edit_role = async () => {
  let res = await api_assign_role(change_role_parmas)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '修改成功',
    })
    role_darwer.value = false
    get_has_user()
  } else {
    ElMessage({
      type: 'error',
      message: '修改失败',
    })
  }
}
const cancel_edit_role = () => {
  role_darwer.value = false
}
/*

  角色管理抽屉控制部分结束

*/
// 删除用户
// 单选删除
const delete_user = async (row) => {
  let res = await api_delete_user(row.id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    page_num.value = 1
    get_has_user()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

// 接受多选的数据
let user_id_list = reactive([])

// 处理多选的数据
const table_selection_handler = (data) => {
  const new_data = data.reduce((prev, current) => {
    prev.push(current.id)
    return prev
  }, [])
  user_id_list = new_data
  console.log(user_id_list)
}

const delete_muti_account = async () => {
  let res = await api_delete_selected_user(user_id_list)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    page_num.value = 1
    get_has_user()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style lang="stylus" scoped></style>
