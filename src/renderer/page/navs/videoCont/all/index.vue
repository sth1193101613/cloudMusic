<template>
    <div class="all">
        <div class="mvs-deta">
            <p class="title">MV介绍</p>
            <p class="publish"><span>发布时间{{detail.publishTime}}</span><span>播放次数{{detail.playCount}}</span></p>
            <p class="desc">简介：{{detail.desc}}</p>
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
    }

</style>