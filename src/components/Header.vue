<template>
    <div class="main">
        <div class="logininformation">
            <el-avatar style="margin: 2px;">
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            <el-dropdown style="margin-left: 10px;">
              <span class="el-dropdown-link">
                  <span>admin</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                   <span @click="eidtuser">修改个人账号</span>
                </el-dropdown-item>
                <el-dropdown-item>
                   <span @click="exitlogin">退出&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <el-dialog :visible.sync="userdialog" append-to-body width="30%"> 
           
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
      return {
          userdialog: false,
      }
    },
    methods: {
        eidtuser() {
            this.userdialog = true;
        },

        exitlogin() {
            console.log('退出');
            this.$router.push({name: 'Login'});
        }
    }
}
</script>

<style scoped>
.main {
    width: 104%;
    height: 45px;
    margin-left: -22px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    /* background-color: #00BF9E; */
}
.logininformation {
    width: 200px;
    height: 45px;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
.el-dropdown-link {
    cursor: pointer;
    color: black;
}
</style>