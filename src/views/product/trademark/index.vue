<style lang="scss">
.img-box {
    margin: 0 auto;
    max-width: 100px;
    max-height: 100px;
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>

<template>
    <div>
        <el-card class="box-card">
            <!-- 卡片顶部添加品牌 -->
            <el-button type="primary" icon="plus">添加品牌</el-button>

            <!-- 卡片内表格 -->
            <!-- 表格组件 border:设置纵向边框,lable:某一列的标题,width:某一列的宽度,align:某一列的对齐方式 -->
            <el-table style="margin: 10px 0" border :data="trademark_arr">
                <!-- table组件的column默认用div展示相应的品牌的名字,当然也可以使用插槽 -->
                <el-table-column
                    prop="date"
                    label="序号"
                    width="80px"
                    align="center"
                    type="index"
                />
                <el-table-column
                    prop="tmName"
                    label="品牌名称"
                    align="center"
                />
                <el-table-column label="品牌LOGO" align="center">
                    <template v-slot="{ row }">
                        <div class="img-box">
                            <el-image :src="row.logoUrl" fit="fill"></el-image>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="品牌操作" align="center">
                    <!-- 修改和删除商标 -->
                    <template v-slot="{ row }">
                        <el-button
                            type="primary"
                            size="small"
                            icon="Edit"
                            @click="update_trademark"
                        >
                            修改
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Delete"
                            @click="delete_trademark"
                        >
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 
                current-page:当前页码
                page-size:每页数据的条数
                page-sizes:可选的每页的条数
                small:小型分页器设置
                layout:设置分页器六个子组件布局的调整
             -->
            <!-- 分页器组件 -->
            <el-pagination
                v-model:current-page="page_num"
                v-model:page-size="limit"
                :page-sizes="[3, 5, 7, 9]"
                background="true"
                layout="prev, pager, next, jumper,->,sizes,total"
                :total="total_tradmark"
            />

            <!-- 对话框组件:在添加和修改已有品牌的业务的时候使用的结构 -->
            <!-- v-model属性用户控制对话框的显示与隐藏
                title:设置对话框左上角的标题
            -->
            <el-dialog
                title="添加品牌"
                width="600px"
                v-model="dialog_form_visible"
            >
                <el-form ref="form" style="width: 80%">
                    <el-form-item
                        label="品牌名称:"
                        prop="name"
                        label-width="100px"
                    >
                        <el-input placeholder="请输入品牌名称"></el-input>
                    </el-form-item>

                    <el-form-item
                        label="品牌LOGO:"
                        prop="name"
                        label-width="100px"
                    >
                        <el-upload
                            class="avatar-uploader"
                            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                            :show-file-list="false"
                        >
                            <img v-if="imageUrl" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </el-form-item>
                </el-form>
                <template #footer>
                    <el-button type="primary" @click="cancle">取消</el-button>
                    <el-button type="primary" @click="comfirm">确定</el-button>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
// 导入请求商标列表的函数
import { api_has_trademark } from '@/api/product/trademark/index'
// 导入ts类型
import type {
    Records,
    trademark_response_data,
} from '@/api/product/trademark/type'
let page_num = ref<number>(1)
let limit = ref<number>(3)

// 存储已有品牌数据的总数
let total_tradmark = ref<number>(0)
// 存储已有品牌的数据
let trademark_arr = ref<Records>([])
// 引入api获取品牌数据的方法
// 封装调用获取品牌而接口为一个函数
const get_has_trademark = async (pager = 1) => {
    page_num.value = pager
    const res: trademark_response_data = await api_has_trademark(
        page_num.value,
        limit.value,
    )
    if (res.code == 200) {
        total_tradmark.value = res.data.total
        trademark_arr.value = res.data.records
    }
}
// 不使用分页器的自定义事件而使用watch监听来实现
watch([page_num, limit], () => {
    get_has_trademark(page_num.value)
})

// 分页器当前页码发生变化的时候会触发请求,但是已经通过v-model双向绑定了,所以再次调用请求函数就不需要再回传值了

// const form_size_change = () => {
//     // 当下拉菜单发生变化的时候会触发此方法,由于调整了每页显示的条数之后,页码会发生变化,所以需要在每次调整页面显示数量的时候,页码数归1
//     // 这里可以这样写,但是也可以在请求函数那边设置一个默认值参数
//     // page_num.value = 1
//     get_has_trademark()
// }
onMounted(() => {
    get_has_trademark()
})

// 控制对话框的显示与隐藏
let dialog_form_visible = ref<boolean>(false)

// 按钮的点击事件
const update_trademark = () => {
    dialog_form_visible.value = true
}

const delete_trademark = () => {
    dialog_form_visible.value = true
}

const comfirm = () => {
    dialog_form_visible.value = false
}
const cancle = () => {
    dialog_form_visible.value = false
}
</script>
