<template>
    <div>
        <el-card>
            <el-form ref="form" label-width="100px">
                <el-form-item label="SKU名称">
                    <el-input placeholder="请填写SKU名称"></el-input>
                </el-form-item>

                <el-form-item label="价格(元)">
                    <el-input placeholder="请填写价格" type="number"></el-input>
                </el-form-item>

                <el-form-item label="重量(克)">
                    <el-input placeholder="请填写重量" type="number"></el-input>
                </el-form-item>

                <el-form-item label="SKU描述">
                    <el-input
                        placeholder="请填写SKU描述"
                        type="textarea"
                    ></el-input>
                </el-form-item>

                <el-form-item label="平台属性">
                    <el-form :inline="true">
                        <el-form-item label="手机一级" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="电池容量" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="运行内存" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>

                    <el-form :inline="true">
                        <el-form-item label="机身内存" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="CPU型号" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="屏幕尺寸" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-form-item>

                <el-form-item label="销售属性" prop="">
                    <el-form :inline="true">
                        <el-form-item label="颜色" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>

                        <el-form-item label="版本" prop="">
                            <el-select placeholder="请选择" size="small">
                                <el-option></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </el-form-item>

                <el-form-item label="图片名称" prop="">
                    <el-table :border="true">
                        <el-table-column
                            type="selection"
                            width="55"
                        ></el-table-column>

                        <el-table-column label="图片"></el-table-column>

                        <el-table-column label="名称"></el-table-column>
                        <el-table-column label="操作"></el-table-column>
                    </el-table>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary">确认</el-button>
                    <el-button type="primary" @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['cancel'])
const cancel = () => {
    emits('cancel', 0)
}
</script>

<style lang="stylus" scoped></style>
