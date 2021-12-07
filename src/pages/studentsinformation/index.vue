<template>
    <div class="main">
        <div class="head-wrap">
            <el-form :inline="true">
                <el-form-item label="学号">
                    <el-input size="small" v-model="studentid"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input size="small" v-model="name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="getData">查询</el-button>
                </el-form-item>
            </el-form>
            <el-button size="small" type="primary" plain @click="addeditdialog('添加学生信息')">新增</el-button>
        </div>
        <div class="content-wrap">
            <el-table :data="tableData" :header-cell-style="{textAlign: 'center'}" :cell-style="{ textAlign: 'center' }">
                <el-table-column label="序号" width="50">
                    <template slot-scope="scope">
                        {{(currentPage - 1) * pageSize + scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column label="学号" prop="studentid" width="100" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="姓名" prop="name" width="100" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="身份证号码" prop="IDcard" width="200" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="性别" prop="sex" width="100" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="学历" prop="educationalBackground" width="100" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="专业" prop="major" width="150" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="政治面貌" prop="politicCountenance" width="150" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="家庭地址" prop="familyaddress" width="300" :show-overflow-tooltip="true">

                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" type="text" plain icon="el-icon-edit" @click="addeditdialog('修改学生信息', scope.row)">修改</el-button>
                        <el-button size="small" type="text" plain icon="el-icon-view" @click="addeditdialog('查看学生信息', scope.row)">查看</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogaddedit" append-to-body @close="closeaddeditdialog" :close-on-click-modal="false" width="50%">
            <el-form :model="form" :rules="rules" ref="form">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="学号" prop="studentid">
                            <el-input v-model="form.studentid" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="身份证号码" prop="IDcard">
                            <el-input v-model="form.IDcard" :maxlength="18" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="form.sex" style="width: 100%;" :disabled="disabled">
                                <el-option v-for="v in sexoption" :label="v.label" :value="v.value" :key="v.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="学历" prop="educationalBackground">
                            <el-select v-model="form.educationalBackground" style="width: 100%;" :disabled="disabled">
                                <el-option v-for="v in educationalBackgroundoption" :label="v.label" :value="v.value" :key="v.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="专业" prop="major">
                            <el-input v-model="form.major" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="政治面貌" prop="politicCountenance">
                            <el-select v-model="form.politicCountenance" style="width: 100%;" :disabled="disabled">
                                <el-option v-for="v in politicCountenanceoption" :label="v.label" :value="v.value" :key="v.label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11" :offset="2">
                        <el-form-item label="家庭地址" prop="familyaddress">
                            <el-input v-model="form.familyaddress" :disabled="disabled"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="本人头像">
                        <el-upload action="#" ref="upload" list-type="picture-card" :auto-upload="false" :on-change="onChange" :limit="1" :on-exceed="onExceed"  :file-list="fileUploadList" :disabled="disabled">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                    </el-form-item>
                </el-row>
                <el-row>
                    <div style="float: right;">
                        <el-button size="small" v-if="this.title == '添加学生信息' || this.title == '修改学生信息'" type="primary" @click="sureaddeditdialog('form')">确定</el-button>
                        <el-button size="small" v-if="this.title == '添加学生信息' || this.title == '修改学生信息'" type="primary" @click="cancaladdeditdialog" plain>取消</el-button>
                        <el-button size="small" v-if="this.title == '查看学生信息'" type="primary" @click="cancaladdeditdialog" plain>关闭</el-button>
                    </div>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import {searchstudent, addstudent, updatastudent, removestudent, countstudent} from '../../api/studentsinformation';
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            total: 0,
            studentid: '',
            name: '',
            dialogaddedit: false,
            title: '',
            disabled: false,
            fileUploadList: [],
            form: {
                id: '',
                studentid: '',
                name: '',
                IDcard: '',
                sex: '',
                educationalBackground: '',
                major: '',
                politicCountenance: '',
                familyaddress: '',
            },
            rules: {
                studentid: [
                    {
                        required: true,
                        pattern: '^\\d+$',
                        message: '请正确输入学号',
                        trigger: 'blur',
                    }
                ],
                name: [
                    {
                        required: true,
                        message: '请输入学号',
                        trigger: 'blur',
                    }
                ],
                IDcard: [
                    {
                        required: true,
                        pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
                        message: '请正确输入身份证号码',
                        trigger: 'blur',
                    }
                ],
                sex: [
                    {
                        required: true,
                        message: '请选择性别',
                        trigger: 'blur',
                    }
                ],
                educationalBackground: [
                    {
                        required: true,
                        message: '请选择学历',
                        trigger: 'blur',
                    }
                ],
                major: [
                    {
                        required: true,
                        message: '请输入专业名称',
                        trigger: 'blur',
                    }
                ],
                politicCountenance: [
                    {
                        required: true,
                        message: '请选择政治面貌',
                        trigger: 'blur',
                    }
                ],
                familyaddress: [
                    {
                        required: true,
                        message: '请输入家庭地址',
                        trigger: 'blur',
                    }
                ],
            },
            sexoption: [
                {
                    label: '男',
                    value: '男',
                },
                {
                    label: '女',
                    value: '女',
                },
            ],
            educationalBackgroundoption: [
                {
                    label: '小学',
                    value: '小学',
                },
                {
                    label: '初中',
                    value: '初中',
                },
                {
                    label: '高中',
                    value: '高中',
                },
                {
                    label: '大专',
                    value: '大专',
                },
                {
                    label: '本科',
                    value: '本科',
                },
                {
                    label: '研究生',
                    value: '研究生',
                },
            ],
            politicCountenanceoption: [
                {
                    label: '群众',
                    value: '群众',
                },
                {
                    label: '共青团员',
                    value: '共青团员',
                },
                {
                    label: '预备党员',
                    value: '预备党员',
                },
                {
                    label: '中共党员',
                    value: '中共党员',
                },
            ]
        }
    },

    mounted() {
        this.getData();
    },

    methods: {
        getData(params) {
            var params = {
                studentid: this.studentid,
                name: this.name,
                current: this.currentPage,
                size: this.pageSize,
            }
            if(this.studentid != '') {
                params.current = 1;
            }
            if(this.name != '') {
                params.current = 1;
            }
            searchstudent.search(params).then(res => {
                console.log(res);
                this.tableData = res.data;
            });

            countstudent.count().then(res => {
                this.total = res.data[0].total;
            })
        },

        search() {
            // var params = {
            //     studentid: this.studentid,
            //     name: this.name,
            // }
            // this.getData(params);
        },

        addeditdialog(dialogtitle, val) {
            if(dialogtitle == '添加学生信息') {
                this.title = dialogtitle;
                this.disabled = false;
                this.dialogaddedit = true;
            }else if(dialogtitle == '修改学生信息') {
                this.title = dialogtitle;
                this.disabled = false;
                this.form = {...val}
                this.dialogaddedit = true;
            }else if(dialogtitle == '查看学生信息') {
                this.title = dialogtitle;
                this.disabled = true;
                this.form = {...val};
                this.dialogaddedit = true;
            }
        },

        sureaddeditdialog(val) {
            this.$refs[val].validate(valid => {
                if(valid) {
                    if(this.title == '添加学生信息') {
                        addstudent.add(this.form).then(res => {
                            this.$message({
                                type: 'success',
                                message: '新增成功!'
                            });
                            this.getData();
                        })
                        this.dialogaddedit = false;
                    }else if(this.title  == '修改学生信息'){
                        updatastudent.updata(this.form).then(res => {
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            this.getData();
                        })
                        this.dialogaddedit = false;
                    }
                }
            })
            //this.$refs.upload.clearFiles();
            console.log('成功');
            console.log(this.$refs);
        },

        cancaladdeditdialog() {
            this.dialogaddedit = false;
            this.form = {};
            this.$refs.upload.clearFiles();
        },

        closeaddeditdialog() {
            this.dialogaddedit = false;
            this.form = {};
            this.$refs.upload.clearFiles();
        },

        removeMessageBox(val) {
            this.$confirm('确定删除学生信息?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removestudent.remove(val.id).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.getData();
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        onExceed() {
            this.$message({
                type: 'warning',
                message: '只能上传一张图片',
            });
        },

        onChange(file, fileList) {
            let testFile = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
            if(testFile != 'jpg' && testFile != 'jpeg' && testFile != 'png') {
                this.$refs.upload.clearFiles();
                this.$message({
                    type: 'warning',
                    message: '上传格式只能是jpeg/jpg/png!',
                });
            }else {
                this.$message({
                    type: 'success',
                    message: '上传成功',
                });
            }
        },

        handleCurrentChange(val) {
            console.log(val);
            this.currentPage = val;
            this.getData();
        }
    }
}
</script>

<style scoped>
    .head-wrap {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
    }
</style>