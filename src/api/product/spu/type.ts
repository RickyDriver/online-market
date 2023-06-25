// 通用的相应头
export interface request_data_header {
    code?: number
    message?: string
    ok?: boolean
}

// 单个spu属性的接口
export interface single_spu_data {
    //TODO需要修改
    id: number
    createTime?: string
    updateTime?: string
    spuName: string
    description: string
    category3Id: number
    tmId: number
    spuSaleAttrList: null
    spuImageList: null
    spuPosterList: null
}

// spu列表data的数据类型->包括单个spu属性的接口,响应头
export interface spu_res_data extends request_data_header {
    data: spu_res_data_data
}
export interface spu_res_data_data {
    records: single_spu_data[]
    total: number
    size: number
    current: number
    orders: any[]
    optimizeCountSql: boolean
    hitCount: boolean
    countId: null
    maxLimit: null
    searchCount: boolean
    pages: number
}

// 修改spu属性请求1:根据spuid(id)获取对应的spu的属性
export interface get_spu_info_res extends request_data_header {
    data: {
        id?: number
        createTime: string
        updateTime: string
        spuName: string
        description: string
        category3Id: number
        tmId: number
        spuSaleAttrList: spuSaleAttrList
        spuImageList: spuImageList
        spuPosterList: spuImageList
    }
}
// 销售属性列表
export type spuSaleAttrList = spuSaleAttrList_item[]
export interface spuSaleAttrList_item {
    id?: number
    createTime: string
    updateTime: string
    spuId: string
    baseSaleAttrId: number
    saleAttrName: string
    spuSaleAttrValueList?: spuSaleAttrList[]
}
// spu图片列表
export type spuImageList = spuImageList_item[]
export interface spuImageList_item {
    id?: number
    createTime: string
    updateTime: string
    spuId: string
    imgName: string
    imgUrl: string
}

// 修改spu属性请求2:根据c3_id获取当前id下可选的品牌的列表
export interface get_spu_trmark_res extends request_data_header {
    data: spu_trmark_res_data
}
export type spu_trmark_res_data = res_data_item[]
export interface res_data_item {
    id: number
    createTime: string
    updateTime: string
    tmName: string
    logoUrl: string
}
