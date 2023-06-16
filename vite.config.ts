// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入mock接口
import { viteMockServe } from 'vite-plugin-mock'

// 引入svg图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ command, mode }) => {
    // 根据开发环境的不同切换对应的接口配置变量
    // loadenv,参数1:告诉loadenv要用什么模式,参数2:告诉lodeenv模式的文件在哪里
    let env = loadEnv(mode, process.cwd())
    return {
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                localEnabled: command === 'serve', //保证开发阶段可以使用mock接口
            }),
        ],
        // scss全局变量的配置项
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
            },
        },
        server: {
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    // 获取数据的服务器地址设置
                    target: env.VITE_SERVE,
                    // 需要代理跨域
                    changeOrigin: true,
                    // 路径名替换
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
    }
})
