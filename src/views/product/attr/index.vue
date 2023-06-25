<template>
    <div>
        <category :scene="scene"></category>
        <!-- 选择性展示,要不就是数据展示页面,要不就是新增属性页面-->

        <el-card>
            <!-- 数据展示页面 -->
            <div v-if="scene === 0">
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="btn_disable()"
                    @click="add_attr"
                >
                    添加平台属性
                </el-button>
                <el-table
                    :border="true"
                    style="margin: 10px 0px"
                    :data="catagory_store.attr_list"
                >
                    <el-table-column
                        label="序号"
                        prop="id"
                        type="index"
                        align="center"
                        width="100px"
                    ></el-table-column>

                    <el-table-column
                        label="属性名称"
                        prop="attrName"
                    ></el-table-column>

                    <el-table-column label="属性值名称">
                        <template v-slot="{ row }">
                            <el-tag
                                v-for="item in row.attrValueList"
                                :key="item.id"
                                style="margin: 5px"
                            >
                                {{ item.valueName }}
                            </el-tag>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" width="200px">
                        <template v-slot="{ row }">
                            <!-- 修改已有属性的按钮 -->
                            <el-button
                                type="primary"
                                size="small"
                                icon="Edit"
                                @click="update_attr(row)"
                            >
                                修改
                            </el-button>
                            <el-popconfirm
                                title="你确认要删除此项吗?"
                                @confirm="delete_attr(row.id)"
                                width="200px"
                            >
                                <template #reference>
                                    <el-button
                                        type="primary"
                                        size="small"
                                        icon="Delete"
                                    >
                                        删除
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </template>
                    </el-table-column>
                </el-table>
            </div>

            <!-- 新增属性页面 -->
            <div v-else>
                <!-- 将表单内的内容绑定到请求头上面 -->
                <el-form :inline="true" :model="attr_data_params">
                    <el-form-item label="属性名称">
                        <el-input
                            placeholder="请你输入属性名称"
                            v-model="attr_data_params.attrName"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <!-- 如果没有输入属性名称的话,禁用此按钮 -->
                <el-button
                    type="primary"
                    icon="Plus"
                    :disabled="attr_data_params.attrName === '' ? true : false"
                    @click="add_attr_value"
                >
                    添加属性值
                </el-button>
                <el-button type="">取消</el-button>

                <!-- 新增数据的表格 -->
                <el-table
                    border="true"
                    style="margin: 10px 0"
                    :data="attr_data_params.attrValueList"
                >
                    <el-table-column
                        label="序号"
                        type="index"
                        width="100px"
                        align="center"
                    ></el-table-column>
                    <!-- 属性值名称输入框 -->
                    <el-table-column label="属性值">
                        <!-- 将每一行对象传给控制显示或者隐藏的handler -->
                        <template v-slot="{ row, $index }">
                            <div
                                v-if="row.edit_tolook"
                                @click="edit_handler(row, $index)"
                            >
                                {{ row.valueName }}
                            </div>
                            <!-- input框出现时将对应的组件对象存在input_arr中, -->
                            <el-input
                                :ref="(vc:any) => input_arr[$index] = vc"
                                size="small"
                                placeholder="请输入属性值名称"
                                v-model="row.valueName"
                                v-else
                                @blur="tolook_handler(row, $index)"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template v-slot="{ $index }">
                            <!-- 点击按钮的时候,删除对应的属性值对象 -->
                            <el-button
                                size="small"
                                type="primary"
                                @click="
                                    attr_data_params.attrValueList.splice(
                                        $index,
                                        1,
                                    )
                                "
                                icon="Delete"
                            ></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save_btn_handler">
                    保存
                </el-button>
                <el-button type="primary" @click="cancel_btn_handler">
                    取消
                </el-button>
            </div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { watch, ref, reactive, nextTick } from 'vue'
import category from '@/components/category/index.vue'

// 引入相关的仓库
import use_catagory_store from '@/store/modules/catagory'

// 使用小仓库
const catagory_store = use_catagory_store()

