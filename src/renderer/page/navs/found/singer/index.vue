<template>
    <div class="singer" ref="singer">
        <div class="sing-box">
            <ul class="box" v-for="(item,index) in list">
                <h2 class="title">{{item.name}}</h2>
                <li class="list" v-for="(group,index) in item.arr" v-if="item.k" @click="getId(group.id)">
                    {{group.name}}
                </li>
                <li class="list" v-for="(group,index) in item.arr" v-if="!item.k" @click="getName(group)">
                    {{group}}
                </li>
            </ul>
        </div>
        <ul class="sing" ref="singer">
            <li v-for="(list,index) in item" :style="{padding:list.padding}">
                <img v-lazy="list.img1v1Url" alt="">
                <p class="name">{{list.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {homePage} from "../../../../api/homePage";
    import Bus from '../../../../Bus'
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                box:null,
                item:[],
                num:1,
                limit:30,
                cat:'',
                name:'',
                list:[
                    {"name":"语种:",arr:[{"name":"全部",id:""},{"name":"华语男",id:"1001"},{"name":"华语女",id:"1002"},{"name":"日本女",id:"6002"},{"name":"日本男",id:"6001"}],k:true},
                    {"name":"分类:",arr:[{"name":"全部",id:""},{"name":"男歌手",id:"4001"},{"name":"女歌手",id:"4002"},{"name":"乐队",id:"4003"}],k:true},
                    {"name":"筛选:",arr:['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H' ,'I', 'J' ,'K ','L' ,'M', 'N' ,'O' ,'P' ,'Q', 'R',' S' ,'T' ,'U' ,'V', 'W', 'X', 'Y' ,'Z','#'],k:false}]
            }
        },
        methods:{
            getSinger(cat,initial,list,page,flag){
                headModel.getSinger(cat,initial,list,page).then((res) => {
                    let item = res.artists
                    let arr =[]
                    for(let i in item){
                        if((Number(i)+1)%5 === 1){
                            this.$set(item[i],'padding','6px 6px 6px 0')
                        }else{
                            this.$set(item[i],'padding','6px')
                        }
                        arr.push(item[i])
                    }
                    this.item = arr
                })
            },
            getId(id){
                this.cat =id
                this.item = []
                this.getSinger(this.cat,this.name)
            },
            getName(name){
                this.name = name
                this.item = []
                this.getSinger(this.cat,this.name)
            },
        },
        created() {
            this.getSinger()
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .singer{
        .sing-box{
            padding-bottom: 20px;
            border-bottom: 1px solid #23262C;
            .box{
                display: flex;
                flex-wrap: wrap;
                color: #828385;
                .title{
                    font-size: 12px;
                    margin-top: 12px;
                    width: 30px;
                    display: inline-block;
                }
                .list{
                    margin-top: 12px;
                    padding: 0 16px;
                    font-size: 12px;
                    cursor: pointer;
                    position: relative;
                    &:after{
                        position: absolute;
                        content: "";
                        width: 1px;
                        height: 10px;
                        right: 0;
                        background: #32343B;
                        top: 3px;
                    }
                    &:last-child{
                        &:after{
                            display: none;
                        }
                    }
                }

            }
        }
        .sing{
            display: flex;
            flex-wrap: wrap;
            margin-top: 20px;
            li{
                width: calc(100% / 5 - 12px);
                img{
                    max-width:100%;
                }
                .name{
                    color: #fff;
                    font-size: 12px;
                    margin: 10px 0;
                }
            }
        }
    }
</style>