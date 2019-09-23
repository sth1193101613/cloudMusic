<template>
    <div class="mvlist">
        <span class="cat mords" @click="more">{{name}}<i class="fa fa-angle-down" aria-hidden="true"></i></span>
        <ul class="mv-item">
            <li v-for="(item,index) in list" class="lists" @click="push(item)">
                <img v-lazy="item.data.coverUrl" alt="">
                <p class="name">{{item.data.title}}</p>
            </li>
        </ul>
        <div class="ding" v-show="state">
            <div>
                <span class="all">全部视频</span>
                <ul class="itemgroup">
                    <li v-for="(list,index) in groupList" class="groups" @click="addClass(list,index)">
                        <div :class="[{red: Index === index}]" class="reds"></div>
                        {{list.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[],
                groupList:[],
                name:"全部视频",
                Index:0,
                id:'',
                state:false
            }
        },
        methods:{
            _getViedoGroup(id){
                headModel.getViedoGroup(id).then(res => {
                    this.list = res.datas
                })
            },
            addClass(item,index){
                this.name = item.name
                this.Index = index
                this.state = false
                this._getViedoGroup(item.id)
            },
            more(){
                this.state = !this.state
            },
            getGroup(){
                headModel.getVideoGroupList().then(res => {
                    this.groupList = res.data
                    this.id = res.data[1].id
                    this.name = res.data[1].name
                    this._getViedoGroup(this.id)
                })
            },
            push(item){
                this.$router.push({
                    path:'/navs/videoCont',
                    query:{
                        state: 2,
                        id: item.data.vid
                    }
                })
            },
        },
        mounted(){
            this.getGroup()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .mvlist{
        position: relative;
        .mords{
            top: -20px;
            left: 5px;
        }
        .mv-item{
            margin-top: 30px;
        }
        .ding{
            top: -6px;
            left: 5px;
            height: 510px;
            background: #25272B;
            margin-top: 20px;
            overflow: auto;
            padding: 0 20px;
            position: absolute;
            .all{
                border: 1px solid #3A393D;
                text-align: center;
                color: #fff;
                margin: 10px auto;
                padding: 10px;
                display: block;
            }
            .itemgroup{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                .groups{
                    margin: 0px 0px -1px -1px;
                    width: calc(100% / 6);
                    border: 1px solid #3A393D;
                    height: 45px;
                    color: #aeaeae;
                    line-height: 45px;
                    text-align: center;
                    font-size: 12px;
                    position: relative;
                    .reds{
                        &.red{
                            border: 1px solid red;
                            height: 43px;
                            position: absolute;
                            width: 99%;
                            left: 0px;
                            z-index: 1;
                        }
                    }
                }
            }
        }
    }
</style>