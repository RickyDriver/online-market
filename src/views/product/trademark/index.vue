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
            <el-button type="primary" icon="plus" @click="update_trademark">
                添加品牌
            </el-button>

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
                            @click="change_trademark(row)"
                        >
                            修改
                        </el-button>
                        <el-button
                            type="primary"
                            size="small"
                            icon="Delete"
                            @click="delete_trademark(row)"
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
                :title="dialog_title"
                width="600px"
                v-model="dialog_form_visible"
            >
                <el-form ref="form" style="width: 80%">
                    <el-form-item
                        label="品牌名称:"
                        prop="name"
                        label-width="100px"
                    >
                        <el-input
                            placeholder="请输入品牌名称"
                            v-model="trademark_parmas.tmName"
                        ></el-input>
                    </el-form-item>

                    <el-form-item
                        label="品牌LOGO:"
                        prop="name"
                        label-width="100px"
                    >
                        <el-upload
                            class="avatar-uploader"
                            action="api/admin/product/fileUpload"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :on-success="handleAvatarSuccess"
                        >
                            <div
                                class="img-box"
                                v-if="trademark_parmas.logoUrl"
                            >
                                <el-image
                                    :src="trademark_parmas.logoUrl"
                                    fit="fill"
                                ></el-image>
                            </div>

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

            <el-dialog
                title="是否确认删除此条目?"
                width="600px"
                v-model="delete_form_visible"
            >
                <template #footer>
                    <el-button type="primary" @click="cancle_delete">
                        取消
                    </el-button>
                    <el-button type="primary" @click="comfirm_delete">
                        确定
                    </el-button>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch, reactive } from 'vue'
// 导入请求商标列表的函数
import {
    api_has_trademark,
    api_update_add_trademark,
    api_delete_trademark,
} from '@/api/product/trademark/index'
// 导入ts类型
import type {
    Records,
    trademark_response_data,
    trademark,
} from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'

// 默认的请求数据页面的数量和页码
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
        console.log(res)
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

/*

对话框部分

*/

// 设置对话框的标题
let dialog_title = ref('')
// 定义一个数据接受用户上传的图片及名称
let trademark_parmas = reactive<trademark>({
    id: null,
    logoUrl: '',
    tmName: '',
})
let delete_id = ref(0)
// 限制用户上传文件的格式和大小,此钩子在图片上传成功之前触发
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (
        rawFile.type == 'image/jpeg' ||
        rawFile.type == 'image/png' ||
        rawFile.type == 'image/gif' ||
        rawFile.type == 'image/jpg'
    ) {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage.error('上传的图片大小不能超过4MB')
            return false
        }
    } else {
        ElMessage.error('上传的文件格式需要是jpeg,jpg,png,gif格式')
        return false
    }
}

// 定义上传成功后触发的钩子函数
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    // 两个回调函数,response即为此次上传图片返回的数据,
    trademark_parmas.logoUrl = response.data
}
// 控制对话框的显示与隐藏
let dialog_form_visible = ref<boolean>(false)
let delete_form_visible = ref<boolean>(false)
// 按钮的点击事件
const update_trademark = async () => {
    dialog_title.value = '添加品牌'
    dialog_form_visible.value = true
    await get_has_trademark()
}
const change_trademark = (row) => {
    dialog_title.value = '修改品牌'
    trademark_parmas.id = row.id
    dialog_form_visible.value = true
    //TODO 需要新增刷新模块的功能
}

const delete_trademark = (row) => {
    delete_form_visible.value = true
    delete_id.value = row.id
}
/*

对话框部分结束

*/

/*

卡片table行部分

*/
const comfirm = async () => {
    await api_update_add_trademark(trademark_parmas)
    dialog_form_visible.value = false
    page_num.value = 1
    await get_has_trademark()
    trademark_parmas.logoUrl = ''
    trademark_parmas.tmName = ''
}
const comfirm_delete = async () => {
    await api_delete_trademark(delete_id.value)
    delete_form_visible.value = false
    page_num.value = 1
    await get_has_trademark()
}
const cancle = () => {
    trademark_parmas.logoUrl = ''
    trademark_parmas.tmName = ''
    dialog_form_visible.value = false
}
const cancle_delete = () => {
    delete_id.value = 0
    delete_form_visible.value = false
}

/*

卡片table行部分结束

*/
</script>
