<template>
    <div class="fuf">
        <h2 class="title">付费精品</h2>
        <ul class="fuf-cont">
            <li v-for="(list,index) in item" class="item">
                <div class="img">
                    <img :src="list.picUrl" alt="">
                </div>
                <div class="cont">
                    <p class="name">{{list.name}}</p>
                    <p class="rcm">{{list.rcmdText}}</p>
                    <p class="text"><i class="fa fa-play" aria-hidden="true"></i>{{list.lastProgramName}}</p>
                    <p class="fram">￥{{list.programCount}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../../api/homePage";
    const headerModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                item:[]
            }
        },
        methods:{
            getgift(){
                headerModel.getgift().then((res) => {
                    this.item = res.data.list
                })
            }
        },
        created() {
            this.getgift()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .fuf{
        .title {
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #2b2b2b;
            padding-bottom: 10px;
        }
        .fuf-cont{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .item{
                width: 50%;
                display: flex;
                margin-top: 15px;
                .img{
                    width: 120px;
                    height: 120px;
                    display: block;
                    img{
                        max-width: 100%;
                    }
                }
                .cont{
                    flex: 1;
                    font-size: 12px;
                    margin-left: 15px;
                    .name{
                        color: #fff;
                        font-size: 14px;
                        margin: 10px 0;
                    }
                    .rcm{
                        margin-bottom: 5px;
                    }
                    .text{
                        margin-bottom: 18px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .fram{
                        color: red;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>