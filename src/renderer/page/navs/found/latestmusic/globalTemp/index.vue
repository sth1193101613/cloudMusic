<template>
    <div class="global">
        <h3>官方榜</h3>
        <div class="global-toplist">
            <div v-for="(item,index) in list" class="global-list-cont">
                <ul>
                    <li v-for="(group,index) in item">
                        <img :src="group.coverImgUrl" alt="">
                        <p>{{group.name}}</p>
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
            list:{
                type:[Object,Array]
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .global {
        h3 {
            margin-top: 35px;
            color: #fff;
            border-bottom: 1px solid #202226;
            padding-bottom: 5px;
        }
        .global-toplist{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .global-list-cont{
                width: calc(100% / 5);
                box-sizing: border-box;
                padding-right: 9px;
                margin-top: 15px;

                img{
                    display: block;
                }
                p{
                    line-height: 2;
                    font-size: 12px;
                    color: #fff;
                    margin-bottom: 15px;
                    margin-top: 10px;
                }
            }
        }
    }
</style>