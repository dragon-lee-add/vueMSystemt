<template>
    <div>
        <el-dialog title="会员登记" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false">
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                <el-row :gutter="2">
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="memberName">
                            <el-input v-model="form.memberName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="memberSex">
                            <el-input v-model="form.memberSex"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="12">
                        <el-form-item label="年龄" prop="memberAge">
                            <el-input v-model="form.memberAge"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row :gutter="10">
                    <el-col :span="10">
                        <el-form-item label="会员号" prop="memberNum">
                            <el-input v-model="form.memberNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14">
                        <el-form-item label="住址" prop="memberAddr">
                            <el-input v-model="form.memberAddr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <div style="text-align: center;">
                            <el-button type="primary" @click="addMember()">登记</el-button>
                            <el-button @click="resetForm('form')">取消</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'Registration',
        data() {
            return {
                dialogVisible: false,
                form: {
                    memberName: '',
                    memberSex: '',
                    memberAge: "",
                    phone: "",
                    memberNum: "",
                    memberAddr: ""
                },
                rules: {
                    memberName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    memberSex: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ],
                    memberAge: [
                        { required: true, message: '请输入年龄', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入电话', trigger: 'blur' }
                    ],
                    memberNum: [
                        { required: true, message: '请输入会员号', trigger: 'blur' }
                    ],
                    memberAddr: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {

        },
        methods: {
            addMember() {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post('/api/member/addMember', {
                            memberName: this.form.memberName,
                            memberSex: this.form.memberSex,
                            memberAge: this.form.memberAge,
                            phone: this.form.phone,
                            memberNum: this.form.memberNum,
                            memberAddr: this.form.memberAddr
                        }).then(res => {
                            this.dialogVisible = false
                            this.$parent.getList();
                        })
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false
            }
        },
    }
</script>


<style>

</style>