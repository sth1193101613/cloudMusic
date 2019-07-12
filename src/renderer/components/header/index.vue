<template>

    <div class="header">
        <div class="logo" style="-webkit-app-region: drag"></div>
        <div class="navs">
            <div class="left">
                <div class="gos">
                    <span @click="historyGo"><i class="fa fa-2x fa-angle-left" aria-hidden="true"></i></span>
                    <span @click="$router.go(+1)"><i class="fa fa-2x fa-angle-right" aria-hidden="true"></i></span>
                </div>
                <div class="search">
                    <input type="text" placeholder="搜索音乐,歌手,歌词" @focus.prevent="show" @input="search" v-model="value"/>
                    <i class="fa fa-1x fa-search searchIcon" aria-hidden="true"></i>
                    <div class="dialog" v-if="dialog">
                        <div class="flex" :class="[{active:value}]">
                            <div class="hot" v-if="value === ''">
                                <h3>热门搜索</h3>
                                <ul>
                                    <li v-for="(list,index) in hot" class="item" @click="push(list)">
                                        {{list.first}}
                                    </li>
                                </ul>
                            </div>
                            <div class="his" v-if="value === ''">
                                <h3>历史搜索</h3>
                                <ul>
                                    <li v-for="(list,index) in his" class="item">
                                        {{list}}
                                    </li>
                                </ul>
                            </div>
                            <div class="change" v-if="value !== ''">
                                <ul v-for="(item,index) in list" class="searchList" v-if="index === 'result'">
                                    <li v-if="item.songs" @click="push()">
                                        <h2><i class="fa fa-headphones" aria-hidden="true"></i>单曲</h2>
                                        <div v-for="(list,index) in item.songs" class="items">
                                            {{list.name}}
                                        </div>
                                    </li>
                                    <li v-if="item.artists">
                                        <h2><i class="fa fa-user" aria-hidden="true"></i>歌手</h2>
                                        <div v-for="(list,index) in item.artists" class="items">
                                            {{list.name}}
                                        </div>
                                    </li>
                                    <li v-if="item.albums">
                                        <h2><i class="fa fa-eercast" aria-hidden="true"></i>专辑</h2>
                                        <div v-for="(list,index) in item.albums" class="items">
                                            {{list.name}}
                                        </div>
                                    </li>
                                    <li v-if="item.mvs">
                                        <h2><i class="fa fa-video-camera" aria-hidden="true"></i>视频</h2>
                                        <div v-for="(list,index) in item.mvs" class="items">
                                            {{list.briefDesc}}
                                        </div>
                                    </li>
                                    <li v-if="item.playlists">
                                        <h2><i class="fa fa-th-list" aria-hidden="true"></i>歌单</h2>
                                        <div v-for="(list,index) in item.playlists" class="items">
                                            {{list.name}}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div @click="loginUp" v-if="id === ''">
                    未登录
                </div>
                <div v-if="id!==''" class="avt">
                    <p @click="user">
                           <span class="avatarUrl">
                        <img :src="userInfos.profile.avatarUrl" alt="">
                    </span>
                        <span class="nickname">
                        {{userInfos.profile.nickname}}
                    </span>
                        <i class="fa fa-sort-desc sort" aria-hidden="true"></i>
                    </p>
                    <v-user v-if="colshow === 1 && clas"></v-user>
                </div>
                <div class="iconsa">
                    <div class="icons">
                        <img src="../../assets/images/picker.png"  @click="color" alt="">
                        <v-color v-if="colshow === 2 && clas"></v-color>
                    </div>
                    <div class="icons"><img src="../../assets/images/dx.png" alt=""></div>
                    <div class="icons"><img src="../../assets/images/setting.png" alt=""></div>
                    <div class="icons" @click="min"><img src="../../assets/images/min.png" alt=""></div>
                    <div class="icons" @click="max"><img src="../../assets/images/big.png" alt=""></div>
                    <div class="icons" @click="closes"><img src="../../assets/images/close.png" alt=""></div>
                </div>
            </div>
        </div>
        <v-login v-if="login" @close="close"></v-login>
    </div>
</template>

