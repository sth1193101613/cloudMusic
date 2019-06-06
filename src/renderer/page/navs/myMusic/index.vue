<template>
    <div class="myMusic">
       <div class="music-head">
           <div>
               <img :src="list.coverImgUrl" alt="">
           </div>
           <div>
               <ul>
                   <li>
                       <span>歌单</span>
                       <span>{{list.name}}</span>
                   </li>
                   <li>
                       <img v-if="list.creator" :src="list.creator.avatarUrl" alt="">
                       <span>{{list.createTime | setTime}}创建</span>
                   </li>
               </ul>

           </div>
           <div></div>
       </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    let headModel = new homePage
    import {mapState} from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                list:[]
            }
        },
        filters:{
            setTime(val){
                let time = new Date(val);
                let y = time.getFullYear();
                let m = time.getMonth()+1;
                let d = time.getDate();
                return `${y}-${m}-${d}`
            }
        },
        watch:{
            SongDetailId(val){
                if(this.$route.name === 'myMusic'){
                    this._getSongDetail()
                }
            }
        },
        computed:{
            ...mapState([
                'SongDetailId'
            ])
        },
        methods:{
            _getSongDetail(){
                headModel.getSongDetail(this.SongDetailId).then((res) => {
                    this.list = res.playlist
                })
            }
        },
        created() {
            if(this.$route.name === 'myMusic') {
                this._getSongDetail()
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>
