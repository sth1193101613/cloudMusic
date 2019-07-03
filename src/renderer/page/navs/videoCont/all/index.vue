<template>
    <div class="all">
        <div class="mvs-deta">
            <p class="title">MV介绍</p>
            <p class="publish"><span>发布时间{{detail.publishTime}}</span><span>播放次数{{detail.playCount}}</span></p>
            <p class="desc">简介：{{detail.desc}}</p>
        </div>
        <div class="related">
            <p class="title">相关推荐</p>
            <ul>
                <li v-for="(item,index) in all" class="all">
                    <div class="img">
                        <img :src="item.coverUrl" alt="">
                    </div>
                    <div class="cont">
                        <p class="titlename">{{item.title}}</p>
                        <p class="titlename">{{format(item.durationms)}}</p>
                        <p class="exp">
                            <span v-for="(list,index) in item.creator" >{{list.userName}}</span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: "index",
        props:{
            all:{
                type:Array
            },
            detail:{
                type:Object
            }
        },
        methods:{
            format(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .all{
        .mvs-deta{
            margin-left: 30px;
            .title{
                font-size: 20px;
                color: #fff;
                padding-bottom: 10px;
                border-bottom: 1px solid #232121;
            }
            .publish{
                margin: 10px 0;
                font-size: 12px;
            }
            .desc{
                font-size: 13px;
                color: #828385;
            }
        }
        .related{
            margin-top: 40px;
            margin-left: 30px;
            .title{
                font-size: 20px;
                color: #fff;
                padding-bottom: 10px;
                border-bottom: 1px solid #232121;
            }
            .all{
                display: flex;
                align-items: center;
                margin-top: 8px;
                .img{
                    width: 120px;
                    height: 70px;
                    img{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
                .cont{
                    margin-left: 10px;
                    flex: 1;
                    font-size: 12px;
                    p{
                        line-height: 1.7;
                    }
                    .titlename{
                        color: #fff;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .exp{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                }
            }
        }
    }

</style>