<script type="text/ecmascript-6">
    import { homePage } from '../../api/homePage'
    let headerModel  = new homePage
    import login from './login'
    import user from './users'
    import color from './color'
    import {ipcRenderer } from 'electron'

    export default {
        name: "index",
        data(){
            return{
                dialog:false,
                hot:[],
                list:{},
                his:[1,2,3,4,5],
                value:'',
                login:false,
                colshow:0,
                clas:false
            }
        },
        computed: {
            userInfos() {
                return this.$store.state.userInfo;
            },
            id() {
                return this.$store.state.id;
            }
        },
        watch:{
            value(val){
                if(val === ''){
                    this.dialog = true
                }
            }
        },
        methods:{
            push(item){
                this.$router.push({
                    path:'/navs/searchCont',
                    query:{
                        name:item.first
                    }
                })
                this.dialog = false
            },
            min(){
                ipcRenderer.send('min');
            },
            max(){
                ipcRenderer.send('max');
            },
            closes(){
                ipcRenderer.send('close');
            },
            historyGo(){
                if (this.$route.query.goindex === 'true') {
                    this.$router.push('/')
                } else {
                    this.$router.back(-1)
                }
            },
            close(value){
                this.login = value
            },
            loginUp(){
                this.login = true
            },
            color(){
                this.clas = !this.clas
                this.colshow = 2
            },
            search(){
                if(this.value === ''){
                    this.dialog = false
                }else{
                    headerModel.getSearch(this.value).then((res) => {
                        this.dialog = true
                        this.list = res
                    })
                }
            },
            show(){
                this.dialog = true
            },
            _getHot(){
                headerModel.getHot().then((res) => {
                    this.hot = res.hots
                })
            },
            user(){
                this.clas = !this.clas
                this.colshow = 1
            }
        },
        created(){
            this._getHot()
        },
        components:{
            "v-user":user,
            "v-login":login,
            "v-color":color
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .header{
        position: fixed;
        z-index: 4;
        width: 100%;
        display: flex;
        align-items: center;
        background:@back;
        border-bottom: 2px solid red;
        .logo{
            margin: 0 15px;
            width: 176px;
            height: 55px;
            background: url("./images/topbar.png") no-repeat 0 -7px ;
        }
        .navs{
            flex: 1;
            display: flex;
            align-items: center;
            position: relative;
            .left{
                display: flex;
                flex: 3;
                .gos{
                    width: 60px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    text-align: center;
                    border-radius: 10px;
                    span{
                        flex: 1;
                        border: 1px solid #000;
                        &:nth-child(1){
                            border-radius: 4px 0 0 4px;
                            border-right: 0;
                        }
                        &:nth-child(2){
                            border-radius:  0 4px 4px 0 ;
                        }
                    }
                }
                .search{
                    position: relative;
                    border-radius: 25px;
                    padding: 5px;
                    width: 180px;
                    margin-left: 15px;
                    background: #000;
                    input{
                        width: 160px;
                        color: #fff;
                    }
                    .searchIcon{
                        position: absolute;
                        right: 13px;
                        top: 7px;
                    }
                    .dialog{
                        left: -15px;
                        position: absolute;
                        top: 42px;
                        border-radius: 5px;
                        .flex{
                            background: rgb(45,45,51);
                            width: 440px;
                            display: flex;
                            transition: .5s all;
                            &.active{
                                width: 220px;
                                display: block;
                            }
                            &:before{
                                border-left: 8px solid transparent;
                                border-right: 8px solid transparent;
                                border-bottom: 8px solid rgb(45,45,51);
                                content: "";
                                position: absolute;
                                width: 0;
                                top: -8px;
                                left: 25px;
                            }
                            .hot,.his{
                                flex: 1;
                                border-right: 1px solid rgb(54,56,60);
                                h3{
                                    font-size: 13px;
                                    border-bottom: 1px solid rgb(54,56,60);
                                    padding: 8px 25px;
                                }
                                .item{
                                    color: rgb(165,167,168);
                                    font-size: 12px;
                                    padding: 8px 24px;
                                    cursor: pointer;
                                }
                            }
                            .change{
                                background: rgb(45,45,51);
                                .searchList{
                                    h2{
                                        color: @font;
                                        background: #303236;
                                        font-size: 12px;
                                        padding: 7px 10px;
                                        i{
                                            margin-right: 5px;
                                        }
                                    }
                                    .items{
                                        font-size: 13px;
                                        padding: 5px 10px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .right{
                padding-right: 20px;
                position: absolute;
                right: 0;
                color: @font;
                flex: 2.35;
                font-size: 12px;
                align-items: center;
                display: flex;
                &> div{
                    cursor: pointer;
                }
                .iconsa{
                    width: 200px;
                    display: flex;
                    align-items: center;
                    .icons{
                        margin-left: 20px;
                        cursor: pointer;
                        flex: 1;
                        &:not(:nth-child(1)){
                            text-align: center;
                        }
                        img{
                            max-width: 100%;
                            display: block;
                        }
                    }
                }
                .avt{
                    display: flex;
                    align-items: center;
                    width: 110px;
                    .avatarUrl,.nickname{
                        vertical-align: middle;
                        display: inline-block;
                    }
                    .avatarUrl{
                        width: 25px;
                        height: 25px;
                        margin-right: 3px;
                        img{
                            max-width: 100%;
                            border-radius: 50%;
                        }
                    }
                    .nickname{
                        color: #7F8084;
                    }
                    .sort{
                        margin-left: 3px;
                        margin-top: -3px;
                    }
                }
            }
        }
    }
</style>