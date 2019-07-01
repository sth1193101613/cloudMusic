<template>
    <div>
        <div>
            <ul class="sub-cont">
                <li v-for="(list,index) in subList" class="sub" @click="push(list.userId)">
                    <img :src="list.avatarUrl" alt="">
                    <p>{{list.nickname}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                subList:[],
                limit:40,
                page:1
            }
        },
        activated  (){
            this.limit = 40
            this.total = 0
            this.getSubscribers(this.$route.query.id,this.limit,0)
        },
        methods:{
            getSubscribers(id,limit,offset){
                headModel.subscribers(id,limit,offset).then((res) => {
                    this.subList = res.subscribers
                })
            },
            push(id){
                this.$router.push({
                    path:'/navs/user',
                    query:{
                        id
                    }
                })
            }
        },
        computed:{
            ...mapState([
                'SongDetailId'
            ]),
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .sub-cont{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-align: center;
        .sub{
            width: calc(100% / 5);
            padding: 20px 0;
            img{
                width: 62px;
                height: 62px;
                border-radius: 50%;
            }
            p{
                color: #828385;
                font-size: 12px;
                margin-top: 8px;
            }
        }
    }
</style>