<template>
    <div class="navs-tab">
        <div class="tab">
            <ul>
                <li v-for="(item,index) in router" class="group">
                    <h3>{{item.title}}</h3>
                    <router-link  v-for="(group,index) in item.item" :to="{ path: group.path}" tag="div" class="item" @click.native="toggle(group.id,group.path)" :class="[{active:GroupId === group.id}]">
                        <div class="red" v-if="GroupId === group.id"></div>
                        <i class="fa" aria-hidden="true" :class="group.icon"></i>
                        <span>{{group.name}}</span>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="music">

        </div>
        <div @scroll="scroll" class="scroll">
            <keep-alive>
                <router-view class="count" ref="scroll"></router-view>
            </keep-alive>
        </div>
        <v-player></v-player>
    </div>
</template>

<script>
    import Bus from '../../Bus'
    import player from '../../components/player'
    import {mapState,mapMutations} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                GroupId:1,
                height:null,
            }
        },
        computed:{
            ...mapState([
                'router'
            ])
        },
        components:{
            "v-player":player
        },
        methods:{
            ...mapMutations({
                getSongDetailId:'SONG_DETAILID'
            }),
            toggle(id){
                Bus.$emit('change','songlist')
                this.GroupId = id
                this.getSongDetailId(id)
            },
            clientHeight(){
                this.height = document.documentElement.clientHeight
            },
            scroll(e){
                if(e.srcElement.scrollTop+e.srcElement.offsetHeight>e.srcElement.scrollHeight-100){
                    Bus.$emit('scrollBottom',true)
                }
            }
        },
        mounted(){
            this.clientHeight()
            window.onresize = () => {
                this.clientHeight()
            }
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../assets/css/common";
    .navs-tab{
        position: relative;
        display: flex;
        width: 100%;
        .tab{
            margin-top: 57px;
            width: 200px;
            background: @tab;
            height: calc(100% - 172px);
            position: fixed;
            z-index: 2;
            overflow-y: scroll;
            &::-webkit-scrollbar{
                width: 10px;
                background: #16181C;
            }
            &::-webkit-scrollbar-thumb{
                background: #2C2E32;
                width: 8px;
                border-radius: 20px;
            }
            .group{
                h3{
                    padding: 10px 10px;
                    font-size: 14px;
                    margin-left: 10px;
                }
                .item{
                    cursor: pointer;
                    color: #DCDDE3;
                    padding-left: 15px;
                    line-height: 3;
                    font-size: 13px;
                    position: relative;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    .red{
                        position: absolute;
                        width: 3px;
                        height: 100%;
                        background: red;
                        left: 0;
                    }
                    &.active{
                        background: #26282C;
                        box-sizing: border-box;
                    }
                    i{
                        margin-right: 10px;
                        width: 15px;
                    }
                    &:nth-child(1){
                        background: #26282C;
                        padding-top: 0;
                    }
                }
            }
        }
        .music{
            background: red;
            height: 65px;
            position: fixed;
            width: 200px;
            bottom: 50px;
            z-index: 9;
        }
        .scroll{
            position: fixed;
            top:0px;
            left: 0;
            right:0;
            overflow: auto;
            bottom: 0;
            background: #16181C;
            &::-webkit-scrollbar{
                width:10px;
                background: #16181C;
            }
            &::-webkit-scrollbar-thumb{
                background: #2C2E32;
                width: 8px;
                height: 140px;
                border-radius: 20px;
            }
        }
        .count{
            margin-top: 57px;
            background: @cont;
            flex: 1;
            margin-left: 200px;
            padding: 0 25px;
            padding-bottom: 50px;
        }
    }
</style>