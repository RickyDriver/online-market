import request from '@/utils/request'
enum API {
  GET_HAS_USER = '/admin/acl/user',
  ADD_NEW_USER = '/admin/acl/user/save',
  UPDATE_USER = '/admin/acl/user/update',
  DELETE_SELECTED_USER = '/admin/acl/user/batchRemove',
  DELETE_USER = '/admin/acl/user/remove',
  GET_USER_INFO = '/admin/acl/user/toAssign',
  ASSIGN_ROLE = '/admin/acl/user/doAssignRole',
}
export const api_get_has_user = (
  page: number,
  limit: number,
  query: string,
) => {
  if (query) {
    return request.get(
      API.GET_HAS_USER + `/${page}/${limit}/?username=${query}`,
    )
  } else return request.get(API.GET_HAS_USER + `/${page}/${limit}`)
}

export const api_update_or_add_user = (parmas) => {
  if (parmas.id) {
    return request.put(API.UPDATE_USER, parmas)
  } else {
    return request.post(API.ADD_NEW_USER, parmas)
  }
}

export const api_delete_selected_user = (id_list: number[]) => {
  return request.delete(API.DELETE_SELECTED_USER, { data: id_list })
}

export const api_delete_user = (id: number) => {
  return request.delete(API.DELETE_USER + `/${id}`)
}

export const api_get_user_info = (id: number) => {
  return request.get(API.GET_USER_INFO + `/${id}`)
}
export const api_assign_role = (parmas) => {
  return request.post(API.ASSIGN_ROLE, parmas)
}
