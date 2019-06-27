<template>
    <div class="songlist">
        <ul class="table-head">
            <li v-for="(nav,index) in item" @click="sort(index,'dt')" :class="[{active:index === Index}]">
                {{nav}} <span v-if="index === 5" class="span"><img :src="flag?top:bottom" alt=""></span>
            </li>
        </ul>
        <ul class="table-cont">
            <li v-for="(item,index) in list" @dblclick="getMusic(item)">
                <span>{{index<9?`0${index+1}`:index+1}}</span>
                <span><img :src="item.liked?liket:likef" alt=""></span>
                <span>{{item.name}}</span>
                <span>{{item.ar[0].name}}</span>
                <span>{{item.al.name}}</span>
                <span v-if="item.l">{{format(item.dt)}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapActions,mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                item:['','操作','音乐标题','歌手','专辑','时长'],
                flag:true,
                Index:null,
                msg:{},
                top:require('../../../../assets/images/s.png'),
                bottom:require('../../../../assets/images/x.png'),
                liket:require('../../../../assets/images/lovet.png'),
                likef:require('../../../../assets/images/lovef.png'),
                songItem:{}
            }
        },
        props:{
            list:{
                type:Array
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
        }
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
    }
</style>