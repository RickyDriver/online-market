import request from '@/utils/request'
enum API {
  GET_PERMISSION_MENU = '/admin/acl/permission',
  ADD_PERMISSION_MENU = '/admin/acl/permission/save',
  UPDATE_PERMISSION_MENU = '/admin/acl/permission/update',
  DELETE_PERMISSION_MENU = '/admin/acl/permission/remove',
}
export const api_get_permission_menu = () => {
  return request.get(API.GET_PERMISSION_MENU)
}

export const api_add_or_update_menu = (parmas) => {
  if (parmas.id) {
    return request.put(API.UPDATE_PERMISSION_MENU, parmas)
  } else {
    return request.post(API.ADD_PERMISSION_MENU, parmas)
  }
}

export const api_delete_menu = (id: number) => {
  return request.delete(API.DELETE_PERMISSION_MENU + `/${id}`)
}
