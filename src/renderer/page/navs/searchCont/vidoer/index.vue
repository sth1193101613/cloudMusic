<template>
    <div>
        <ul class="mvcont">
            <li v-for="(list,index) in songer" class="mvsearch" @click="push(list)">
               <div class="imgs">
                   <img :src="list.cover" alt="">
                   <span class="dura">{{format(list.duration)}}</span>
               </div>
               <div class="conts">
                   <p class="name">{{list.name}}</p>
                   <p>
                       by <span v-for="(item,index) in list.artists">{{item.name}}</span>
                   </p>
               </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../api/homePage";
    const headerModel  = new homePage
    export default {
        name: "index",
        props:{
            name:{
                Type:String
            }
        },
        data(){
            return{
                songer:[]
            }
        },
        methods:{
            push(item){
                this.$router.push({
                    path:'/navs/videoCont',
                    query:{
                        id:item.id
                    }
                })
            },
            format(time){
                let  min = Math.floor((time/1000/60) << 0)
                let  sec = Math.floor((time/1000) % 60)
                return `${min}:${sec}`
            },
            _getSearch() {
                headerModel.getSearchList(this.name,1004,this.limit).then((res) => {
                    this.songer = res.result.mvs
                })
            }
        },
        created() {
            this._getSearch()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mvcont{
        display: flex;
        flex-wrap: wrap;
        .mvsearch{
            padding: 15px;
            width: calc((100% / 4) - 30px);
            position: relative;
            .imgs{
                position: relative;
                .dura{
                    position: absolute;
                    bottom: 4px;
                    width: 100%;
                    background: rgba(0,0,0,.2);
                    padding-left: 10px;
                    box-sizing: border-box;
                    color: #fff;
                    height: 20px;
                    line-height: 20px;
                }
            }
            .conts{
                .name{
                    color: #fff;
                    margin: 5px 0;
                }
                p{
                    font-size: 12px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }
        }
    }

</style>