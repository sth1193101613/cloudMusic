<template>
    <div class="listmusic">
        <img :src="img" alt="" @click="_getAll">
        <ul class="playcont">
            <h4>播放列表</h4>
            <p class="title">
                <span>总{{list.length}}首</span>
                <span>清空全部</span>
            </p>
            <div class="play-cont">
                <li v-for="(item,index) in list" class="play-list">
                    <span>{{item.name}}</span>
                    <span>{{item.auth}}</span>
                    <span>{{item.time}}</span>
                </li>
            </div>
        </ul>
    </div>
</template>

<script>
    import {getAllData} from '../../util'
    export default {
        name: "index",
        data(){
            return{
                img:require('../../assets/images/musiclist.png'),
                list:[]
            }
        },
        created(){
            this._getAll()
        },
        methods:{

            _getAll(){
                getAllData().then((res) => {
                    this.list = res
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .listmusic{
        width: 30px;
        height: 30px;
        margin-right: 20px;
        cursor: pointer;
        .playcont{
            background: #292A2E;
            width: 580px;
            height: 470px;
            position: fixed;
            bottom: 50px;
            right: 0;
            .title{
                color: #828385;
                border-top: 1px solid #323438;
                border-bottom: 1px solid #323438;
                font-size: 12px;
                position: relative;
                line-height: 30px;
                height: 30px;
                span{
                    position: absolute;
                    &:nth-child(1){
                        left: 25px;
                    }
                    &:nth-child(2){
                        right: 25px;
                    }
                }

            }
            .play-cont{
                overflow-y: scroll;
                .play-list{
                    display: flex;
                    align-items: center;
                    padding: 10px 25px;
                }
                &::-webkit-scrollb
                ar{
                    width: 10px;
                    background: #16181C;
                }
                &::-webkit-scrollbar-thumb{
                    background: #2C2E32;
                    width: 8px;
                    border-radius: 20px;
                }
            }
            h4{
                background: #292B2F;
                color: #fff;
                text-align: center;
                font-size: 13px;
                padding: 10px;
            }

        }
        img{
            width: 100%;
            display: block;
        }
    }
</style>