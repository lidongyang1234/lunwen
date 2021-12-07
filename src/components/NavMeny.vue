<template>
    <div>
        <div class="headmenu">
            <el-col style="height: 100%;">
                <el-menu background-color="#545c64" :default-active="$route.path" style="height: 100%;" text-color="#fff" active-text-color="#545c64" router>
                    <div class="systemtitle">
                        <span>学生管理系统</span>
                    </div>
                    <el-submenu :index="firstitem.id" class="submenu" v-for="firstitem in mentitemList" :key="firstitem">
                        <template slot="title">
                            <i :class="firstitem.icon"></i>
                            <span>{{firstitem.name}}</span>
                        </template>
                        <el-menu-item-group class="menugroup" v-for="seconditem in firstitem.children" :key="seconditem">
                            <el-menu-item :index="seconditem.router">
                                <i :class="seconditem.icon"></i>
                                <span>{{seconditem.name}}</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-col>
        </div>
    </div>
</template>

<script>
import {menuList} from '../api/menu.js'
export default {
    data() {
        return {
            mentitemList: []
        }
    },

    mounted() {
        this.getData()
    },

    methods: {
        getData() {
            menuList.menulist().then(res => {
                console.log('菜单加载中...');
                this.mentitemList = res.data;
                console.log(this.mentitemList);
            })
        },
    }
}
</script>

<style scoped>
*{
    margin: 0;
}
html,
body {
    margin: 0;
}
*{
    margin: 0;
}
.headmenu {
    height: 100vh;
}
.systemtitle {
    width: 100%;
    font-size: 25px;
    height: 80px;
    color: #1BEFCB;
    line-height: 80px;
}
.el-menu-item {
    width: 100%;
}
.submenu {
    text-align: left;
}
.menugroup {
    text-align: center;
    width: 90% !important;
    margin-left: -8px;
}
.el-menu-item.is-active {
    color: white !important;
    background-color: #23d8ba !important; 
}
</style>