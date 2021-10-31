<template>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="25%" :close-on-click-modal="false">
        <el-row style="margin-left: 60px">
            <el-col :span="24">
                <el-form label-width="80px" :model="formLabelAlign" ref="formLabelAlign" :label-position="labelPosition" >
                    <el-form-item label="当前用户:">
                        <el-tag>{{Name}}</el-tag>
                    </el-form-item>
                    <el-form-item label="旧密码:" prop="oldPwd">
                        <el-input v-model="formLabelAlign.oldPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:" prop="newPwd">
                        <el-input v-model="formLabelAlign.newPwd"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align: center;">
                <el-button @click="resetForm('formLabelAlign')">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        name: 'setUpDialog',
        data() {
            return {
                dialogVisible: false,
                labelPosition: 'left',
                formLabelAlign: {
                    newPwd: '',
                    oldPwd: ''
                }
            }
        },
        computed: {
            Name() {
                return this.$store.getters.getName;
            }
        },
        methods: {
            //重置输入框
            reset(){
                this.newPwd=null;
                this.oldPwd=null;
            },
            show() {
                this.dialogVisible = true;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false;
            }
        },
    }
</script>

<style scoped>
    .el-input {
        width: 80% !important;
    }
</style>