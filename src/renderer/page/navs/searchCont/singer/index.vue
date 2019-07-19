<template>
    <div>
        <ul>
            <li v-for="(list,index) in songer" class="songerseacrh">
                <div class="img">
                    <img :src="list.picUrl" alt="">
                </div>
                <div class="title">
                    <span>{{list.name}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../api/homePage";
    const headerModel  = new homePage
    export default {
        name: "index",
        props:{
            name:{
                type:String,
                limit:30
            }
        },
        watch:{
            name(){
                this._getSearch()
            }
        },
        data(){
            return{
                songer:[]
            }
        },
        methods:{
            _getSearch() {
                headerModel.getSearchList(this.name,100,this.limit).then((res) => {
                    this.songer = res.result.artists
                })
            }
        },
        created() {
            this._getSearch()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .songerseacrh{
        background: #16181C;
        display: flex;
        align-items: center;
        padding: 8px 30px;
        &:nth-child(2n+1){
            background: #1A1C20;
        }
        .img{
            width: 45px;
            height: 45px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            margin-left: 15px;
            span{
                color: #fff;
            }
        }
    }
</style>