<style scoped lang="scss">
.login-container {
    width: 100%;
    height: 100vh;
    background-image: url(@/assets/images/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

.login-form {
    margin: 0 auto;
    width: 80%;
    padding: 40px;
    background-image: url(@/assets/images/login_form.png);
    background-repeat: no-repeat;
    background-position: -30px;
    position: relative;
    top: 30vh;

    h1 {
        font-size: 40px;
        color: white;
    }

    h2 {
        font-size: 20px;
        color: white;
        margin: 20px 0;
    }
}

.login-btn {
    width: 100%;
}
</style>
<template>
    <div class="login-container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form
                    class="login-form"
                    :model="login_form"
                    :rules="rules"
                    ref="login_forms"
                >
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>

                    <el-form-item prop="username">
                        <el-input
                            :prefix-icon="User"
                            placeholder="请输入用户名"
                            v-model="login_form.username"
                        ></el-input>
                    </el-form-item>

                    <el-form-item prop="password">
                        <el-input
                            type="password"
                            :prefix-icon="Lock"
                            placeholder="请输入密码"
                            v-model="login_form.password"
                            show-password
                        ></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button
                            :loading="loading"
                            class="login-btn"
                            type="primary"
                            @click="login"
                        >
                            登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script setup lang="ts">
// 引入router
import { useRouter } from 'vue-router'
// 引入elementplus提示组件
import { ElNotification } from 'element-plus'

import { User, Lock } from '@element-plus/icons-vue'
// 收集账号密码的数据
import { reactive, ref } from 'vue'
// 引入用户相关的数据
import use_uesr_store from '@/store/modules/user'
// 引入时间判断组件
import { get_time } from '@/utils/time'

// 获取用户相关的数据
let user_store = use_uesr_store()
// 获取路由器
let $router = useRouter()
// 定义变量控制按钮加载效果
let loading = ref(false)

// 获取el-forms组件
let login_forms = ref()

// 登录按钮回调
// 登录按钮点击事件
// 1.通知仓库发登录请求
//请求成功=>首页展示数据的地方
// 请求失败=>弹出失败信息
const login = async () => {
    // 保证所有项目通过表单验证后再发送请求
    await login_forms.value.validate()

    // 加载效果
    loading.value = true
    try {
        // 保证登录成功
        await user_store.user_login(login_form)
        $router.push('/home')
        ElNotification({
            type: 'success',
            title: get_time(),
            message: '欢迎回来',
        })
        loading.value = false
    } catch (error) {
        // 登录失败的提示信息
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
        loading.value = false
    }
}

// 默认登录的账号密码,会被input输入的值覆盖
let login_form = reactive({
    username: 'admin',
    password: '111111',
})

// 定义表单校验需要的配置对象
const validator_username = (_, value: any, callback: any) => {
    const reg_username = /^\w{5,10}$/
    // rule即为校验规则对象
    // value即为表单元素的文本内容
    // callback是一个放行函数,即如果条件满足要求直接调用,不满足要求则传入错误信息
    if (reg_username.test(value)) {
        callback()
    } else {
        callback(new Error('账号长度至少5位,至多10位'))
    }
}

const validator_password = (_, value: any, callback: any) => {
    // rule即为校验规则对象
    // value即为表单元素的文本内容
    // callback是一个放行1函数,即如果条件满足要求直接调用,不满足要求则传入错误信息
    if (value.length >= 6) {
        callback()
    } else {
        callback(new Error('密码长度至少6位'))
    }
}

const rules = {
    username: [
        { required: true, message: '请输入用户名!', trigger: 'blur' },
        { trigger: 'change', validator: validator_username },
    ],
    password: [
        { required: true, message: '请输入密码!', trigger: 'blur' },
        { trigger: 'change', validator: validator_password },
    ],
}
</script>
