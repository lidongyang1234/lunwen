<template>
    <div class="main">
                    <div class="head-wrap">
                        <el-form :inline="true">
                            <el-form-item>
                                <el-input size="small" v-model="name" placeholder="请输入课程名称"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button size="small" type="primary" @click="getData">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <el-button size="small" type="primary" plain @click="addeditdialog('添加课程信息')">新增</el-button>
                    </div>
                    <div class="content-wrap">
                        <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                            <el-table-column label="序号">
                                <template slot-scope="scope">
                                    {{(currentPage - 1) * pageSize + scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="课程名称" prop="name">

                            </el-table-column>
                            <el-table-column label="课程类型" prop="type">

                            </el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="small" type="text" plain icon="el-icon-edit" @click="addeditdialog('修改课程信息', scope.row)">修改</el-button>
                                    <el-button size="small" type="text" plain icon="el-icon-view" @click="addeditdialog('查看课程信息', scope.row)">查看</el-button>
                                    <el-button size="small" type="text" plain icon="el-icon-delete" @click="removeMessageBox(scope.row)">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-row>
                            <div style="margin-top: 20px; float: left; font-size: 15px; color: gray;">
                                共{{total}}条记录，第{{currentPage}}页
                            </div>
                        </el-row>
                        <el-row style="display: flex; flex-direction: row-reverse;">
                            <div>
                                <el-pagination layout="prev, pager, next" background :page-size="pageSize" @current-change="handleCurrentChange" :total="total" ></el-pagination>
                            </div>
                        </el-row>
                    </div>
                    <el-dialog :visible.sync="dialogaddedit" :title="title" append-to-body @close="closeaddeditdialog" :close-on-click-modal="false" width="50%">
                        <el-form :model="form" :rules="rules" ref="form">
                            <el-row>
                                <el-col :span="24">
                                    <el-form-item label="课程名称" prop="name">
                                        <el-input v-model="form.name" :disabled="disabled"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="24">
                                    <el-form-item label="课程类型" prop="type">
                                        <el-select style="width: 100%;" v-model="form.type" :disabled="disabled">
                                            <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <div style="float: right;">
                                    <el-button size="small" v-if="this.title == '添加课程信息' || this.title == '修改课程信息'" type="primary" @click="sureaddeditdialog('form')">确定</el-button>
                                    <el-button size="small" v-if="this.title == '添加课程信息' || this.title == '修改课程信息'" type="primary" @click="cancaladdeditdialog" plain>取消</el-button>
                                    <el-button size="small" v-if="this.title == '查看课程信息'" type="primary" @click="cancaladdeditdialog" plain>关闭</el-button>
                                </div>
                            </el-row>
                        </el-form>
                    </el-dialog>
    </div>
</template>

<script>
import Header from '../../components/Header.vue'
import NavMeny from '../../components/NavMeny.vue'
import {searchcourse, addcourse, updatacourse, removecourse, countacourse} from '../../api/course';
import axios from 'axios';
export default {


    data() {
        return {
            aa: '',
            title: '',
            dialogaddedit: false,
            disabled: false,
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            name: '',
            removeid: '',
            form: {
                id: '',
                name: '',
                type: '',
            },
            options: [
                {
                    label: '编程',
                    value: 1,
                },
                {
                    label: '设计',
                    value: 2,
                },
                {
                    label: '语言',
                    value: 3,
                },
                {
                    label: '交通',
                    value: 4,
                },
                {
                    label: '服务',
                    value: 5,
                },
                {
                    label: '飞行',
                    value: 6,
                },
                {
                    label: '医学',
                    value: 7,
                },
                {
                    label: '艺术设计',
                    value: 8,
                },
                {
                    label: '财务管理',
                    value: 9,
                },
            ],
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入课程名称',
                        trigger: 'blur',
                    }
                ],
                type: [
                    {
                        required: true,
                        message: '请输入课程类型',
                        trigger: 'blur',
                    }
                ]
            }
        }
    },

    components: {
        Header,
        NavMeny,
    },

    mounted() {
        this.getData();
    },

    methods: {

        getData() {
            var params = {
                name: this.name,
                current: this.currentPage,
                size: this.pageSize,
            };
            if(this.name != '') {
                this.currentPage = 1;
                params.current = 1;
            };
            searchcourse.search(params).then(res => {
                this.tableData = res.data;
            }).catch(err => {
                console.log(err);
            });

            countacourse.count().then(res => {
                console.log('总条数');
                console.log(res);
                this.total = res.data[0].total;
            });
        },




        addeditdialog(dialogtitle, val) {
            if(dialogtitle == '添加课程信息') {
                this.title = dialogtitle;
                this.disabled = false;
                this.dialogaddedit = true;
            }else if(dialogtitle == '修改课程信息') {
                this.title = dialogtitle;
                this.disabled = false;
                this.dialogaddedit = true;
                this.form = {...val}
            }else if(dialogtitle == '查看课程信息') {
                this.title = dialogtitle;
                this.disabled = true;
                this.dialogaddedit = true;
                this.form = {...val}
            }
        },

        sureaddeditdialog(val) {
            this.$refs[val].validate(valid => {
                if(valid) {
                    if(this.title == '添加课程信息') {
                        addcourse.add(this.form).then(res => {
                            this.$message({
                                message: '添加成功',
                                type: 'success'
                            });
                            this.getData();
                        })
                        this.form = {};
                        this.dialogaddedit = false;
                    }else if(this.title == '修改课程信息') {
                        updatacourse.updata(this.form).then(res => {
                            this.$message({
                                message: '修改成功',
                                type: 'success'
                            });
                            this.getData();
                        })
                        this.form = {};
                        this.dialogaddedit = false;
                    }
                }
            })
        },

        cancaladdeditdialog() {
            this.dialogaddedit = false;
            this.form = {};
        },

        closeaddeditdialog() {
            this.dialogaddedit = false;
            this.form = {};
        },



        removeMessageBox(val) {
            this.removeid = val.id;
            this.$confirm('确认删除课程信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                closeOnClickModal: false,
            }).then(() => {
                removecourse.remove(this.removeid).then(res => {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getData();
                })
            })
        },




        handleCurrentChange(val) {
            this.currentPage = val;
            this.getData();
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
        z-index: -1000;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
    }
    .el-header{
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 80px;
        height: 80px !important;
    }
  
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }

</style>