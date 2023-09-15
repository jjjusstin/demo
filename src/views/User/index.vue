<template>
    <div class="content">
        <div class="top_content">
            <div class="top_left">
                <el-button @click="addButton" type="primary" icon="el-icon-plus">
                    新增
                </el-button>
            </div>
            <div class="top_right">
                <el-input class="custom_input" v-model="searchInput" placeholder="请输入姓名查询"></el-input>
                <el-button @click="searchName('s')" type="primary" icon="el-icon-search">
                    搜索
                </el-button>
                <el-button @click="searchName('c')" type="primary">
                    重置
                </el-button>
            </div>
        </div>
        <!-- 新增对话框 -->
        <el-dialog title="新增" :visible.sync="dialogVisible" width="750px"  :close-on-click-modal="false"
            :before-close="handleClose">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model.number="ruleForm.age"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="gender">
                            <el-select style="width: 100%;" v-model="ruleForm.gender" placeholder="请选择性别">
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="date1">
                            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="地址" prop="address">
                    <el-input v-model="ruleForm.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="quxiao('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>

        <div class="bottom_content">
            <!-- 表格 -->
            <el-table stripe :data="tableData" style="width: 100%" height="650">
                <el-table-column prop="name" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="150">
                </el-table-column>
                <el-table-column prop="gender" label="性别" width="150">
                    <template slot-scope="scope">
                        <span>{{ scope.row.gender ? '男' : '女' }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="date1" label="注册日期" width="300">
                    <template slot-scope="scope">
                        <span>{{ formatDate(new Date(scope.row.date1)) }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <el-table-column label="操作" width="150" fixed="right" >
                    <template slot-scope="scope">
                        <el-button v-permission="'SuperAdmin'" @click="editClick(scope.row)" size="small">编辑</el-button>
                        <span style="margin: 0 8px;"></span>
                        <el-popconfirm title="确定要删除吗？" confirmButtonText="确定" cancelButtonText="取消"
                            @confirm="handleDelete(scope.row)">
                            <el-button v-permission="'SuperAdmin'" slot="reference" type="danger" size="small">删除</el-button>
                        </el-popconfirm>

                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                :current-page="oagination.page" :page-sizes="[10, 20, 50, 100]" :page-size="10"
                layout="total, sizes, prev, pager, next, jumper" :total="oagination.total">
            </el-pagination>
            </div>
            
        </div>
    </div>
</template>

<script>
import {
    getTableData,
    deleteTableData,
    addTableData,
} from "@/api/userApi.js";
export default {
    mounted() {
        this.getTableData()
    },
    data() {
        return {
           oagination: { //分页
                page: 1,
                limit: 10,
                total: 0,
            },
            searchInput: '',// 搜索框
            tableData: [],// 表格数据
            dialogVisible: false,  // 新增对话框
            ruleForm: { // 新增,修改 表单
                name: '',
                gender: '',
                date1: '',
                address: '',
                age: '',
            },
            rules: {// 表单验证
                name: [
                    { required: true, validator: this.nameProp, trigger: 'blur' },
                ],
                gender: [
                    { required: true, validator: this.genderProp, trigger: 'change' },
                ],
                date1: [
                    { required: true, validator: this.date1Prop, trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '地址不能为空', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '年龄不能为空', trigger: 'blur' },
                    { type: 'number', message: '年龄必须为数字值', trigger: 'blur' }
                ],

            }

        }
    },
    methods: {
        //分页 每页多少条
        handleSizeChange(val) {
        this.oagination.limit = val
        this.getTableData()
      },
      //分页 页数
      handleCurrentChange(val) {
        this.oagination.page = val
        this.getTableData()
      },
    
        // 搜索
        searchName(x) {
            if (x == 'c') {
                this.searchInput = ''
            }
            getTableData({ page: this.oagination.page, 
                           limit: this.oagination.limit, 
                           searchName: this.searchInput 
                        }).then(res => {
                // console.log(res.data.data)
                if (res.data.code == 200) {
                    this.tableData = res.data.data.arr
                }
            })
        },
        //取消按钮
        quxiao(ruleForm) {
            this.dialogVisible = false
            this.resetForm(ruleForm)
        },
        //删除
        handleDelete(row) {
            deleteTableData({ ids: row.id }).then(res => {
                if (res.data.code == 200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    this.getTableData()
                }
            })

        },
        // 格式化table的data1日期
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return `${year}-${month}-${day}`;
        },
        // 新增修改表单提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    // console.log(this.ruleForm.date1);
                    // this.ruleForm.date1 = this.formatDate(this.ruleForm.date1)
                    addTableData(this.ruleForm).then(res => {
                        if (res.data.code == 200) {
                            this.$message({
                                message: res.data.message,
                                type: 'success'
                            });
                            this.dialogVisible = false
                            this.getTableData()
                            this.resetForm(formName)
                        }
                    })


                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置表单
        resetForm(formName) {    
            this.ruleForm = {
                name: null,
                gender: null,
                date1: null,
                address: null,
                age: null,
            }
            this.$refs[formName].resetFields();
        },


        // 表单验证出生日期
        date1Prop(rule, value, callback) {
            if (value === '') {
                callback(new Error('请选择出生日期'))
            } else {
                callback();
            }
        },
        // 表单验证名字
        nameProp(rule, value, callback) {
            // console.log(value)
            let pattern = /^(?:[\u4e00-\u9fa5·]{2,16})$/
            if (value === '') {
                callback(new Error('请输入活动名称'))
            } else if (!pattern.test(value)) {
                callback(new Error('请输入正确的姓名格式'));
            } else {
                callback();
            }
        },
        // 表单验证性别
        genderProp(rule, value, callback) {
            if (value === '') {
                callback(new Error('请选择性别'))
            } else {
                callback();
            }
        },
        // 新增按钮
        addButton() {
            this.dialogVisible = true
        },
        // 新增对话框关闭确认
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    this.resetForm('ruleForm')
                    done();
                })
                .catch(_ => { });
        },

        // 获取表格数据
        getTableData() {
            getTableData({ page: this.oagination.page, limit: this.oagination.limit }).then(res => {
                // console.log(res.data.data)
                if (res.data.code == 200) {
                    this.tableData = res.data.data.arr
                    this.oagination.total = res.data.data.total
                    // 循环this.tableData将data1用formatDate格式化
                    // this.tableData.forEach(item => {
                    //     item.date2 = item.date1
                    // });
                    // console.log(this.tableData)

                }
            })
        },
        //编辑
        editClick(row) {
            this.ruleForm = {...row}  //扩展运算符实现浅拷贝 不然在编辑的过程中会影响到tableData
            // this.ruleForm = row
            this.dialogVisible = true
        },


    },
}

</script>

<style lang="scss" scoped>
.pagination{
    text-align: right;
    margin-top: 20px;
}
.custom-form {
    text-align: center;
    /* 将表单内部元素居中 */
}

.el-form-item__content {
    margin-left: 0;
    /* 去掉左边距 */
}

.top_content {

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.custom_input {
    width: 300px;
    margin-right: 20px;
}

.bottom_content {
    width: 100%;
}
</style>