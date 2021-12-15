<template>
    <el-dialog title="修改密码" :visible.sync="dialogVisible" width="25%" :close-on-click-modal="false">
        <el-row style="margin-left: 60px">
            <el-col :span="24">
                <el-form label-width="80px" :model="formLabelAlign" :rules="rules" ref="formLabelAlign"
                    :label-position="labelPosition">
                    <el-form-item label="当前用户:">
                        <el-tag>{{getName.user}}</el-tag>
                    </el-form-item>
                    <el-form-item label="旧密码:" prop="oldPwd">
                        <el-input v-model="formLabelAlign.oldPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码:" prop="newPwd">
                        <el-input v-model="formLabelAlign.newPwd" type="password"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align: center;">
                <el-button @click="resetForm('formLabelAlign')">取 消</el-button>
                <el-button type="primary" @click="upataPwd('formLabelAlign')">确 定</el-button>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
    import { mapGetters, mapState } from 'vuex'
    export default {
        name: 'setUpDialog',
        data() {
            return {
                dialogVisible: false,
                labelPosition: 'left',
                formLabelAlign: {
                    newPwd: '',
                    oldPwd: ''
                },
                rules: {
                    oldPwd: [
                        { required: true, message: '请输入初始密码', trigger: 'blur' },
                        { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
                    ],
                    newPwd: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { min: 5, max: 16, message: '长度在 5 到 12个字符', trigger: 'blur' }
                    ],

                },
            }
        },
        computed: {
            Name() {
                return this.$store.getters.getName;
            },
            ...mapState({
                getName: state => state.user
            })
        },
        mounted() {
         
        },
        methods: {
            upataPwd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.formLabelAlign.oldPwd == this.$store.getters.getPwd) {
                            let _this = this;
                            this.axios.post('/api/updatePwd', {
                                userId: _this.getName.user,
                                passWord: _this.formLabelAlign.newPwd
                            }).then(res => {
                                this.$notify({
                                    title: '提示',
                                    message: '修改成功',
                                    duration: 0
                                });
                                this.dialogVisible = false;
                                this.$router.push('/')
                            })
                        } else {
                            this.$message({
                                showClose: true,
                                message: '初始密码有误',
                                type: 'warning'
                            });
                        }
                    } else {
                        return false;
                    }
                });
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