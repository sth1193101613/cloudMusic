<template>
    <div class="user-detail" style="padding: 0 0  50px;">
        <div class="det" v-if="user.profile">
            <div class="img">
                <img :src="user.profile.avatarUrl" alt="">
            </div>
            <div class="cont">
                <div class="c-head">
                    <span class="name">{{user.profile.nickname}}</span>
                    <img class="sex" :src="user.profile.gender === 1?man:woman" alt="">
                    <span class="level">Lv.{{user.level}}</span>
                </div>
                <div class="c-cont">
                    <p class="item">
                        <span class="value">{{user.profile.followeds}}</span><br/><span class="key">动态</span>
                    </p>
                    <p class="item">
                        <span class="value">{{user.profile.follows}}</span><br/><span class="key">关注</span>
                    </p>
                    <p class="item">
                        <span class="value">{{user.profile.gender}}</span><br/><span class="key">粉丝</span>
                    </p>
                </div>
            </div>

        </div>
        <div class="btns">
            <ul>
                <li>
                    <h2></h2>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                uid:this.$route.query.id,
                user:{},
                man:require('../../../assets/images/man.png'),
                woman:require('../../../assets/images/woman.png'),
                item:{
                    "0":{
                        name:"歌单",
                        list:[],
                        total:''
                    },
                    "1":{
                        name:"收藏",
                        list:[],
                        total:''
                    }
                }
            }
        },
        activated(){
            this._getUserDetail()
            this._getUserPlayList()
        },
        methods:{
            _getUserPlayList(){
                headModel.getUserPlayList(this.uid).then((res) => {
                    let k = res.playlist
                    for(let i in k){
                        if(k[i].subscribed){
                            this.item[0].list.push(k[i])
                            this.item[0].total = this.user.profile.playlistCount
                        }else{
                            this.item[1].list.push(k[i])
                            this.item[1].total = this.user.profile.playlistCount
                        }
                    }
                    console.log(this.item)
                })
            },
            _getUserDetail(){
                headModel.getUserDetail(this.uid).then((res) => {
                    this.user = res
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .user-detail{
        .det{
            overflow: hidden;
            display: flex;
            padding: 25px 25px 0;
            .img{
                width: 200px;
                height: 200px;
                img{
                    display: block;
                    max-width: 100%;
                }
            }
            .cont{
                flex: 1;
                margin-left: 20px;
                .c-head{
                    display: flex;
                    padding-bottom: 10px;
                    align-items: center;
                    border-bottom: 1px solid #23262C;
                    *{
                        margin: 0 5px;
                    }
                    .name{
                        color: #fff;
                        font-size: 24px;
                        font-family: 微软雅黑;
                    }
                    .level{
                        border: 1px solid #B82525;
                        color: #B82525;
                        border-radius: 20px;
                        padding: 0px 8px;
                        font-weight: 800;
                    }
                    .sex{
                        width: 25px;
                        height: 25px;
                    }
                }
                .c-cont{
                   .item{
                       display: inline-block;
                       vertical-align: middle;
                       width: 80px;
                       position: relative;
                       &:last-child{
                           &:after{
                              display: none;
                           }
                       }
                       &:after{
                           content: "";
                           position: absolute;
                           height: 34px;
                           width: 1px;
                           background: #23262C;
                           margin-top: 6px;
                           top: 0;
                           left: 65%;
                       }
                       .value{
                           color: #fff;
                           font-size: 22px;
                       }
                       .key{
                           font-size: 14px;
                       }
                   }
                }
            }
        }
    }
</style>