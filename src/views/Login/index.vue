<template>
    <div class="main_content">
        <div class="div1">
            <h3>登录系统</h3>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="52px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" :show-password="showPassword" v-model="ruleForm.password">
                        <!-- <i slot="suffix" class="el-input__icon eyes" :class="showPassword?'el-icon-view':'el-icon-close'" @click="togglePassword"></i> -->
                    </el-input>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <span style="margin-right: 90px;"></span>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
            <div class="forget">忘记密码</div>
        </div>
    </div>
</template>

<script>
import { login } from "@/api/loginApi.js";
export default {
    data() {
        return {


            showPassword: true, // 是否显示密码
            ruleForm: { // 表单数据
                username: '',  // 账号
                password: '',  // 密码
            },
            rules: { // 表单验证规则
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        //格式化菜单数据用于添加到路由表中
        // transformMenuData(menuItems) {
        //     return menuItems.map(item => {
        //         const transformedItem = {
        //             path: item.path || '',
        //             name: item.name || '',
        //             // redirect: item.redirect || '',
        //             meta: item.meta || {},
        //             component:  () => import(`@/views${item.component}`) ,
        //         };
        //         if (item.redirect) {
        //             transformedItem.redirect = item.redirect;
        //         }
        //         if (item.children && item.children.length > 0) {
        //             transformedItem.children = this.transformMenuData(item.children);
        //         }

        //         return transformedItem;
        //     });
        // },
        // 登录提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    login({ username: this.ruleForm.username, password: this.ruleForm.password }).then(res => {
                        if (res.data.code == 200) {
                            // 用transformMenuData吧component的值转换成函数
                            // 用addrouter把路由添加到路由表中
                            // console.log(this.transformMenuData(res.data.data.menuData))
                            this.$store.commit('setUserInfo', res.data.data.userInfo)//把用户信息存到vuex中
                            this.$store.commit('setRouterAuthority', res.data.data.menuData)//把路由表存到vuex中
                            this.$store.commit('addrouter', this.$router)//动态添加路由
                            // this.transformMenuData(res.data.data.menuData).forEach(element => {
                            //     this.$router.addRoute('main', element);
                            // });

                            this.$message({
                                message: '登录成功',
                                type: 'success'
                            });
                            localStorage.setItem('token', res.data.data.token)

                                this.$router.push('/home/echart1')

                            
                        } else {
                            this.$message({
                                message: '账号或密码错误',
                                type: 'error'
                            });
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}

</script>

<style lang="scss" scoped>
.forget {
    margin-left: 250px;
    color: #409EFF;
    cursor: pointer;
}

.demo-ruleForm {
    margin-top: 20px;
}

.main_content {
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .div1 {
        display: flex;
        flex-direction: column;
        align-items: center;
        // justify-content: center;
        width: 400px;
        height: 350px;
        border: 1px solid #ccc;
        border-radius: 20px;
        padding: 20px;
        box-shadow: 0 0 10px rgb(231, 231, 231);

        h3 {
            font-size: 30px;
            font-weight: 600;
            margin-top: 30px;
            margin-bottom: 20px;
        }

        .el-button {
            margin-top: 30px;
            width: 80px;
            margin-left: -30px;
        }
    }

}

.eyes {
    cursor: pointer;
    font-size: 16px;
    // line-height: 20px;
}
</style>>
