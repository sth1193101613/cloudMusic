<template>
    <div class="station">
        <h2 class="title">主播电台</h2>
        <ul class="container">
            <li v-if="index<5" v-for="(item,index) in list" class="item">
                <div class="cont">
                    <img :src="item.picUrl" alt="">
                    <span class="name">{{item.name}}</span>
                    <p class="desc">{{item.program.radio.desc}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../../api/homePage";
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[]
            }
        },
        methods:{
            getStation(){
                headerModel.getStation().then((res) => {
                    this.list  = res.result
                })
            }
        },
        created() {
            this.getStation()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .station{
        .title {
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #2b2b2b;
            padding-bottom: 10px;
        }
        .container{
            display: flex;
            align-items:center;
            padding-top: 5px;
            padding-bottom: 20px;
            .item{
                width: calc((100% / 5) - 11px);
                padding: 6px;
                &:nth-child(1){
                    padding-left: 0;
                }
                &:nth-child(5){
                    padding-right: 0;
                }
                .cont{
                    position: relative;
                    img{
                        max-width: 100%;
                    }
                    .name{
                        position: absolute;
                        font-size: 12px;
                        color: #fff;
                        top: 120px;
                        left: 5px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 1;
                        overflow: hidden;
                    }
                    .desc{
                        color: #fff;
                        height: 40px;
                        line-height: 20px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                        margin-top: 2px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>