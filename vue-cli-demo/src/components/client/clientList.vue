<template>
    <div id="content">
        <div class="boxOne">

        </div>
        <el-card class="box-card">
            <el-table :data="tableData" style="width: 100%" max-height="400">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column fixed prop="date" label="日期" width="150">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120">
                </el-table-column>
                <el-table-column prop="province" label="省份" width="120">
                </el-table-column>
                <el-table-column prop="city" label="市区" width="120">
                </el-table-column>
                <el-table-column prop="address" label="地址" width="300">
                </el-table-column>
                <el-table-column prop="zip" label="邮编" width="120">
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
            <diV class="el-page">
                <el-pagination background layout="prev, pager, next" :total="100" > </el-pagination>
            </diV>
           
        </el-card>
    </div>
</template>

<script>
    export default {
        name: 'clientList',
        data() {
            return {
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }]
            }
        }
    }

</script>

<style scoped>
    #content {
        width: 100%;
        height: 100%;
    }

    .boxOne {
        width: 100%;
        height: 35%;

    }

    .box-card {
        height: 60%;
        margin-left: 40px;
        margin-right: 40px;
    }

    .el-page {
     text-align: center;
     margin-top: 280px;
    }
</style>