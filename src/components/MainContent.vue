<template>
    <div class="main">
        <!-- <el-breadcrumb style="margin-bottom: 10px;" separator="" :replace="true">
            <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in NavMenuList" :to="item.router" :key="item.path">{{item.name}}</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- {{this.$store.state.counter}} -->
        {{this.$store.state.conmponentlist}}
        <!-- <el-tabs v-model="editableTabsValue" type="card" editable @edit="handleTabsEdit">
            <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
                {{item.content}}
            </el-tab-pane>
        </el-tabs> -->
        <el-tabs v-model="editableTabsValue" type="card" closable @edit="handleTabsEdit" @tab-click="tabClick">
            <el-tab-pane label="首页"></el-tab-pane>
            <el-tab-pane
                :key="item.name"
                v-for="(item, index) in editableTabs"
                :label="item.title"
                :name="item.name"
            >
            </el-tab-pane>
        </el-tabs>
        <router-view/>
    </div>
</template>

<script>
import {menuList} from '../api/menu.js'
export default {
    data() {
      return {
            NavMenuList: [],

            editableTabsValue: '1',
            editableTabs: [{
            title: 'Tab 1',
            name: '1',
            content: 'Tab 1 content'
            }, {
            title: 'Tab 2',
            name: '2',
            content: 'Tab 2 content'
            }],
            tabIndex: 2
      }
    },

    watch: {
        // $route() {
        //     this.getBreadcrumb();
        // }
    },

    created() {
        // this.getBreadcrumb();
    },

    mounted() {
        this.getData();
    },

    computed() {

    },

    methods: {
      getData() {
            menuList.menulist().then(res => {
                console.log('面包屑加载中...');
                //console.log(res.data);
                res.data.forEach(element => {
                    this.NavMenuList.push(element.children);
                    element.children.forEach(childrenelement => {
                        this.NavMenuList.push(childrenelement);
                    })
                });
            })
      },
      // getBreadcrumb() {
      //     let matched = this.$route.matched.filter(item => item.name);
      //     this.menuList = matched;
      // },

      tabhomeClick() {
        alert()
      },

      tabClick(val) {
          this.$router.push({name: 'home'});
      },

      handleTabsEdit(targetName, action) {
        if (action === 'add') {
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: 'New Tab',
            name: newTabName,
            content: 'New Tab content'
          });
          this.editableTabsValue = newTabName;
        }
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        }
      }
    }
}
</script>

<style scoped>
    /* .el-breadcrumb {
        
    } */
    .el-breadcrumb__item {
        /* background: red; */
    }
</style>