<template>
    <el-dialog title="扫码登录" :visible.sync="dialogVisible" width="30%">
        <wxlogin :appid="$store.getters.wechat_app_id" :scope="'snsapi_login'" :theme="'black'"
            :redirect_uri="encodeURIComponent($store.getters.base_url + 'new-home/#/new-home/structure')"
            :href="'data:text/css;base64,LmltcG93ZXJCb3ggLnRpdGxlIHsNCiAgZGlzcGxheTogbm9uZTsNCn0NCi5pbXBvd2VyQm94IC5zdGF0dXMuc3RhdHVzX2Jyb3dzZXIgew0KICBkaXNwbGF5OiBub25lOw0KfQ0KLmltcG93ZXJCb3ggLnFyY29kZSB7DQogIGJvcmRlcjogbm9uZTsNCiAgd2lkdGg6IDIwMHB4Ow0KICBoZWlnaHQ6IDIwMHB4Ow0KfQ0KLmltcG93ZXJCb3ggLnN0YXR1c3sNCiAgZGlzcGxheTogbm9uZQ0KfQ=='"
            rel="external nofollow">
        </wxlogin>
    </el-dialog>

</template>

<script>
    import wxlogin from 'vue-wxlogin';
    export default {
        components: {
            wxlogin
        },
        name: 'qrCode',
        data() {
            return {
                dialogVisible: false
            }
        },
        methods: {
            show() {
                this.dialogVisible = true
            }
        },
    }


</script>

<style>

</style>