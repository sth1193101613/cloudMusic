<template>
    <div class="listmusic">
        <img :src="img" alt="" @click="_getAll();state()">
        <ul class="playcont" v-if="stutas">
            <h4>播放列表</h4>
            <p class="title">
                <span>总{{list.length}}首</span>
                <span @click="clearn">清空全部</span>
            </p>
            <div class="play-cont">
               <ul>
                   <li v-for="(item,index) in list" class="play-list">
                       <span class="name" @click="getId(item)">{{item.name}}</span>
                       <div>
                           <span>{{item.auth}}</span>
                           <span>{{format(item.time)}}</span>
                           <span @click="deleteSong(item)"><i class="el-icon-delete"></i></span>
                       </div>
                   </li>
               </ul>
            </div>
        </ul>
    </div>
</template>

<script>
    import {getAllData,deleteData,clearData} from '../../util'
    import {mapActions,mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                img:require('../../assets/images/musiclist.png'),
                list:[],
                songItem:{},
                stutas:false
            }
        },
        created(){
            this._getAll()
        },
        methods:{
            ...mapActions([
                'getSongUrl'
            ]),
            ...mapMutations({
                getSongTime:'SONG_TIME',
                getSong:'SONG_THIS'
            }),
            state(){
                this.stutas = !this.stutas
            },
            _getAll(){
                getAllData().then((res) => {
                    this.list = res
                })
            },
            getId(item){
                this.songItem ={
                    name:item.name,
                    url:item.pic,
                    art:item.auth
                }
                this.getSong(this.songItem)
                this.getSongUrl(item.songId)
                this.getSongTime(item.time)
            },
            format(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
            deleteSong(item){
                deleteData(item.id)
                this._getAll()
            },
            clearn(){
                clearData()
                this._getAll()
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
            overflow-y: auto;
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
                .play-list{
                    display: flex;
                    align-items: center;
                    padding: 10px 25px;
                    color: #fff;
                    font-size: 12px;
                    &:nth-child(2n+1){
                        background: #303236;
                    }
                    .name{
                        flex: 2;
                    }
                    div{
                        flex: 1;
                        display: flex;
                        align-items: center;
                        span{
                            color: #5F5F63;
                           &:nth-child(1){
                               flex: 2;
                           }
                            &:nth-child(2){
                                flex: 1;
                                text-align: right;
                            }
                            &:nth-child(3){
                                flex: 1;
                                text-align: right;
                            }
                        }
                    }
                }
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