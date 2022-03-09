<template>
    <div class="content">
        <div class="topbar">
            <div class="nav">
                <ul class="ul-1">
                    <li>
                        <el-link href="#" target="_blank" :underline="false">官方商城</el-link>
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
                        <el-link href="/Login" target="_blank" :underline="false">登录</el-link>
                        <el-divider direction="vertical" class="sep"></el-divider>
                        <el-link href="/Register" target="_blank" :underline="false">注册</el-link>
                        <el-popover placement="top-end" width="200" trigger="hover" :visible-arrow="false"
                            class="shopCart-li" content="暂无消息通知">
                            <el-button type="text" slot="reference">
                                <i class="el-icon-bell"></i>
                                消息通知
                            </el-button>
                        </el-popover>
                    </li>
                </ul>
            </div>
        </div>
        <!--轮播-->
        <div style="width: 100%;height: 800px;">
            <div class="carousel">
                <el-carousel :interval="4000" type="card" height="400px">
                    <el-carousel-item v-for="(item,index) in List" :key="index">
                        <el-image :src="item.image" style="height: 100%;width: 100%;"></el-image>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!--中间-->
            <div class="content-box">
                <div id="box">
                    <h2 style="margin-bottom: 20px;">房型展示</h2>
                    <ul>
                        <li v-for="(item,index) in listGood" :key="index">
                            <el-card class="box-card">
                                <el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
                                <p>{{item.area}}</p>
                                <p>{{item.price}}</p>
                                <p>{{item.type}}</p>
                                <p>{{item.address}}</p>
                            </el-card>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <!-- 底栏容器 -->

        <div class="footer">
            <div class="ng-promise-box">
                <div class="ng-promise">
                    <p class="text">
                        <a class="icon1" href="javascript:;">货真价实</a>
                        <a class="icon2" href="javascript:;">开业酬宾</a>
                        <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
                    </p>
                </div>
            </div>
            <div class="github">
                <a href="/" target="_blank">
                    <div class="github-but"></div>
                </a>
            </div>
            <div class="mod_help">
                <p>
                    <router-link to="/">首页</router-link>
                    <span>|</span>
                    <router-link to="/goods">全部商品</router-link>
                    <span>|</span>
                    <router-link to="/about">关于我们</router-link>
                </p>
                <p class="coty">商城版权所有 &copy; 2012-2021</p>
            </div>
        </div>

        <!-- 底栏容器END -->
    </div>
</template>


<script>
    export default {
        data() {
            return {
                List: [],
                listGood: [],
                url: '../../static/img/img.jpeg'
            }
        },
        created() {
            this.getSwiper();
            this.getList();
        },
        methods: {
            getSwiper() {
                this.axios.get('../static/js/swiper.json', {
                }).then(response => {
                    this.List = response.data.list
                    console.log(this.List)
                })
            },
            getList() {
                this.axios.post('/api/member/listHotel', {
                }).then(response => {
                    this.listGood = response.data
                    console.log(this.listGood)
                })
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

    .shopCart-li {
        display: inline-block;
        margin-left: 20px;
        height: 100%;
        width: 80px;
        background-color: #797575;
    }

    /*
    *轮播图
    */
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    .carousel {
        margin-top: 20px;
        width: 100%;
    }

    /*
    *底层
    */
    .footer {
        width: 100%;
        text-align: center;
        background: #2f2f2f;
        padding-bottom: 20px;
        margin-top: 40px;
    }

    .footer .ng-promise-box {
        border-bottom: 1px solid #3d3d3d;
        line-height: 145px;
    }

    .footer .ng-promise-box {
        margin: 0 auto;
        border-bottom: 1px solid #3d3d3d;
        line-height: 145px;
    }

    .footer .ng-promise-box .ng-promise p a {
        color: #fff;
        font-size: 20px;
        margin-right: 210px;
        padding-left: 44px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
        text-decoration: none;
    }

    .footer .github {
        height: 50px;
        line-height: 50px;
        margin-top: 20px;
    }

    .footer .github .github-but {
        width: 50px;
        height: 50px;
        margin: 0 auto;

    }

    .footer .mod_help {
        text-align: center;
        color: #888888;
    }

    .footer .mod_help p {
        margin: 20px 0 16px 0;
    }

    .footer .mod_help p a {
        color: #888888;
        text-decoration: none;
    }

    .footer .mod_help p a:hover {
        color: #fff;
    }

    .footer .mod_help p span {
        padding: 0 22px;
    }

    .content-box {
        width: 80%;

        margin-top: 50px;
        margin: 0 auto;

    }

    #box {
        padding: 5px;
        background-color: #e4eaf1;
        border-radius: 5%;
        box-shadow: #4c8cd4;
    }

    #box ul {
        display: flex;
        flex-wrap: wrap;
    }

    #box li {
        padding: 3px;
        list-style: none;
        margin-right: 15px;

    }

    #box img {
        width: 200px;
        height: 150px;
    }
</style>