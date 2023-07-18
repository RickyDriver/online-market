import request from '@/utils/request'
enum API {
  // 获取已有的角色
  GET_HAS_ROLE = '/admin/acl/role',
  ADD_ROLE = '/admin/acl/role/save',
  EDIT_ROLE = '/admin/acl/role/update',
}

export const api_get_has_role = (page: number, limit: number, query?) => {
  if (query) {
    return request.get(
      API.GET_HAS_ROLE + `/${page}/${limit}/?roleName=${query}`,
    )
  } else {
    return request.get(API.GET_HAS_ROLE + `/${page}/${limit}`)
  }
}

export const api_add_or_edit_role = (parmas) => {
  if (parmas.id) {
    return request.put(API.EDIT_ROLE, parmas)
  } else return request.post(API.ADD_ROLE, parmas)
}
