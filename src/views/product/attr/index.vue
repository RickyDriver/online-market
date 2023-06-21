<template>
    <div>
        <category></category>
        <el-card>
            <el-button type="primary" icon="Plus">添加平台属性</el-button>
            <el-table border="true" style="margin: 10px 0px">
                <el-table-column
                    label="序号"
                    prop="id"
                    type="index"
                    align="center"
                    width="100px"
                ></el-table-column>

                <el-table-column label="属性名称"></el-table-column>

                <el-table-column label="属性值名称"></el-table-column>

                <el-table-column label="操作" width="200px">
                    <template #row>
                        <el-button type="primary" size="small" icon="Edit">
                            修改
                        </el-button>
                        <el-button type="primary" size="small" icon="Delete">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import category from '@/components/category/index.vue'
</script>
