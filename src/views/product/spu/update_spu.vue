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
                            v-for="item in spu_store.spu_trmark_arr"
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
                        v-model:file-list="fileList"
                        action="api/admin/product/fileUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                    >
                        <el-icon><Plus /></el-icon>
                    </el-upload>

                    <el-dialog v-model="dialogVisible">
                        <img w-full :src="dialogImageUrl" alt="Preview Image" />
                    </el-dialog>
                </el-form-item>
                <el-form-item label="SPU销售属性">
                    <el-select v-model="value" placeholder="">
                        <el-option value="华为"></el-option>
                        <el-option value="oppo"></el-option>
                        <el-option value="vivo"></el-option>
                    </el-select>
                    <el-button
                        type="primary"
                        icon="Plus"
                        style="margin-left: 10px"
                    >
                        添加属性值
                    </el-button>
                    <el-table :border="true" style="margin: 10px 0">
                        <el-table-column
                            label="序号"
                            width="100"
                            type="index"
                        ></el-table-column>
                        <el-table-column label="销售属性名字"></el-table-column>
                        <el-table-column label="销售属性值"></el-table-column>
                        <el-table-column label="操作"></el-table-column>
                    </el-table>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">确认</el-button>
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
// import { api_find_spu_has_trmark, api_get_spu_info } from '@/api/product/spu'
// 引入小仓库
import { reactive } from 'vue'
import use_spu_store from '@/store/modules/spu'
const spu_store = use_spu_store()

let spu_parmas = reactive(spu_store.spu_parmas)
console.log(spu_parmas)
const $emits = defineEmits(['switch_number'])
const cancel_handler = () => {
    $emits('switch_number', 0)
}
</script>

<style lang="stylus" scoped></style>