// 引入ts类型
import type { attr_data } from '@/api/product/attr/type'

// 引入修改/新增属性的接口
import { api_add_or_update_attr, api_delete_attr } from '@/api/product/attr'
import { ElMessage, ElNotification } from 'element-plus'
const btn_disable = () => {
    if (catagory_store.c3_id === '') return true
    else return false
}

// 收集新增或者修改商品属性的信息
let attr_data_params: attr_data = reactive({
    attrName: '',
    categoryId: 0,
    categoryLevel: 3,
    attrValueList: [],
})

// 监听小仓库内的第三级列表的属性,如果有则发请求拿对应列表下的数据
watch(
    () => catagory_store.c3_id,
    () => catagory_store.get_attr_list(),
)

// 新建数组获取input组件实例,实现聚焦功能
let input_arr = ref<any>([])
// 定义新增属性输入框失去焦点后的事件
const tolook_handler = (row, $index: number) => {
    // 判断是否输入的值与之前的重复
    let repeat = attr_data_params.attrValueList.find((item) => {
        if (item != row) {
            // 切记将row排除出当前的数组,才进行判断
            return item.valueName === row.valueName
        }
    })
    //非法情况1: 如果用户没有输入内容的时候,就不能切换成div
    if (row.valueName.trim() == '') {
        // 删除调用对应属性值为空的元素
        attr_data_params.attrValueList.splice($index, 1)
        ElMessage.warning({
            message: '属性值不能为空!',
        })
        return
    }
    // 非法情况2,用户输入的内容与之前输入的有重复的
    else if (repeat) {
        ElMessage.error({
            message: '输入的属性值不能与已输入的重复!',
        })
        return
    } else {
        row.edit_tolook = true
    }
}

// 定义点击输入框div后的事件
const edit_handler = (row, $index: number) => {
    row.edit_tolook = false
    nextTick(() => {
        input_arr.value[$index].focus()
    })
}

// 定义卡片显示的内容的切换
let scene = ref<number>(0) //默认值为0,则展示数据页面,如果切换为1,则展示新增属性页面

// 定义增加属性按钮的点击事件
const add_attr = () => {
    // 每次点击的时候先清空一下数据,再收集数据
    // assign方法是合并对象用的
    Object.assign(attr_data_params, {
        attrName: '',
        categoryId: 0,
        categoryLevel: 3,
        attrValueList: [],
    })
    scene.value = 1
}
const update_attr = (row) => {
    scene.value = 1
    // 将已有的属性对象赋值给,attr_params,此处是浅拷贝,需要深拷贝
    Object.assign(attr_data_params, JSON.parse(JSON.stringify(row)))
}

// 保存按钮的点击事件:根据是否有id发送不一样的请求
const save_btn_handler = async () => {
    // 收集参数
    attr_data_params.categoryId = catagory_store.c3_id
    // 发送请求
    let res = await api_add_or_update_attr(attr_data_params)
    // 返回数据展示页
    try {
        if (res.code == 200) {
            scene.value = 0
            catagory_store.get_attr_list()
            ElMessage({
                type: 'success',
                message: attr_data_params.id ? '修改成功' : '上传成功',
            })
        }
    } catch (error) {
        ElNotification(attr_data_params.id ? '修改失败' : '上传失败')
    }
}

// 取消添加属性按钮的点击事件
const cancel_btn_handler = () => {
    scene.value = 0
}

// 删除按钮的点击事件
const delete_attr = async (id) => {
    let res = await api_delete_attr(id)
    if (res.code == 200) {
        await catagory_store.get_attr_list()
        ElMessage.success({
            message: '删除成功',
        })
    } else {
        ElMessage.error({
            message: '删除失败',
        })
    }
}
// 新增属性按钮点击后向请求头数组新增一个对象
const add_attr_value = () => {
    attr_data_params.attrValueList.push({
        valueName: '',
        edit_tolook: false,
    })
    // 获取属性值数组的最后一个input框,进行聚焦
    nextTick(() => {
        input_arr.value[attr_data_params.attrValueList.length - 1].focus()
    })
}
</script>
