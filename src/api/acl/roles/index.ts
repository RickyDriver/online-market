import request from '@/utils/request'
enum API {
  // 获取已有的角色
  GET_HAS_ROLE = '/admin/acl/role',
  ADD_ROLE = '/admin/acl/role/save',
  EDIT_ROLE = '/admin/acl/role/update',

  // 根据角色获取菜单
  GET_ASSIGNED_MENU = '/admin/acl/permission/toAssign',
  // 给角色分配权限
  DO_ASSIGN_ACL = '/admin/acl/permission/doAssignAcl',
  DELETE_ROLE = '/admin/acl/role/remove',
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

export const api_get_assigned_menu = (role_id: number) => {
  return request.get(API.GET_ASSIGNED_MENU + `/${role_id}`)
}

export const api_do_assign_acl = (parmas) => {
  return request.post(API.DO_ASSIGN_ACL, parmas)
}

export const api_delete_role = (role_id: number) => {
  return request.delete(API.DELETE_ROLE + `/${role_id}`)
}
