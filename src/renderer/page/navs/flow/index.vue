<template>
    <div class="flos">
        <h3 class="titlefl">
            {{setTitle}}
        </h3>
        <div class="foll-list">
            <ul class="container">
                <li v-for="(item,index) in list">
                    <div>
                        <img :src="item.avatarUrl" alt="">
                    </div>
                    <div>
                        <p>{{item.nickname}}</p>
                        <p>{{item.signature}}</p>
                        <p>
                            <span>
                                歌单:{{item.follows}}
                            </span>
                            <span>
                                粉丝:{{item.followeds}}
                            </span>
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { homePage } from '../../../api/homePage'
    let headerModel  = new homePage
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                ids:this.$route.query.id,
                name:this.$route.query.name,
                list:[]
            }
        },
        computed:{
            ...mapState([
                'id'
            ]),
            setTitle(){
                if(Number(this.ids) === 1){
                    return `${this.name}的关注`
                }else{
                    return `${this.name}的粉丝`
                }
            }
        },
        activated(){
            if(Number(this.ids) === 1){
                this._flow()
            }else{
                this._flowd()
            }
        },
        methods:{
            _flow(){
                headerModel.getFoll(this.id).then(res => {
                    this.list = res.follow
                })
            },
            _flowd(){
                headerModel.getFolloweds(this.id).then(res => {
                    this.list = res.followeds
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .flos{
        padding: 20px 30px !important;
        .titlefl{
            color: #fff;
            border-bottom: 1px solid #23262C;
            padding-bottom: 10px;
        }
        .foll-list{
            .container{
                display: flex;
                align-items: center;
                flex-wrap: wrap;
            }
        }
    }
</style>