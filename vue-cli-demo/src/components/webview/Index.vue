<template>
    <div class="topbar">
        <div class="nav">
            <ul class="ul-1">
                <li>
                    <el-link href="#" target="_blank" :underline="false">小米商城</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">MIUI</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">云服务</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">天星数科</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">下载app</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">协议规则</el-link>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-link href="#" target="_blank" :underline="false">Select Location</el-link>
                </li>
            </ul>
            <ul class="ul-2">
                <li>
                    <el-button type="text">登录</el-button>
                    <el-divider direction="vertical" class="sep"></el-divider>
                    <el-button type="text">注册</el-button>
                    <el-popover placement="top-end" width="200"  trigger="hover" :visible-arrow="false" class="shopCart-li">
                        <el-button  type="text"  slot="reference">
                            <i class="el-icon-shopping-cart-2"></i>
                            购物车
                        </el-button>
                    </el-popover>
                </li>
            </ul>
        </div>
    </div>

</template>


<script>
    export default {
        data() {
            return {

            }
        },
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        border: 0;
        list-style: none;
    }

    a:hover {
        text-decoration: none;
    }

    /*顶部*/
    .topbar {
        height: 40px;
        background-color: #3d3d3d;

    }

    .topbar .nav {
        width: 1225px;
        margin: 0 auto;
    }

    .topbar .nav .ul-1 {
        float: left;
    }

    .topbar .nav .ul-2 {
        float: right;
    }

    .topbar .nav li {
        /* float: left; */
        height: 40px;
        color: #b0b0b0;
        font-size: 14px;
        text-align: center;
        line-height: 40px;
        margin-left: 20px;
    }

    .topbar .nav .sep {
        color: #b0b0b0;
        font-size: 12px;
        margin: 0 5px;
    }

    .topbar .nav li .el-button {
        color: #b0b0b0;
    }

    .topbar .nav .el-button:hover {
        color: #fff;
    }

    .topbar .nav li a {
        color: #b0b0b0;
    }

    .topbar .nav a:hover {
        color: #fff;
    }
    .shopCart-li{
        display: inline-block;
        margin-left: 10px;
        height: 100%;
        width: 80px;
        background-color: #797575;
    }
</style>