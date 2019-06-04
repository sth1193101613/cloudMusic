<template>
    <div class="erci">
        <h2 class="title">二次元</h2>
        <ul class="conts">
            <li v-for="(item,index) in list" class="list">
                <div class="ls">
                    <img :src="item.picUrl" alt="">
                    <span class="name">{{item.name}}</span>
                </div>
                <p class="remd">{{item.rcmdtext}}</p>
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
                list:[]
            }
        },
        methods:{
            getTwo(){
                headerModel.getTwo(3001).then((res) => {
                    this.list = res.djRadios
                })
            },
        },
        created() {
            this.getTwo()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .erci{
        margin-top: 45px;
        .title {
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #2b2b2b;
            padding-bottom: 10px;
        }
        .conts{
            display: flex;
            flex-wrap: wrap;
            .list{
                width: calc((100% / 4) - 11px);
                padding: 6px;
                color:#fff;
                &:nth-child(1),&:nth-child(5){
                    padding-left: 0;
                }
                .ls{
                    position: relative;
                    font-size: 12px;
                    img{
                        max-width: 100%;
                    }
                    .name{
                        position: absolute;
                        bottom: 2px;
                        display: block;
                        width: 100%;
                        padding: 6px;
                        box-sizing: border-box;
                        background: -webkit-gradient(linear,center top,center bottom,from(rgba(255, 255, 255, 0.1)),to(#333));
                    }
                }
                .remd{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    margin-top: 2px;
                }
            }
        }
    }
</style>