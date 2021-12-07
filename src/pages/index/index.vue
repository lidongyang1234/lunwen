<template>
    <div class="main">
        <el-container class="container">
            <el-aside width="200px">
                <NavMeny></NavMeny>
            </el-aside>
            <el-container>
                <el-header>
                    <Header></Header>
                </el-header>
                <el-main>
                    <MainContent></MainContent>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

import NavMeny from '../../components/NavMeny.vue'
import MainContent from '../../components/MainContent.vue'
import Header from '../../components/Header.vue'
export default {
    data() {
        return {
            
        }
    },

    components: {
        Header,
        NavMeny,
        MainContent,
    },

    mounted() {
        this.getData()
    },

    methods: {
      getData() {
    
      },
    }
}
</script>

<style scoped>
    .head-wrap {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .container {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1000;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
    }
    .el-header{
        /* background-color: #B3C0D1; */
        color: #333;
        text-align: center;
        line-height: 45px;
        height: 45px !important;
    }
  
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
</style>