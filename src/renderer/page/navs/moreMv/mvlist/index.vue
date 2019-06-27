<template>
    <div class="mvlist">
        <p class="titles">
            <span class="news">最新MV</span>
            <span v-for="(list,index) in arr" class="tag" :class="[{active:list === name}]" @click="refs(list)">{{list}}</span>
        </p>
        <ul class="mv-item">
            <li v-for="(item,index) in list" class="lists" @click="push(item)">
                <img :src="item.cover" alt="">
                <p class="name">{{item.name}}</p>
                <p>{{item.artistName}}</p>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                num:19,
                name:'内地',
                arr:['内地','港台','欧美','日本','韩国'],
                list:[]
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
            _getMvAll(){
                headModel.getMvAll(this.name,this.num).then((res) => {
                    this.list = res.data
                })
            },
            refs(name){
                this.name = name
                this._getMvAll()
            }
        },
        mounted() {
            this._getMvAll()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mvlist{
        max-width: 1024px;
        margin: 0 auto;
        .titles{
            margin-top: 25px;
            border-bottom: 1px solid #23262C;
            padding-bottom: 10px;
            .news{
                color: #fff;
                font-size: 20px;
            }
            .tag{
                cursor: pointer;
                margin-left: 20px;
                &.active{
                    color: #fff;
                }
            }
        }
        .mv-item{
            padding-top: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-bottom: 20px;
            .lists{
                cursor: pointer;
                width: calc((100% / 3) - 12px);
                padding: 6px;
                .name{
                    color: #fff;
                    line-height: 2;
                    margin-top: 2px;
                    font-size: 12px;
                }
                img{
                    width: 240px;
                    height: 125px;
                }
            }
        }
    }
</style>