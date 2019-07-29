<template>
    <div class="flos">
        <h3 class="titlefl">
            {{setTitle}}
        </h3>
        <div class="foll-list">
            <ul class="container">
                <li v-for="(item,index) in list" class="cont-li">
                 <div class="fl">
                     <div class="img">
                         <img :src="item.avatarUrl" alt="">
                     </div>
                     <div class="cont">
                         <p class="nick">{{item.nickname}}</p>
                         <p>{{item.signature}}</p>
                         <p>
                            <span>
                                歌单:{{item.follows}}
                            </span>
                             <span>
                                粉丝:{{item.followeds}}
                            </span>
                         </p>
                     </div>
                 </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { homePage } from '../../../api/homePage'
    let headerModel  = new homePage
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                ids:this.$route.query.id,
                name:this.$route.query.name,
                list:[]
            }
        },
        computed:{
            ...mapState([
                'id'
            ]),
            setTitle(){
                if(Number(this.ids) === 1){
                    return `${this.name}的关注`
                }else{
                    return `${this.name}的粉丝`
                }
            }
        },
        activated(){
            if(Number(this.ids) === 1){
                this._flow()
            }else{
                this._flowd()
            }
        },
        methods:{
            _flow(){
                headerModel.getFoll(this.id).then(res => {
                    this.list = res.follow
                })
            },
            _flowd(){
                headerModel.getFolloweds(this.id).then(res => {
                    this.list = res.followeds
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .flos{
        padding: 20px 30px !important;
        .titlefl{
            color: #fff;
            border-bottom: 1px solid #23262C;
            padding-bottom: 10px;
        }
        .foll-list{
            margin-top: 20px;
            .container{
                .cont-li{
                    display: inline-block;
                    width: 370px;
                    height: 95px;
                    background: #202226;
                    margin-bottom: 20px;
                    &:nth-child(2n+1){
                        margin-right: 20px;
                    }
                    .fl{
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .img{
                            margin: 0 20px;
                            width: 65px;
                            height: 65px;
                            img{
                                border-radius: 50% ;
                            }
                        }
                        .cont{
                            flex: 1;
                            p{
                                line-height: 2;
                                font-size: 12px;
                            }
                            .nick{
                                color: #fff;
                            }
                        }
                    }
                }
            }
        }
    }
</style>