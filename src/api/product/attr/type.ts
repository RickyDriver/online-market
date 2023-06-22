// 三级菜单列表的属性
export interface catagory_attr {
    createTime: string | null
    id: number
    name: string
    updateTime: string | null
    category1Id?: number
    category2Id?: number
}
export interface catagory_res_data {
    code: number
    data: catagory_attr[]
    message: string
    ok: true
}

// 已有属性列表的类型(由最细一级到最上一级排列)

// 01 属性对象的ts类型
export interface single_attr_value {
    id?: number | string
    valueName: string
    attrId?: number | string
    createTime?: string
    updateTime?: string
}
// 02 单个属性data的类型
export interface attr_data {
    id?: number
    attrName: string
    categoryId: number | string
    categoryLevel: number
    attrValueList: single_attr_value[]
    createTime?: string
    updateTime?: string
}
// 03 响应回来的数据的ts格式
export interface attr_res {
    code: number
    message: string
    data: attr_data[]
    ok: boolean
}
