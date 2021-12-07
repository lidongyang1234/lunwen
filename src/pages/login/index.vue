<template>
    <div class="main">
        <div class="login-box">
            <img :src="bgImg" width="100%" height="100%" alt/>
        </div>
        <el-row>
            <!-- <el-col > -->
                <div class="login-form">
                    <div class="formtitle">
                        <span>用户登录</span>
                    </div>
                    <hr class="formhr">
                    <el-row>
                            <el-form  style="width: 100%">
                                <el-row style="padding-left: 25px; margin-top: 10px;">
                                    <el-form-item label="账号">
                                        <el-input style="width: 86%; margin-left: -20px;"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row style="padding-left: 25px; margin-top: 10px;">
                                    <el-form-item label="密码">
                                        <el-input style="width: 86%; margin-left: -20px;"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row style="padding-left: 25px; margin-top: 10px;">
                                    <el-form-item label="验证码">
                                        <el-input style="width: 86%; margin-left: -20px;"></el-input>
                                    </el-form-item>
                                </el-row>
                                <el-row style="margin-top: 10px;">
                                    <el-button type="success" style="width: 90%; height: 45px; font-size: 20px;" @click="login" @keyup.enter.native="login">立即登录</el-button>
                                </el-row>
                            </el-form>
                    </el-row>
                </div>
            <!-- </el-col> -->
        </el-row>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            bgImg: require('../../assets/img/bg1.jpg'),
        }
    },

    mounted() {
        
    },

    methods: {
        login() {
            const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
            });
            setTimeout(() => {
                loading.close();
                this.$router.push({name: 'Index'})
            }, 1500);
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 700px;
}
.login-box {
    width: 100%;
    height: 100%;
    z-index: -1;
    position: fixed;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
}
.login-form {
    width: 550px;
    height: 400px;
    background: white;
    border: 1px #DDDDDD solid;
    border-radius: 5px;
    position: fixed;
    top: 20%;
}
.formtitle {
    font-size: 25px;
    color: #00BF9E;
    padding-top: 30px;
    margin-left: -72%;
}
.formhr {
    margin-top: 31px;
    border-bottom: solid 1px #DDDDDD;
    width: 90%;
}
.el-input__inner {
    /* width: 80% !important;
    margin-top: -80px;
    margin-left: 60px; */
}
</style>