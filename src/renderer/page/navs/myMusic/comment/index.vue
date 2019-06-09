<template>
    <div class="commit">
        <div class="back">
            <textarea style="resize:none;" class="conts" cols="30" rows="4"></textarea>
            <div>评论</div>
        </div>
        <div v-if="hide">
            <h5 class="top">精彩评论</h5>
            <ul>
                <li v-for="(list,index) in hotList" v-if="index<=9" class="avtimg">
                    <div class="avt">
                        <img :src="list.user.avatarUrl" alt="">
                    </div>
                    <div class="cont">
                        <div class="nei">
                            <span class="name">{{list.user.nickname}}:</span>
                            <span class="content">{{list.content}}</span>
                            <div v-if="list.beReplied.length!==0" v-for="(item,index) in list.beReplied" class="cont-cher">
                                <span class="name">@{{item.user.nickname}}:</span>
                                <span class="content">{{item.content}}</span>
                            </div>
                        </div>
                        <div class="sett">
                            <div class="time">
                                {{format(list.time)}}
                            </div>
                            <div class="menu" @click="like(list.commentId,list.liked,index)">
                                <img :src="list.liked?liket:likef" alt=""><span>({{list.likedCount}})</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="end" ref="scroll">
            <h5 class="top">最新评论</h5>
            <ul>
                <li v-for="(list,index) in nweList" class="avtimg">
                    <div class="avt">
                        <img :src="list.user.avatarUrl" alt="">
                    </div>
                    <div class="cont">
                        <div class="nei">
                            <span class="name">{{list.user.nickname}}:</span>
                            <span class="content">{{list.content}}</span>
                        </div>
                        <div>
                            <div class="time">
                                {{format(list.time)}}
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="30"
                @current-change="curr">
        </el-pagination>
    </div>
</template>

<script>
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                hotList:[],
                nweList:[],
                limit:30,
                total:0,
                page:1,
                hide:true,
                liket:require('../../../../assets/images/like-t.png'),
                likef:require('../../../../assets/images/like-f.png')
            }
        },
        computed:{
            ...mapState([
                'SongDetailId'
            ]),
        },
        activated  (){
            this.limit = 30
            this.total = 0
            this.getHot(this.SongDetailId,this.limit,0)
        },
        watch:{
            page(val){
                if(val === 1){
                    this.hide = true
                }else{
                    this.hide = false
                }
            }
        },
        methods:{
            like(id,flag,index){
                let k = 0
                if(flag){
                    k = 0
                    this.hotList[index].likedCount =  this.hotList[index].likedCount - 1
                    this.hotList[index].liked = false
                }else{
                    k = 1
                    this.hotList[index].likedCount =  this.hotList[index].likedCount+1
                    this.hotList[index].liked =  true
                }
                headModel.commentLike(2,k,id,this.SongDetailId).then((res) => { })
            },
            curr(val){
                if(val === 1){
                    this.getHot(this.SongDetailId,this.limit,0)
                }else{
                    this.getHot(this.SongDetailId,this.limit,this.page*30)
                }
                this.page = val
                let scrollDiv = this.$refs.scroll
                scrollDiv.scrollIntoView()
            },
            add0(m){
                return m<10?'0'+m:m
            },
            format(val) {
                let time = new Date(val);
                let y = time.getFullYear();
                let m = time.getMonth()+1;
                let d = time.getDate();
                let h = time.getHours();
                let mm = time.getMinutes();
                let s = time.getSeconds();
                return y+'年'+this.add0(m)+'月'+this.add0(d)+'日'+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
            },
            getHot(id,limit,offset){
                headModel.commitPlayer(id,limit,offset).then((res) => {
                    this.hotList = res.hotComments
                    this.nweList = res.comments
                    this.total = res.total
                })
            }
        },

    }
</script>

<style lang="less" rel="stylesheet/less">
    .commit{
        padding: 20px;
        .back{
            background: #1C1E23;
            padding: 10px;
            .conts{
                border: 1px solid #000;
                width: 100%;
                background: #2B2C31;
                color: #fff;
                &:focus {
                    outline: none;
                }
            }
        }
        .top{
            margin-top: 38px;
            color: #fff;
            border-bottom: 1px solid #292929;
            padding-bottom: 10px;
        }
        .avtimg{
            display: flex;
            align-items: center;
            padding: 20px 0 ;
            border-bottom: 1px solid #292929;
            .avt{
                width: 40px;
                height: 40px;
                margin-right: 20px;
                img{
                    border-radius: 50%;
                    display: block;
                }
            }
            .cont{
                flex: 1;
                font-size: 12px;
                .nei{
                    margin-bottom: 10px;
                    .cont-cher{
                        margin-top: 10px;
                        background: #1C1E23;
                        padding: 10px;
                    }
                    .name{
                        color: #1E6AC5;
                    }
                    .content{
                        color: #fff;
                    }
                }
                .sett{
                    display: flex;
                    align-items: center;
                    .time{
                        flex: 1;
                    }
                    .menu{
                        cursor: pointer;
                        width: 60px;
                        text-align: right;
                        img{
                            width: 15px;
                            height: 15px;
                            display: inline-block;
                            vertical-align: middle;
                        }
                        span{
                            vertical-align: middle;
                            display: inline-block;
                        }
                    }
                }
            }
        }
        .end{
            scroll-behavior:smooth;
            margin-bottom: 20px;
            padding-top: 30px
        }
    }
</style>