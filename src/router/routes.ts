export const constant_route = [
    {
        //登录页面的路由
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login', //命名路由
    },

    {
        // 默认去登录页面
        path: '/',
        redirect: '/login',
        name: 'index',
    },
    {
        // 登录成功以后展示数据的路由
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'home',
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
    },
    {
        // 没匹配到返回的路由
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
    },
    
]
