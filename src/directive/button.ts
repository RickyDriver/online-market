import pinia from '@/store'
import use_user_store from '@/store/modules/user'

const user_store = use_user_store()
export const is_able_button = (app: any) => {
  app.directive('button', {
    mounted(el: any, options: any) {
      if (!user_store.botton.includes(options.value)) {
        el.remove()
      }
    },
  })
}
