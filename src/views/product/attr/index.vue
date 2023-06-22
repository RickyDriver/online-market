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
                        <template v-slot="row">
                            <el-button
                                type="primary"
                                size="small"
                                icon="Edit"
                                @click="update_attr"
                            >
                                修改
                            </el-button>
                            <el-button
                                type="primary"
                                size="small"
                                icon="Delete"
                            >
                                删除
                            </el-button>
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
                        <template v-slot="{ row }">
                            <el-input
                                placeholder="请输入属性值名称"
                                v-model="row.valueName"
                            ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"></el-table-column>
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
import { watch, ref, reactive } from 'vue'
import category from '@/components/category/index.vue'
// 引入相关的仓库
import use_catagory_store from '@/store/modules/catagory'
// 使用小仓库
const catagory_store = use_catagory_store()
// 引入ts类型
import type { attr_data } from '@/api/product/attr/type'
// 引入修改/新增属性的接口
import { api_add_or_update_attr } from '@/api/product/attr'
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
// 收集新增的属性值的信息,点击新增按钮时push到attrValueList数组中
// let attr_data_value: single_attr_value = reactive({
//     id: '',
//     valueName: '',
//     attrId: '',
// })
// 监听小仓库内的第三级列表的属性,如果有则发请求拿对应列表下的数据
watch(
    () => catagory_store.c3_id,
    () => catagory_store.get_attr_list(),
)

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
const update_attr = () => {
    scene.value = 1
}
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
const cancel_btn_handler = () => {
    scene.value = 0
}
// 新增属性按钮点击后向请求头数组新增一个对象
const add_attr_value = () => {
    attr_data_params.attrValueList.push({
        valueName: '',
    })
}
</script>
