<template>
    <div>
        <div>
            <ul>
                <li></li>
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
              limit:30,
          }
        },
        activated  (){
            this.limit = 30
            this.total = 0
            this.getSubscribers(this.SongDetailId,this.limit,0)
        },
        methods:{
            getSubscribers(id,limit,offset){
                headModel.subscribers(id,limit,offset).then((res) => {
                    this.subList = res
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

<style scoped>

</style>