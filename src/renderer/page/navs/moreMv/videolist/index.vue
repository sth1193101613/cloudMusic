<template>
    <div class="mvlist">
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
            _getVideoGroup(){
                headModel.getVideoGroup().then((res) => {
                    this.list = res.data
                })
            }
        },
        mounted(){
            this._getVideoGroup()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>