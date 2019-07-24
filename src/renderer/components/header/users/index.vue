<template>
    <div class="bpk">
        <div style="padding: 15px">
            <div class="hed">
                <div class="acus">
                    <img :src="userInfo.profile.avatarUrl" alt="">
                    <span>{{userInfo.profile.nickname}}</span>
                </div>
                <div class="qi">
                    <span><i class="fa fa-database" aria-hidden="true" @click="qian"></i>签到</span>
                </div>
            </div>
            <div class="tap">
                <p>
                    <span class="num">{{userInfo.profile.eventCount}}</span>
                    <span class="name">动态</span>
                </p>
                <p @click="foll(1,userInfo.profile.nickname)">
                    <span class="num">{{userInfo.profile.follows}}</span>
                    <span class="name" @click="">关注</span>
                </p>
                <p @click="foll(2,userInfo.profile.nickname)">
                    <span class="num">{{userInfo.profile.followeds}}</span>
                    <span class="name">粉丝</span>
                </p>
            </div>
        </div>
        <div class="tab">
            <div style="padding:0  15px;">
                <ul>
                    <li>
                        <div class="lefts">
                            <i class="fa fa-diamond" aria-hidden="true"></i>
                            <span>会员中心</span>
                        </div>
                        <div class="rights">
                            <span>{{userInfo.pcSign === false?"未订购":"已订购"}}</span>
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </li>
                    <li>
                        <div class="lefts">
                            <i class="fa fa-compass" aria-hidden="true"></i>
                            <span>等级</span>
                        </div>
                        <div class="rights">
                            <span>Lv.{{userInfo.level}}</span>
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </li>
                    <li>
                        <div class="lefts">
                            <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                            <span>商城</span>
                        </div>
                        <div class="rights">
                            <span></span>
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="loginout">
            <div style="padding: 15px;">
                <ul>
                    <li>
                        <div class="lefts" @click="loginout">
                            <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            <span>退出</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import { homePage } from '../../../api/homePage'
    let headerModel  = new homePage

    export default {
        name: "inde",
        methods:{
            ...mapActions([
                'loginOut'
            ]),
            loginout(){
                this.loginOut()
            },
            qian(){
                headerModel.dailySignin().then((res) => {})
            },
            foll(type,name){
                this.$router.push({
                    path:'/navs/flow',
                    query:{
                        id:type,
                        name
                    }
                })
            }
        },
        computed:{
            userInfo() {
                return this.$store.state.userInfo;
            },
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .bpk{
        width: 280px;
        height: 280px;
        position: absolute;
        background: #2d2d33;
        top: 41px;
        right: 67px;
        border-radius: 5px;
        .hed{
            display: flex;
            align-items: center;
            .acus{
                flex: 2;
                display: flex;
                align-items: center;
                img{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                span{
                    font-size: 13px;
                    color: #fff;
                    margin-left: 10px;
                }
            }
            .qi{
                flex: 1;
                span{
                    padding: 5px 10px;
                    border-radius: 5px;
                    color: #909090;;
                    border: 1px solid #909090;
                    i{
                        margin: 0 8px 0px 0;
                    }
                }
            }
        }
        .tap{
            display: flex;
            align-items: center;
            margin-top: 20px;
            .num{
                font-size: 16px;
                color: #fff;
            }
            .name{
                color: #909090;
            }
            p{
                flex: 1;
                text-align: center;
                &:not(:nth-child(3)){
                    border-right: 1px solid #909090;
                }
                span{
                    display: block;
                }
            }
        }
        .tab{
            border-top: 1px solid #3f3f3f;
            li{
                display: flex;
                align-items: center;
                line-height: 3;
                .lefts{
                    flex: 2;
                }
                .rights{
                    color: #909090;
                    flex: 1;
                    text-align: right;
                }
            }
        }
        .loginout{
            border-top: 1px solid rgb(63, 63, 63);
        }
    }
</style>