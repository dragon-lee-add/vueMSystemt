<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)" >
        <el-menu default-active=""  router background-color="#545c64" text-color="#fff">
          <el-menu-item index="Echarts" style="background:#333; font-size:22px">
            <i class="el-icon-s-help"></i>
            Vue管理系统
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>系统管理</template>
            <el-menu-item index="DataAnalysis">数据分析</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>产品管理 </template>
            <el-menu-item index="2-1">产品信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>客户管理</template>
            <el-menu-item index="3-1">客户信息</el-menu-item>
          </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--右侧-->
      <el-container>
        <el-header>
          <div class="userBox">
            <el-dropdown>
              <el-button style="font-size: 18px;">
                <i class="el-icon-user-solid"></i>
                <a>{{Name}}</a>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <a @click="setUp()">
                  <el-dropdown-item>设置</el-dropdown-item>
                </a>
                <a @click="loginOut()">
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </a>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <router-view />
      </el-container>
    </el-container>

    <!--子组件-->
    <setUpDialog ref="childSetUp"></setUpDialog>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import setUpDialog from '../components/setup/setUpDialog'
  export default {
    components: {
      setUpDialog
    },
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      };
    },
    computed: {
      Name() {
        return this.$store.getters.getName;
      }
    },
    mounted() {
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store")) {
        this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        sessionStorage.setItem("store", JSON.stringify(this.$store.state))
      })
    },
    methods: {
      setUp() {
        this.$refs.childSetUp.show();

      },
      loginOut() {
        window.sessionStorage.removeItem("isLogin");
        this.$router.push("/")
      }
    }
  };
</script>

<style>
  .el-header {
    background-color: #7f95a3;
    height: 56px !important;

  }


  .el-menu {
    border-right: 0;
  }

  .el-aside {
    background-color: #545c64 !important;
  }

  html,
  body,
  #app,
  .index {
    height: 100%;
  }

  .el-container {
    height: 100% !important;
  }

  .text-top {
    text-align: center;
    padding: 40px 0px;
    background-color: #000;

  }

  .userBox {
    float: right;
    line-height: 60px;
  }

  .el-dropdown {
    vertical-align: top;
  }

  .el-dropdown+.el-dropdown {
    margin-left: 15px;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>