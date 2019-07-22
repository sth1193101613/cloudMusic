<template>
    <div class="songlist">
        <ul class="table-head">
            <li v-for="(nav,index) in item" @click="sort(index,'dt')" :class="[{active:index === Index}]">
                {{nav}} <span v-if="index === 5" class="span"><img :src="flag?top:bottom" alt=""></span>
            </li>
        </ul>
        <ul class="table-cont">
            <li v-for="(item,index) in songList" @dblclick="getMusic(item)">
                <span>{{index<9?`0${index+1}`:index+1}}</span>
                <span class="cup" @click="isLike(item,index)"><img :src="item.liked?liket:likef" alt=""></span>
                <span>{{item.name}}</span>
                <span class="cup"><b v-for="(list,index) in item.ar">{{list.name}}</b></span>
                <span>{{item.al.name}}</span>
                <span v-if="item.l">{{format(item.dt)}}</span>
            </li>
        </ul>
        <div class="alert" v-if="hide">
            <div class="alert-count">
                <p>确定将选中歌曲从我喜欢的音乐中删除？</p>
                <p>
                    <button class="btn" @click="gen">确定</button>
                    <button class="btn" @click="hide = false">取消</button>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions,mapMutations,mapState} from 'vuex'
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    import { addMusic } from "../../../../util";

    export default {
        name: "index",
        data(){
            return{
                item:['','操作','音乐标题','歌手','专辑','时长'],
                flag:true,
                Index:null,
                index:'',
                itemMsg:{},
                msg:{},
                top:require('../../../../assets/images/s.png'),
                bottom:require('../../../../assets/images/x.png'),
                liket:require('../../../../assets/images/lovet.png'),
                likef:require('../../../../assets/images/lovef.png'),
                songItem:{},
                hide:false,
                songList:[]
            }
        },
        props:{
            list:{
                type:Array,
            },
            subscribed:{
                type:Object
            }
        },
        computed:{
            ...mapState([
                'id',
            ]),
        },
        created(){
            this.setValueLike()
        },
        methods:{
            ...mapActions([
                'getSongUrl'
            ]),
            ...mapMutations({
                getSongTime:'SONG_TIME',
                getSong:'SONG_THIS'
            }),
            async setValueLike(){
                let list = this.list || []
                let arr  = await this.likeListFun()
                this.$nextTick(res =>{
                    list.forEach(e => {
                        if(arr.includes(e.id)){
                            this.$set(e,'liked',true)
                        }else{
                            this.$set(e,'liked',false)
                        }
                    })
                },50)
                this.songList = list
            },
            gen(){
                this.setValueLike.splice(this.index,1)
                this.refLike(this.itemMsg.id,false)
                this.hide = false
            },
            likeListFun(){
                return new Promise((resolve, reject) => {
                    headModel.likelist(this.id).then((res) => {
                        resolve(res.ids)
                    })
                })
            },
            refLike(id,flag){
                headModel.isLike(id,flag).then((res) => {})
            },
            isLike(item,index){
                if(this.subscribed.subscribed){
                    if(item.liked){
                        this.refLike(item.id,false)
                        this.$set(item,'liked',false)
                    }else{
                        this.refLike(item.id,true)
                        this.$set(item,'liked',true)
                    }
                }else{
                    this.itemMsg = item
                    this.index = index
                    this.hide = true
                }
            },
            ar(item){
                let arr = []
                if(item.length !==0){
                    for(let i in item){
                        arr.push(item[i].name)
                    }
                }else{
                    return arr
                }
                return arr.join(',')
            },
            getMusic(item){
                this.songItem = {
                    name:item.name,
                    url:item.al.picUrl,
                    art:(this.ar(item.ar))
                }
                addMusic(this.songItem)
                this.getSong(this.songItem)
                this.getSongUrl(item.id)
                this.getSongTime(item.dt)
            },
            sort(index,name){
                this.Index = index
                if(index === 5){
                    this.flag = !this.flag
                    this.list.sort((a,b) => {
                        if(this.flag){
                            return b[name] - a[name];
                        }else{
                            return a[name] - b[name];
                        }
                    })
                }

            },
            format(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .songlist{
        .table-head{
            border-bottom: 1px solid #232529;
            display: flex;
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
                    width: 50px;
                }
                &:nth-child(2){
                    width: 40px;
                }
                &:nth-child(3){
                    flex: 2;
                }
                &:nth-child(4),&:nth-child(5){
                    flex: 1;
                }
                &:nth-child(6){
                    width: 70px;
                    border: 0;
                }
            }
        }
        .table-cont{
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
                        width: 50px;
                        text-align: right;
                    }
                    &:nth-child(2){
                        width: 40px;
                        img{
                            width: 50%;
                            display: block;
                        }
                    }
                    &:nth-child(3){
                        flex: 2;
                        color: #fff;
                    }
                    &:nth-child(4),&:nth-child(5){
                        flex: 1;
                    }
                    &:nth-child(6){
                        width: 70px;
                        border: 0;
                    }
                }
            }
        }
        .alert{
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background: transparent;
            .alert-count{
                width: 270px;
                height: 150px;
                margin: 0 auto;
                background-color: #2D2F33;
                top: 50%;
                position: fixed;
                left: 50%;
                margin-left: -135px;
                margin-top: -75px;
                p{
                    font-size: 14px;
                    color: #fff;
                    padding: 20px;
                    text-align: center;
                    line-height: 1.5;
                }
                .btn{
                    border: 0;
                    width: 80px;
                    height: 25px;
                    border-radius: 5px;
                    color: #fff;
                    margin: 0 5px;
                    &:nth-child(1){
                        background: #2E4E7E;
                    }
                    &:nth-child(2){
                        background: #3A3C40;
                    }
                }
            }
        }
    }
</style>