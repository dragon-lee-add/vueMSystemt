<template>
  <div>
    <!--背景图片-->
    <img :src="image" class="background"></img>
    <div class="login">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <h1 class="title">
          管理员注册
        </h1>
        <el-form-item label="账 号" prop="userId">
          <el-input type="text" v-model="loginForm.userId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" prop="passWord">
          <el-input type="password" v-model="loginForm.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="sidentify">
          <el-input v-model="loginForm.sidentify" style="width: 50%;float: left;" autocomplete="off"
            placeholder="请输入右侧验证码" />
          <div class="coderight" @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-form-item>
        <el-form-item class="box">
          <el-button type="primary" @click="submitForm('loginForm')">注册</el-button>
          <el-button @click="returnLogin()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import SIdentify from "./identify";
  export default {
    name: 'Login',
    data() {
      const sidentify = (rule, value, callback) => {
        let newVal = value.toLowerCase()
        let identifyStr = this.identifyCode.toLowerCase()
        if (newVal === '') {
          callback(new Error('请输入验证码'))
        } else if (newVal !== identifyStr) {
          callback(new Error('验证码不正确'))
        } else {
          callback()
        }
      };
      return {
        identifyCodes: '1234567890ABCDEFGHIGKLMNoPQRSTUVWXYZ',
        identifyCode: '', //验证码
        image: 'http://localhost:8888/image/background.jpeg',
        loginForm: {
          userId: '',
          passWord: '',
          sidentify: '',
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
          sidentify: [{ required: true, validator: sidentify, trigger: 'blur' }]
        },
      };
    },
    components: {
      SIdentify: SIdentify
    },
    mounted() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    methods: {
      // 生成随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成四位随机验证码
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
        }
      },
      // 切换验证码
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      register() {
        let _this = this;
        this.axios.post('/api/registerUser', {
          userId: _this.loginForm.userId,
          passWord: _this.loginForm.passWord
        }).then(response => {
          if (response.data.length) {
            this.$message({
              message: '恭喜你，注册成功',
              type: 'success'
            });
            this.$router.push("/");
          }
        })

      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this;
            this.axios.get('/api/isRegister', {
              params: {
                userId: _this.loginForm.userId,
              }
            }).then(res => {
              console.log(res.status)
              if (res.data.length) {
                this.$message.error('用户已经注册');
              } else {
                _this.register();
              }
            })
          }
        });
      },
      // resetForm(formName) {
      //   this.$refs[formName].resetFields();
      // }
      returnLogin() {
        this.$router.push('/')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /deep/ .el-form-item__content {
    line-height: 5px;
  }

  .background {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    position: fixed;
    z-index: -1;
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
    border-radius: 15px;
    padding: 3px 3px;
    box-shadow: 5px 5px 5px #aeccee;
    background-color: rgb(246, 250, 250);
  }

  .el-form,
  .title {
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 8px;
    margin-left: 50px;
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