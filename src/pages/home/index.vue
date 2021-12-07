<template>
    <div class="main">
        <div class="login-box">
            <img :src="bgImg" width="100%" height="100%" alt/>
        </div>
        <!-- <div class="title">
            <span style="font-size: 40px; color: #00BF9E;">欢 迎 使 用</span>
            <span style="font-size: 20px; color: #00BF9E;">学    生    管    理    系    统</span>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            bgImg: require('../../assets/img/bg2.jpg'),
        }
    }
}
</script>

<style scoped>
    /* .main {
        display: flex;
        flex-direction: row-reverse;
        padding-right: 700px;
    } */
    /* .login-box {
        width: 100%;
        height: 100%;
        z-index: -1;
        position: fixed;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
    } */
    .title {
        width: 400px;
        height: 50px;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* padding: 120px; */
    }
</style>