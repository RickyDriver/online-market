<template>
    <div>
        <el-card>
            <el-form ref="form" label-width="100px">
                <el-form-item label="SKU名称">
                    <el-input
                        placeholder="请填写SKU名称"
                        v-model="add_sku_parmas.skuName"
                    ></el-input>
                </el-form-item>

                <el-form-item label="价格(元)">
                    <el-input
                        placeholder="请填写价格"
                        type="number"
                        v-model="add_sku_parmas.price"
                    ></el-input>
                </el-form-item>

                <el-form-item label="重量(克)">
                    <el-input
                        placeholder="请填写重量"
                        type="number"
                        v-model="add_sku_parmas.weight"
                    ></el-input>
                </el-form-item>

                <el-form-item label="SKU描述">
                    <el-input
                        placeholder="请填写SKU描述"
                        type="textarea"
                        v-model="add_sku_parmas.skuDesc"
                    ></el-input>
                </el-form-item>

                <el-form-item label="平台属性">
                    <el-form :inline="true" :model="attr_list">
                        <el-form-item
                            v-for="attr in attr_list"
                            :key="attr.id"
                            :label="attr.attrName"
                            label-width="100px"
                        >
                            <el-select
                                placeholder="请选择"
                                size="small"
                                v-model="attr.attrid_and_valuename"
                            >
                                <el-option
                                    v-for="item in attr.attrValueList"
                                    :key="item.id"
                                    :label="item.valueName"
                                    :value="`${item.attrId}+${item.valueName}`"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-form-item>

                <el-form-item label="销售属性">
                    <el-form :inline="true" :model="spu_sale_attr_arr">
                        <el-form-item
                            :label="sale_attrlist.saleAttrName"
                            v-for="sale_attrlist in spu_sale_attr_arr"
                            :key="sale_attrlist.id"
                        >
                            <el-select
                                placeholder="请选择"
                                size="small"
                                v-model="
                                    sale_attrlist.saleAttrId_and_saleAttrValueId
                                "
                            >
                                <el-option
                                    v-for="item in sale_attrlist.spuSaleAttrValueList"
                                    :key="item.id"
                                    :label="item.saleAttrValueName"
                                    :value="`${sale_attrlist.id}+${item.id}`"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-form-item>

                <el-form-item label="图片名称">
                    <el-table :border="true" :data="spu_img_list" ref="table">
                        <el-table-column
                            type="selection"
                            width="55"
                        ></el-table-column>

                        <el-table-column label="图片" prop="imgUrl">
                            <template v-slot="{ row }">
                                <img :src="row.imgUrl" style="width: 200px" />
                            </template>
                        </el-table-column>

                        <el-table-column
                            label="名称"
                            prop="imgName"
                        ></el-table-column>
                        <el-table-column label="操作">
                            <template v-slot="{ row }">
                                <div>
                                    <el-button
                                        type="warning"
                                        @click="set_default_img(row)"
                                    >
                                        设置默认
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="comfirm">确认</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
// 引入请求的方法
import { api_get_attr_list } from '@/api/product/attr/index'
import { api_get_spu_info } from '@/api/product/spu/index'
import { api_add_sku } from '@/api/product/spu/index'
import { ElMessage } from 'element-plus'

// 定义存放spu图片列表以及spu销售属性列表
const attr_list = ref()
const spu_img_list = ref()
const spu_sale_attr_arr = ref()
// 接受父组件传过来的row
const row = ref()
// 发送请求的数据
const add_sku_parmas = ref({
    //父组件传递过来的数据
    //父组件传递过来的数据
    category3Id: '', //三级分类的ID
    spuId: '', //已有的SPU的ID
    tmId: '', //SPU品牌的ID
    //v-model收集
    skuName: '', //sku名字
    price: '', //sku价格
    weight: '', //sku重量
    skuDesc: '', //sku的描述

    skuAttrValueList: [
        //平台属性的收集
    ],
    skuSaleAttrValueList: [
        //销售属性
    ],
    skuDefaultImg: '', //sku图片地址
})

// 获取图片table组件实例
let table = ref()
const emits = defineEmits(['cancel', 'init'])
const cancel = () => {
    Object.assign(add_sku_parmas.value, {
        //父组件传递过来的数据
        category3Id: '', //三级分类的ID
        spuId: '', //已有的SPU的ID
        tmId: '', //SPU品牌的ID
        //v-model收集
        skuName: '', //sku名字
        price: '', //sku价格
        weight: '', //sku重量
        skuDesc: '', //sku的描述

        skuAttrValueList: [
            //平台属性的收集
        ],
        skuSaleAttrValueList: [
            //销售属性
        ],
        skuDefaultImg: '', //sku图片地址
    })
    emits('cancel', 0)
}

// 从父组件调用此方法请求数据
const sku_form_init = async (c1_id, c2_id, row_data) => {
    const c3_id = row_data.category3Id
    let res1 = await api_get_attr_list(c1_id, c2_id, c3_id)
    attr_list.value = res1.data
    const spu_id = row_data.id
    let res2 = await api_get_spu_info(spu_id)
    spu_img_list.value = res2.data.spuImageList
    spu_sale_attr_arr.value = res2.data.spuSaleAttrList
    row.value = row_data
    console.log(spu_img_list.value)
    console.log(attr_list.value)
    console.log(spu_sale_attr_arr.value)
}
onMounted(() => {
    emits('init', sku_form_init)
})

// 设置默认图片的方法
const set_default_img = (row) => {
    spu_img_list.value.forEach((item) => {
        table.value.toggleRowSelection(item, false)
    })
    table.value.toggleRowSelection(row, true)
    add_sku_parmas.value.skuDefaultImg = row.imgUrl
}
//点击确认按钮的方法
const comfirm = async () => {
    // 整理数据
    add_sku_parmas.value.category3Id = row.value.category3Id
    add_sku_parmas.value.spuId = row.value.id
    add_sku_parmas.value.tmId = row.value.tmId

    // 平台属性
    add_sku_parmas.value.skuAttrValueList = attr_list.value.reduce(
        (prev, next) => {
            if (next.attrid_and_valuename) {
                const [attrId, valueId] = next.attrid_and_valuename.split('+')
                prev.push({
                    attrId,
                    valueId,
                })
            }
            return prev
        },
        [],
    )

    // // 销售属性
    add_sku_parmas.value.skuSaleAttrValueList = spu_sale_attr_arr.value.reduce(
        (prev, next) => {
            if (next.saleAttrId_and_saleAttrValueId) {
                const [saleAttrId, saleAttrValueId] =
                    next.saleAttrId_and_saleAttrValueId.split('+')
                prev.push({
                    saleAttrId,
                    saleAttrValueId,
                })
            }
            return prev
        },
        [],
    )
    // 发送请求
    let res = await api_add_sku(add_sku_parmas.value)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加成功',
        })
    } else {
        ElMessage({
            type: 'error',
            message: '添加失败',
        })
    }
}
</script>

<style lang="stylus" scoped></style>
