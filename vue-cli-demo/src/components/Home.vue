<template>
  <div class="index">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="" router background-color="#545c64" text-color="#fff">
          <el-menu-item index="Index" style="background:#333; font-size:22px">
            <i class="el-icon-s-help"></i>
            会员管理系统
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-message"></i>系统管理</template>
            <el-menu-item index="DataAnalysis">数据分析</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>教师管理 </template>
            <el-menu-item index="2-1">教师信息</el-menu-item>
          </el-submenu> -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>会员管理</template>
            <el-menu-item index="memberList">会员信息</el-menu-item>
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

        <el-card class="box-card" v-if="showTags">
          <span class="tags-li" v-for="(item,index) in tagsList" :class="{'active': isActive(item.path)}" :key="index">
            <router-link :to="item.path" class="tags-li-title">
              {{item.name}}
            </router-link>
            <span class="tags-li-icon" @click="closeTags(index)"><i class="el-icon-close"></i></span>
          </span>
          <!-- 其他操作按钮 -->
          <!-- <div class="tags-close-box">
            <el-dropdown @command="handleTags" >
              <el-button style=" height: 40px;">
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu size="small" slot="dropdown">
                <el-dropdown-item command="other">关闭其他</el-dropdown-item>
                <el-dropdown-item command="all">关闭所有</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
        </el-card>
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
        tagsList: []
      };
    },
    computed: {
      showTags() {
        return this.tagsList.length > 0;
      },

      Name() {
        return this.$store.getters.getName;
      }
    },
    watch: {
      // 对router进行监听，每当访问router时，对tags的进行修改
      $route(newValue) {
        this.setTags(newValue);
      }
    },
    created() {
      // 第一次进入页面时，修改tag的值
      this.setTags(this.$route);

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
      isActive(path) {
        return path === this.$route.fullPath;
      },
      // 关闭单个标签
      closeTags(index) {
        const delItem = this.tagsList.splice(index, 1)[0];
        const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        } else {
          this.$router.push('/');
        }
      },
      // 关闭全部标签
      closeAll() {
        this.tagsList = [];
        this.$router.push('/');
      },
      // 关闭其他标签
      closeOther() {
        const curItem = this.tagsList.filter(item => {
          return item.path === this.$route.fullPath;
        })
        this.tagsList = curItem;
      },
      // 设置标签
      setTags(route) {
        const isExist = this.tagsList.some(item => {
          return item.path === route.fullPath;
        })
        !isExist && this.tagsList.push({
          title: route.meta.title,
          path: route.fullPath,
          name: route.matched[1].components.default.name
        })
      },
      // 当关闭所有页面时隐藏
      handleTags(command) {
        command === 'other' ? this.closeOther() : this.closeAll();
      },
      setUp() {
        this.$refs.childSetUp.show();

      },
      loginOut() {
        window.sessionStorage.removeItem("isLogin");
        this.$router.push("/");
        //退出时情况vuex
        sessionStorage.removeItem("store", JSON.stringify(this.$store.state));
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

  .box-card {
    height: 40px;
    display: flex;
    align-items: center;
    ;
  }



  .tags-li {
    float: left;
    margin: 0px 5px 0px 3px;
    border-radius: 3px;
    font-size: 12px;
    overflow: hidden;
    cursor: pointer;
    height: 23px;
    line-height: 23px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
  }

  .tags-li:not(.active):hover {
    background: #f8f8f8;
  }

  .tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  }

  .tags-li.active {
    color: #fff;
    border: 1px solid #10B9D3;
    background-color: #10B9D3;
  }

  .tags-li.active .tags-li-title {
    color: #fff;
  }
</style>