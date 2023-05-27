// @ts-nocheck
// 引入mock接口
import { UserConfigExport, ConfigEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
// 引入svg图标插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default (command) => {
    return {
        // scss全局变量的配置项
        css: {
            preprocessorOptions: {
                scss: {
                    javascriptEnabled: true,
                    additionalData: '@import "./src/styles/variable.scss";',
                },
            },
        },
        plugins: [
            vue(),
            createSvgIconsPlugin({
                // 设置svg图标的目录
                iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
                // Specify symbolId format
                symbolId: 'icon-[dir]-[name]',
            }),
            viteMockServe({
                mockPath: 'mock',
                localEnabled: true,
                supportTs: true,
                watchFiles: true,
            }),
        ],
        resolve: {
            alias: {
                '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
            },
        },
    }
}
