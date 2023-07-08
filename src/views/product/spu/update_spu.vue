<template>
    <div>
        <el-card>
            <el-form label-width="120px">
                <el-form-item label="SPU名称" v-if="spu_store.spu_parmas">
                    <el-input
                        placeholder="请输入SPU名称"
                        v-model="spu_store.spu_parmas.spuName"
                    >
                        {{ spu_store.spu_parmas.spuName }}
                    </el-input>
                </el-form-item>

                <el-form-item label="SPU品牌">
                    <el-select
                        placeholder="请选择spu品牌"
                        v-model="spu_store.spu_parmas.tmId"
                    >
                        <el-option
                            v-for="item in spu_store.all_trade_mark"
                            :key="item.id"
                            :label="item.tmName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="SPU描述">
                    <el-input
                        placeholder="请输入spu描述"
                        type="textarea"
                        v-model="spu_store.spu_parmas.description"
                    ></el-input>
                </el-form-item>

                <el-form-item label="SPU图标">
                    <el-upload
                        v-model:file-list="spu_store.upload_filelist"
                        action="api/admin/product/fileUpload"
                        list-type="picture-card"
                        :on-preview="handle_picture_cardpreview"
                        :before-upload="upload_validater"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>

                    <el-dialog v-model="dialog_visible">
                        <el-image :src="dialog_image_url" fit="fill"></el-image>
                    </el-dialog>
                </el-form-item>
                <el-form-item
                    label="SPU销售属性"
                    :prop="spu_store.all_trade_mark"
                >
                    <el-select
                        v-model="selected_value"
                        :placeholder="
                            not_selected_arr.length
                                ? `你还有${not_selected_arr.length}个属性未选择`
                                : '无'
                        "
                    >
                        <!-- 显示还没有选择的属性 -->
                        <el-option
                            v-for="item in not_selected_arr"
                            :key="item.id"
                            :label="item.name"
                            :value="`${item.id}:${item.name}`"
                        ></el-option>
                    </el-select>
                    <el-button
                        type="primary"
                        icon="Plus"
                        style="margin-left: 10px"
                        @click="select_attr"
                    >
                        添加属性值
                    </el-button>
                    <el-table
                        :border="true"
                        style="margin: 10px 0"
                        :data="spu_store.spu_sale_attr_arr"
                    >
                        <el-table-column
                            label="序号"
                            width="100"
                            type="index"
                        ></el-table-column>
                        <el-table-column
                            label="销售属性名字"
                            prop="saleAttrName"
                        ></el-table-column>
                        <el-table-column label="销售属性值">
                            <template v-slot="{ row, $index }">
                                <el-tag
                                    v-for="(
                                        tag, index
                                    ) in row.spuSaleAttrValueList"
                                    :key="tag.name"
                                    closable
                                    @close="del_attr_value(row, index)"
                                    style="margin-right: 5px"
                                >
                                    {{ tag.saleAttrValueName }}
                                </el-tag>
                                <el-input
                                    :ref="(vc) => (input_arr[$index] = vc)"
                                    type="text"
                                    size="small"
                                    v-model="row.input_attr_value"
                                    @blur="input_blur(row)"
                                    style="width: 100px"
                                    v-if="row.edit === true"
                                ></el-input>
                                <el-button
                                    type="primary"
                                    @click="add_attr_value_name(row, $index)"
                                    size="small"
                                    icon="Plus"
                                    v-else
                                ></el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="{ $index }">
                                <el-button
                                    type="danger"
                                    @click="delete_attr_value($index)"
                                    size="small"
                                    icon="Delete"
                                ></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="comfirm_change">
                        确认
                    </el-button>
                    <el-button type="primary" @click="cancel_handler">
                        取消
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
// 引入api接口
import { api_update_spu_attr } from '@/api/product/spu'
// 引入小仓库
import { ref, computed, nextTick, defineProps } from 'vue'
import use_spu_store from '@/store/modules/spu'

import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

// 接受展示页刷新
const reflesh_page = defineProps(['reflesh'])

const spu_store = use_spu_store()
const $emits = defineEmits(['switch_number'])
const cancel_handler = () => {
    $emits('switch_number', 0)
}

// 控制增加spu页面大图出现与隐藏
const dialog_image_url = ref('')
const dialog_visible = ref(false)
const handle_picture_cardpreview: UploadProps['onPreview'] = (uploadFile) => {
    dialog_image_url.value = uploadFile.url!
    dialog_visible.value = true
}
// 控制图片上传的大小与类型
const upload_validater: UploadProps['beforeUpload'] = (rawFile) => {
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
// 添加销售属性列表数据

// input框在失焦时触发上传
const input_blur = (row) => {
    // input框表单校验
    let repeat = row.spuSaleAttrValueList.find((item) => {
        return item.saleAttrValueName === row.input_attr_value
    })
    if ((row.input_attr_value as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空!',
        })
        return
    }
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值与之前的重复!',
        })
        return
    }
    row.spuSaleAttrValueList.push({
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrName: row.saleAttrName,
        saleAttrValueName: row.input_attr_value,
        spuId: row.spuId,
    })
    row.input_attr_value = ''

    row.edit = false
}

// input框出现后自动聚焦
// 定义一个动态的数组,获取input框的真实dom
let input_arr = ref<any>([])
// 添加属性值按钮点击后控制input框出现
const add_attr_value_name = (row, $index) => {
    row.edit = true
    row.input_attr_value = ''
    nextTick(() => {
        input_arr.value[$index].focus()
    })
}
// 获取还未选择的销售属性数组
let not_selected_arr = computed(() => {
    let un_selected = spu_store.all_sale_attr.filter((item) => {
        return spu_store.spu_sale_attr_arr.every((item1) => {
            return item.name != item1.saleAttrName
        })
    })
    return un_selected
})
// 准备一个数组接收选择的属性
let selected_value = ref('')
// 将已选择的属性添加进table表格里面
const select_attr = () => {
    const [baseSaleAttrId, saleAttrName] = selected_value.value.split(':')
    //准备一个新的销售属性对象:将来带给服务器即可
    let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
    }
    //追加到数组当中
    spu_store.spu_sale_attr_arr.push(newSaleAttr)
    //清空还未选择的销售属性数组
}

// input框与添加按钮切换
// 删除销售属性名字数据
const del_attr_value = (row, index) => {
    row.spuSaleAttrValueList.splice(index, 1)
}

// 删除整行的销售属性
const delete_attr_value = ($index) => {
    spu_store.spu_sale_attr_arr.splice($index, 1)
}
// 确认修改按钮
const comfirm_change = async () => {
    // 收集图片列表属性
    spu_store.spu_img_list = spu_store.upload_filelist.map((item) => {
        return {
            imgName: item.name,
            imgUrl: item.url,
        }
    })
    // 将已有的属性赋值到parmas上
    spu_store.spu_parmas.spuImageList = spu_store.spu_img_list
    spu_store.spu_parmas.spuSaleAttrList = spu_store.spu_sale_attr_arr
    // 发送修改请求
    let res = await api_update_spu_attr(spu_store.spu_parmas)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: spu_store.spu_parmas.id ? '更新成功' : '添加成功',
        })
        $emits('switch_number', 0)
        if (!spu_store.spu_parmas.id) {
            reflesh_page.reflesh(1)
        } else reflesh_page.reflesh()
    } else {
        ElMessage({
            type: 'error',
            message: spu_store.spu_parmas.id ? '更新失败' : '添加失败',
        })
    }
}

// 添加spu按钮
</script>

<style lang="stylus" scoped></style>
