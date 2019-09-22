<template>
    <div class="newsong">
        <ul class="new-ul">
            <li v-for="(item,index) in list" class="newsong-list" :class="[{active:index === Index}]" @click="findex(item.id,index)">
                {{item.name}}
            </li>
        </ul>
        <ul class="songboj">
            <li v-for="(list,index) in song" class="song-list">
                <span class="hed">{{index < 9 ? `0${index + 1}`:index + 1}}</span>
                <div class="flex2 p">
                    <img v-lazy="list.album.picUrl" alt="">
                    <span class="name">{{list.name}}</span>
                    <span class="sq">SQ</span>
                </div>
                <div class="flex1">
                    <span v-for="(item,index) in list.artists">
                        {{item.name}}
                    </span>
                </div>
                <span class="flex1 p">{{list.name}}</span>
                <span class="hed" v-if="list.bMusic">{{forma(list.bMusic.playTime)}}</span>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                song:[],
                list:[
                    {name:"全部",id:0},
                    {name:"华语",id:7},
                    {name:"欧美",id:96},
                    {name:"韩国",id:16},
                    {name:"日本",id:8}
                ],
                Index:0,
            }
        },
        methods:{
            forma(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
            getSong(type){
                headModel.getSong(type).then((res) => {
                    this.song = res.data
                })
            },
            findex(id,index){
                this.song = []
                this.getSong(id)
                this.Index = index

            }
        },
        created(){
            this.getSong(0)
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .newsong{
        .new-ul{
            border-bottom: 1px solid #2C2E32;
            .newsong-list{
                display: inline-block;
                font-size: 12px;
                color: #828385;
                &.active{
                    color: #fff;
                    border-bottom: 2px solid #686A6E;
                    padding-bottom: 10px;
                }
                &:not(:first-child){
                    margin-left: 10px;
                }
            }
        }
        .songboj{
            margin-top: 15px;
            border: 1px solid #1F2024;
            .song-list{
                display: flex;
                font-size: 12px;
                align-items: center;
                padding: 10px 0;
                &:nth-child(2n+1){
                    background: #1A1C20;
                }
                .flex1{
                    flex: 1;
                    span{
                        color: #828385;
                    }
                    &.p{
                        color: #828385
                    }
                }
                .flex2{
                    flex: 2;
                    &.p{
                        margin-right: 15px;
                        display: flex;
                        align-items: center;
                        .name{
                            color: #fff;
                            padding-left: 15px;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        .sq{
                            font-size: 8px;
                            padding: 1px 2px;
                            margin-left: 5px;
                            color: #D15400;
                            border: 1px solid #D15400;
                        }
                    }
                }
                .hed{
                    text-align: center;
                    width: 50px;
                }
                img{
                    width: 40px;
                    height: 40px;
                    display: block;
                }
            }
        }

    }
</style>