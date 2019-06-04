<template>
    <div class="commonttop">
        <h3>官方榜</h3>
        <div class="toplist">
            <div v-for="(item,index) in list" class="list-cont" :class="[{active:index === '0' || index === '1' || index === '3'}]">
                <ul class="flex">
                    <li v-for="(group,index) in item" class="item" :style="{'backgroundImage': 'url(' + group.coverImgUrl + ')', backgroundSize:'contain'}">
                        <ul class="conter">
                            <li v-for="(singer,index) in group.tracks" v-if="index<=7" class="sing-list">
                                <span :class="['styleIn',{active:index<3}]">{{index+1}}</span>
                                <span class="singers">{{singer.name}}</span>
                                <span class="singer"><span v-for="(singers,index) in singer.ar">
                                    {{singers.name}}
                                </span></span>
                            </li>
                            <li class="sing-list add">查看全部</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "index",
        props:{
            back:{
                type:String
            },
            list:{
                type:[Object,Array]
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .commonttop{
        h3{
            margin-top: 35px;
            color: #fff;
            border-bottom: 1px solid #202226;
            padding-bottom: 5px;
        }
        .toplist{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .list-cont{
                width: calc(100% / 3  - 10px);
                min-width: calc(100% / 3  - 10px);
                box-sizing: border-box;
                max-width: calc(100% / 3  - 10px);
                margin-top: 20px;
                height: 380px;

                &.active{
                    margin-right: 15px;
                }
                .item{
                    background-repeat:no-repeat;
                    background-position: 0 -78px;
                    height: 100%;
                    position: relative;
                    .conter{
                        border: 1px solid #1F2024;
                        position: relative;
                        top: 78px;
                        .sing-list{
                            display: flex;
                            align-items: center;
                            line-height: 2.5;
                            padding: 0 10px;
                            cursor: pointer;
                            &.add{
                                text-align: right;
                                display: block;
                            }
                            &:nth-child(2n){
                                background: #16181C;
                            }
                            &:nth-child(2n+1){
                                background:#1A1C20;
                            }
                            span{
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                                font-size: 13px;
                                color: #DCDDE4;
                            }
                            .singers{
                                width: 80%;
                                margin-right: 15px;
                            }
                            .styleIn{
                                margin-right: 5px;
                                &.active{
                                    color: red;
                                }
                            }
                            .singer{
                                width: 30%;
                            }
                        }
                    }
                }
            }
        }
    }


</style>