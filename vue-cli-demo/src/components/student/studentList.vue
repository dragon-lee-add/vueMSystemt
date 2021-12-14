<template>
    <div id="content">
        <el-card class="box-card">
            <el-form :inline="true" label-width="128px" class="form">
                <el-col :span="8">
                    <el-form-item label="学号" prop="">
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="姓名" prop="">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="学院" prop="">
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
                <el-form-item label="日期">
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center">至</el-col>
                    <el-col :span="10">
                        <el-date-picker type="date" placeholder="选择日期" style="width: 100%;" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="cyan" icon="el-icon-search" size="mini">搜索</el-button>
                    <el-button icon="el-icon-refresh" size="mini">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <!--列表-->
        <el-row class="list-card">
            <el-col :span="24">
                <el-card>
                    <el-table :data="pageList" style="width: 100%" max-height="400">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column fixed prop="stuName" label="姓名" width="120">
                        </el-table-column>
                        <el-table-column prop="stuNum" label="学号" width="140">
                        </el-table-column>
                        <el-table-column prop="stuSex" label="性别" width="100">
                        </el-table-column>
                        <el-table-column prop="stuAge" label="年龄" width="100">
                        </el-table-column>
                        <el-table-column  prop="date" label="入学日期" width="150">
                        </el-table-column>
                        <el-table-column prop="class" label="所属班级" width="120">
                        </el-table-column>
                        <el-table-column prop="college" label="所属学院" width="160">
                        </el-table-column>
                        <el-table-column prop="stuAddr" label="住址" width="200">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="320">
                            <template slot-scope="scope">
                                <el-button type="warning" size="medium">
                                    移除
                                </el-button>
                                <el-button type="primary" size="medium">
                                    修改
                                </el-button>
                                <el-button type="info" size="medium">
                                    查看
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                    <!--分页-->
                    <diV style="float: right;margin: 10px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                            :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
                            layout="total, sizes, prev, pager, next, jumper" :total="this.tableData.length">
                        </el-pagination>
                    </diV>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: 'studentList',
        data() {
            return {
                input: "",
                currentPage: 1,
                pageSize: 4,
                pageList: [],//分页数组
                tableData: []
            }
        },
        created() {
            this.getList()
        },
        mounted() {

        },
        methods: {
            getList() {
                this.axios.post('/api/student/list', {}).then(res => {
                    this.tableData = res.data
                    this.currentChangePage(this.tableData, 1);
                })
            },
            //分页
            handleSizeChange: function (pageSize) { // 每页条数切换
                this.pageSize = pageSize
                this.handleCurrentChange1(this.currentPage1);
            },
            handleCurrentChange: function (currentPage) {//页码切换
                this.currentPage1 = currentPage
                this.currentChangePage(this.tableData, currentPage)
            },
            currentChangePage(list, currentPage) {
                let from = (currentPage - 1) * this.pageSize;
                let to = currentPage * this.pageSize;
                this.pageList = [];
                for (; from < to; from++) {
                    if (list[from]) {
                        this.pageList.push(list[from]);
                    }
                }
            }
        },
    }

</script>

<style scoped>
    #content {
        width: 100%;
        height: 100%;
    }

    .list-card {
        height: 60%;
        margin: 20px 40px 0px 40px;
    }

    .box-card {
        height: 25%;
        margin: 20px 40px 0px 40px;
    }

    .form {
        margin-top: 15px;
    }
</style>