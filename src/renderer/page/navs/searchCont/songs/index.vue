<template>
    <div class="song">
        <h4 class="song-title">最佳匹配</h4>
        <ul class="table-heads">
            <li v-for="(nav,index) in item">
                {{nav}}
            </li>
        </ul>

        <ul class="table-conts">
            <li v-for="(item,index) in songList" @dblclick="getMusic(item)">
                <span>{{index<9?`0${index+1}`:index+1}}</span>
                <span>{{item.name}}</span>
                <span class="cup"><b v-for="(list,index) in item.artists">{{list.name}}</b></span>
                <span>{{item.album.name}}</span>
                <span>{{format(item.duration)}}</span>
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
            }
        },
        data(){
            return{
                liket:require('../../../../assets/images/lovet.png'),
                likef:require('../../../../assets/images/lovef.png'),
                item:['','音乐标题','歌手','专辑','时长'],
                songList:[],
                limit:30
            }
        },
        methods: {
            format(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
            getMusic(item){},
            _getSearch() {
                headerModel.getSearchList(this.name,1,this.limit).then((res) => {
                    this.songList = res.result.songs
                })
            }
        },
        created(){
            this._getSearch()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .song-title{
        background: #1C1E23;
        line-height: 3;
        padding-left: 33px;
        color: #828385;
        font-family: fantasy;
        font-size: 12px;
    }
    .table-heads{
        border-bottom: 1px solid #232529;
        display: flex;
        border-top: 1px solid #232529;
        li{
            font-size: 12px;
            line-height: 2.5;
            border-right: 1px solid #232529;
            padding: 0 15px;
            span{
                width: 15px;
                display: inline-block;
                vertical-align: middle;
                img{
                    display: block;
                    width: 100%;
                }
            }
            &.active{
                background: -webkit-linear-gradient( bottom,#2d2d2d,#000);
            }
            &:nth-child(1){
                width: 35px;
            }
            &:nth-child(2){
                flex: 2;
            }
            &:nth-child(3),&:nth-child(4),&:nth-child(5){
                flex: 1;
            }
            &:nth-child(6){
                width: 70px;
                border: 0;
            }
        }
    }
    .table-conts{
        li{
            display: flex;
            align-items: center;
            &:nth-child(2n){
                background: #232529;
            }
            .cup{
                cursor: pointer;
                b{
                    margin: 0 5px;
                }
            }
            span{
                color:#8c8a8a;
                font-size: 12px;
                padding: 0 15px;
                display: block;
                line-height: 2.5;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                &:nth-child(1){
                    width: 35px;
                    text-align: right;
                }
                &:nth-child(2){
                    flex: 2;
                }
                &:nth-child(3),&:nth-child(4),&:nth-child(5){
                    flex: 1;
                }
                &:nth-child(6){
                    width: 70px;
                    border: 0;
                }
            }
        }
    }
</style>