<template>
    <div class="newsong">
        <h2 class="title">最新音乐</h2>
        <div class="container">
            <ul class="cont">
                <li v-for="(item,index) in list" class="item">
                    <div v-for="(group,index) in item" class="item-cont">
                        <div class="index" @click="getId(group)">
                            <span>{{group.index}}</span>
                            <img src="../../../../../assets/images/player.png" alt="" class="pl">
                            <img :src="group.song.album.blurPicUrl" alt="" class="avts">
                        </div>
                        <div class="con">
                            <p class="name">{{group.name}} <span class="alias" v-if="group.song.alias.length !== 0">({{group.song.alias[0]}})</span></p>
                            <p class="avt"> <span v-if="group.song.copyright === 0" class="sq">SQ</span>{{group.song.artists[0].name}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from '../../../../../api/homePage'
    import {mapActions,mapMutations} from 'vuex'
    import {addMusic} from '../../../../../util'
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[],
                db:{},
                songItem:{}
            }
        },
        methods:{
            ...mapActions([
                'getSongUrl'
            ]),
            ...mapMutations({
                getSongTime:'SONG_TIME',
                getSong:'SONG_THIS'
            }),
            getId(item){
                this.songItem ={
                    name:item.name,
                    url:item.song.album.blurPicUrl,
                    art:item.song.artists[0].name
                }
                addMusic(item)
                this.getSong(this.songItem)
                this.getSongUrl(item.id)
                this.getSongTime(item.song.bMusic.playTime)
            },
            split_array(arr, len){
                let a_len = arr.length;
                let result = [];
                for(let i=0;i<a_len;i+=len){
                    result.push(arr.slice(i,i+len));
                }
                return result;
            },
            getNewsong(){
                headerModel.getNewsong().then((res) => {
                    let arr = []
                    for(let i in res.result){
                        let k = res.result[i]
                        this.$set(k,'index',Number(i)+1)
                        arr.push(k)
                    }
                    this.list  = this.split_array(arr, 5);
                })
            }
        },
        created() {
            this.getNewsong()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .newsong {
        .title {
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #2b2b2b;
            padding-bottom: 10px;
        }
        .container{
            margin-top: 5px;
            border: 1px solid #2b2b2b;
            margin-bottom: 20px;
            .cont{
                align-items: center;
                display: flex;
                .item{
                    flex: 1;
                    &:nth-child(1){
                        border-right: 1px solid #4a4a4a;
                    }
                    .item-cont{
                        display: flex;
                        align-items: center;
                        padding: 8px 0;
                        &:nth-child(even){
                            background: #1A1C20;
                        }
                        &:hover{
                            background: #232529;
                        }
                        .index{
                            width: 100px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .pl{
                                position: relative;
                                left: 12px;
                                width: 25px;
                                height: 25px;
                                z-index: 3;
                            }
                            span{
                                flex: 1;
                                text-align: center;
                            }
                            .avts{
                                width: 40px;
                                height: 40px;
                                display: block;
                                position: relative;
                                right: 20px;
                                z-index: 2;
                            }
                        }
                        .con{
                            flex: 4;
                            margin-left: 10px;
                            .name{
                                font-size: 12px;
                                color: #fff;
                                margin-bottom: 5px;
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp: 1;
                                overflow: hidden;
                                .alias{
                                    color: #5F5F63;
                                }
                            }
                            .avt{
                                font-size: 12px;
                                .sq{
                                    color: #D15400;
                                    border: 1px solid #D15400;
                                    font-size: 10px;
                                    border-radius: 3px;
                                    padding: 0 2px;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
            }

        }
    }
</style>