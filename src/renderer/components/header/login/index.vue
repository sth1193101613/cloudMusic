<template>
    <div class="login">
        <div class="back"></div>
        <div class="login-cont">
            <div class="head">
                <span>手机登录</span>
                <span @click="end"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div>
            <div class="form">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="手机号:">
                        <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 45px">
                        <el-button type="primary" @click="login">登录</el-button>
                        <el-button type="primary" @click="end">取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapActions,mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                form:{
                    phone:"",
                    password:"",
                }
            }
        },
        computed: {
            ...mapState([
                'id'
            ]),
        },
        methods:{
            ...mapActions([
                'getLoginId',
                'getUserInfo',
                'getPlayList'
            ]),
            login(){
                this.getLoginId(this.form)
                setTimeout(() => {
                    console.log(this.id)
                    this.getPlayList(this.id)
                    this.getUserInfo(this.id)
                },500)
            },
            end(){
                this.$emit('close',false)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common";
    .login{
        .back{
            background: rgba(0,0,0,.7);
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            z-index: 999;
        }
        .login-cont{
            border-radius:5px;
            width: 400px;
            height: 300px;
            position: absolute;
            background: #fff;
            margin: 0 auto;
            left: 0;
            right: 0;
            z-index: 999;
            top: 150px;
            .el-input{
                width: 90%;
            }
            .el-button--primary{
                background-color: @cont;
                border-color: @cont
            }
            .head{
                height: 45px;
                font-size: 12px;
                color: #fff;
                line-height: 45px;
                background: @back;
                position: relative;
                text-align: center;
                span{
                    flex: 1;
                    &:nth-child(2){
                        position: absolute;
                        position: absolute;
                        right: 20px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                }
            }
            .form{
                margin-top: 50px;
            }
        }
    }

</style>