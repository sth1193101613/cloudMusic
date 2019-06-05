<template>
    <div class="palylist">
        <v-cat :list="list" :hot="hot" @change="getName"></v-cat>
        <v-list :table="table" @change="pages" v-if="table" :total="total"></v-list>
    </div>
</template>

<script>
    import {homePage} from "../../../../api/homePage";
    let headerModel  = new homePage
    import list from './listcat'
    import cat from './cat'
    export default {
        name: "index",
        data(){
            return{
                list :{},
                hot:[],
                table:[],
                page:0,
                total:0,
                name:''
            }
        },
        methods:{
            getcat(){
                headerModel.getCatList().then((res) => {
                    let arr = {}
                    arr.cat = []
                    arr.all = res.all
                    let msg = {
                        "0":{list:[],name:"语种",icon:'<i class="fa fa-map-signs" aria-hidden="true"></i>'},
                        "1":{list:[],mame:'风格',icon:'<i class="fa fa-gg-circle" aria-hidden="true"></i>'},
                        "2":{list:[],name:'场景',icon:'<i class="fa fa-drupal" aria-hidden="true"></i>'},
                        "3":{list:[],name:'情感',icon:'<i class="fa fa-heartbeat" aria-hidden="true"></i>'},
                        "4":{list:[],name:'主题',icon:'<i class="fa fa-pied-piper-alt" aria-hidden="true"></i>'},
                        // yu:[],
                        // fen:[],
                        // chang:[],
                        // qing:[],
                        // zhu:[],
                    }
                    for(let i in res.sub){
                        let k = res.sub[i]
                        msg[k.category].list.push(k)
                        // if(k.category === 0){
                        //     msg.yu.push(k)
                        //     msg.yu.name = "语种"
                        //     msg.yu.icon = '<i class="fa fa-map-signs" aria-hidden="true"></i>'
                        // }
                        // if(k.category === 1){
                        //     msg.fen.push(k)
                        //     msg.fen.name = "风格"
                        //     msg.fen.icon = '<i class="fa fa-gg-circle" aria-hidden="true"></i>'
                        // }
                        // if(k.category === 2){
                        //     msg.chang.push(k)
                        //     msg.chang.name = "场景"
                        //     msg.chang.icon = '<i class="fa fa-drupal" aria-hidden="true"></i>'
                        // }
                        // if(k.category === 3){
                        //     msg.qing.push(k)
                        //     msg.qing.name = "情感"
                        //     msg.qing.icon = '<i class="fa fa-heartbeat" aria-hidden="true"></i>'
                        // }
                        // if(k.category === 4){
                        //     msg.zhu.push(k)
                        //     msg.zhu.name = "主题"
                        //     msg.zhu.icon = '<i class="fa fa-pied-piper-alt" aria-hidden="true"></i>'
                        // }
                        arr.cat = msg
                    }
                    this.list = arr
                })
            },
            pages(value){
                if(value === 1){
                    this.page = 0
                }else{
                    this.page = value * 60
                }
                this.getData(35,this.name,this.page)
            },
            gethot(){
                headerModel.getCatListHot().then((res) => {
                    this.hot = res.tags
                })
            },
            getName(name,state){
                this.name = name
                if(state === false){
                    this.page = 0
                    this.total = 1
                }
                this.getData(35,name,this.page)
            },
            getData(num,name,page){
                this.table = []
                headerModel.getplay(num,name,page).then((res) => {
                    this.table = res.playlists
                    this.total = res.total
                })
            }
        },
        created(){
            this.getName()
            this.getcat()
            this.gethot()
        },
        components:{
            "v-cat":cat,
            "v-list":list
        }
    }
</script>

<style scoped>

</style>