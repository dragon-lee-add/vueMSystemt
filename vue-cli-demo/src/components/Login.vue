<template>
  <div class="login">
    <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
      <h1 class="title">
        <i class="el-icon-s-promotion"></i>
        用户登录
      </h1>
      <el-form-item label="账 号" prop="userId">
        <el-input type="text" v-model="loginForm.userId" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="passWord">
        <el-input type="password" v-model="loginForm.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="rememberPwd">
        <div class="remberBox">
          <el-checkbox v-model="loginForm.remember" />
          记住密码
        </div>
      </el-form-item>
      <el-form-item class="box">
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        <el-button type="primary" @click="registerBtn()">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          userId: '',
          passWord: '',
          remember: false
        },
        rules: {
          userId: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 5, max: 12, message: '长度在 5 到 12 个字符', trigger: 'blur' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 16, message: '长度在 5 到 16个字符', trigger: 'blur' }
          ],

        },
      };
    },
    components: {

    },
    mounted() {

    },
    created() {
      let account = sessionStorage.getItem("userId")
      let password = sessionStorage.getItem("passWord")
      // 如果存在赋值给表单，并且将记住密码勾选
      if (account) {
        this.loginForm.userId = account
        this.loginForm.passWord = password
        this.loginForm.remember = true
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            this.axios.post('/api/checklogin', {
              userId: _this.loginForm.userId,
              passWord: _this.loginForm.passWord
            }).then(response => {
              if (response.data.length) {
               
                if (this.loginForm.remember == true) {
                  sessionStorage.setItem("userId", this.loginForm.userId);
                  sessionStorage.setItem("passWord", this.loginForm.passWord);
                }
                sessionStorage.setItem('isLogin',1);//登录判断,自定义赋值
                this.$store.dispatch('saveUserInfo', response.data[0].userId);//请求回来后，把用户信息存储到VUEX里
                //页面跳转
                this.$router.push("/Echarts");
                this.$message({
                  message: '恭喜你，登录成功',
                  type: 'success'
                });
              }
              else {
                this.$message.error('请检查用户名或密码');
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      registerBtn() {
        this.$router.push("/Register");
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /deep/ .el-form-item__content {
    line-height: 5px;
  }

  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .el-form {
    width: 400px;

    border-radius: 9px;
    padding: 3px 3px;
    box-shadow: 5px 5px 5px #e2dede;
    background-color: rgb(169, 243, 243);
  }

  .el-form,
  .title {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 20px;
  }

  .el-form,
  .box {
    padding-right: 55px;
    line-height: 10px;
  }

  .remberBox {
    float: left;
  }
</style>