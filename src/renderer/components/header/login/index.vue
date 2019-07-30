<template>
    <div class="login">
        <div class="back"></div>
        <div class="login-cont">
            <div class="head">
                <span>手机登录</span>
                <span @click="end"><i class="fa fa-times" aria-hidden="true"></i></span>
            </div>
            <div class="container">
                <div class="form">
                    <input type="text" class="phone"  placeholder="手机号" v-model="form.phone">
                    <input type="password" class="phone"  placeholder="密码" v-model="form.password">
                </div>
                <div class="bt">
                    <button @click="login" class="btn">
                        登录
                    </button>
                    <button @click="end" class="btn">
                        取消
                    </button>
                </div>
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
                    this.getPlayList(this.id)
                    this.getUserInfo(this.id)
                    this.end()
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
            background-color: rgba(10, 10, 10, 0.77);
            border: 2px ridge rgba(238, 238, 238, 0.13);
            margin: 0 auto;
            left: 0;
            right: 0;
            z-index: 999;
            top: 150px;
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
                        right: 20px;
                        font-size: 20px;
                        cursor: pointer;
                    }
                }
            }
            .container{
                padding-top: 15px;
                width: 80%;
                margin: 0 auto;
                .form{
                    height: 150px;
                    input{
                        &::-webkit-input-placeholder {
                            color: #fff;
                        }
                    }
                    .phone{
                        width: 93.4%;
                        margin-bottom: 20px;
                        padding: 10px;
                        float: left;
                        background-color: transparent;
                        border: none;
                        font-size: 15px;
                        border-bottom: 1px solid rgba(238, 238, 238, 0.41);
                        outline: none;
                        color: #fff;
                    }
                }
                .bt{
                    position: relative;
                    button{
                        &:nth-child(1){
                            position: absolute;
                            left: 0;
                        }
                        &:nth-child(2){
                            position: absolute;
                            right: 0;
                        }
                    }
                    .btn{
                        width: 30%;
                        padding: 5px 0;
                        font-weight: 100;
                        background-color: transparent;
                        color: #fff;
                        border: 1px solid rgba(238, 238, 238, 0.41);
                        cursor: pointer;
                        outline: none;
                        font-size: 12px;
                    }
                }

            }
        }
    }

</style>