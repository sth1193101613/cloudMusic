<template>
    <div class="musiclist">
        <ul class="musiclist-cont">
            <li v-for="(item,index) in table" class="music-item">
                <div class="container">
                    <span class="counts"><i class="fa fa-music mus" aria-hidden="true"></i>{{item.playCount | playCount}}</span>
                    <p class="copywriter">{{item.copywriter}}</p>
                   <el-image :src="item.coverImgUrl" :key="item.coverImgUrl" lazy></el-image>
                    <p class="name">{{item.name}}</p>
                </div>
            </li>
        </ul>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="60"
                @current-change="curr">
        </el-pagination>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "list",
        props:{
            table:{
                type:[Object,Array]
            },
            total:{
                type:Number
            }
        },
        data(){
            return{

            }
        },
        methods:{
            curr(value){
                this.$emit('change',value)
            },
        },
        filters:{
            playCount(value){
                let val = parseInt(value)
                let str = String(val)
                if(str.length > 5){
                    return `${str.slice(0,str.length-5)}万`
                }else{
                    return str
                }
            }
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .musiclist{
        .musiclist-cont{
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .music-item{
                width: calc((100% / 4) - 12px);
                padding: 6px;
                .container{
                    position: relative;
                    .counts{
                        background-image: -webkit-linear-gradient(left, rgba(231, 51, 104, 0) 0%, #6d6969 100%);
                        position: absolute;
                        right: 0;
                        line-height: 2;
                        color: #fff;
                        font-size: 12px;
                        width: calc(150px / 2);
                        text-align: right;
                        padding-right: 7px;
                        .mus{
                            margin-right: 5px;
                        }
                    }
                }
                .name{
                    color: #fff;
                    line-height: 2;
                    margin-top: 2px;
                    margin-bottom: 20px;
                    font-size: 12px;
                }
            }
        }

    }
</style>