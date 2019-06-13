<template>
    <div>
        <v-latesTemp :list="SetTopList"></v-latesTemp>
        <v-global :list="setGlobalList"></v-global>
    </div>
</template>

<script>
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    import latesTemp from './latesTemp'
    import global from './globalTemp'
    import axios from 'axios'
    export default {
        name: "latestmusic",
        data(){
            return{
                promiseList:[],
                SetTopList:{
                    "0":{
                        list:[]
                    },
                    "1":{
                        list:[]
                    },
                    "2":{
                        list:[]
                    },
                    "3":{
                        list:[]
                    },
                    "15":{
                        list:[]
                    },
                },
                setGlobalList:{
                    "5":{
                        list:[]
                    },
                    "6":{
                        list:[]
                    },
                    "7":{
                        list:[]
                    },
                    "8":{
                        list:[]
                    },
                    "9":{
                        list:[]
                    },
                    "10":{
                        list:[]
                    },
                    "11":{
                        list:[]
                    },
                    "12":{
                        list:[]
                    },
                    "13":{
                        list:[]
                    },
                    "14":{
                        list:[]
                    },
                    "16":{
                        list:[]
                    },
                    "17":{
                        list:[]
                    },
                    "18":{
                        list:[]
                    },
                    "19":{
                        list:[]
                    },
                    "20":{
                        list:[]
                    },
                },
                getGlobalList:[]
            }
        },
        methods:{
            getTopList(num){
                headModel.getGroup(num).then((res) => {
                    this.SetTopList[num].list = Object.assign([],this.SetTopList[num].list,res.playlist);
                })
            },
            getGlobalLists(num){
                headModel.getGroup(num).then((res) => {
                    this.setGlobalList[num].list = Object.assign([],this.setGlobalList[num].list,res.playlist);
                })
            },
            setData(){
                this.promiseList = [
                    this.getTopList(0),
                    this.getTopList(1),
                    this.getTopList(2),
                    this.getTopList(3),
                    this.getTopList(15)
                ]
                axios.all(this.promiseList).then(axios.spread((res)=>{}));
            },
            setList(){
                this.getGlobalList  = [
                    this.getGlobalLists(5),
                    this.getGlobalLists(6),
                    this.getGlobalLists(7),
                    this.getGlobalLists(8),
                    this.getGlobalLists(9),
                    this.getGlobalLists(10),
                    this.getGlobalLists(11),
                    this.getGlobalLists(12),
                    this.getGlobalLists(13),
                    this.getGlobalLists(14),
                    this.getGlobalLists(17),
                    this.getGlobalLists(16),
                    this.getGlobalLists(18),
                    this.getGlobalLists(19),
                    this.getGlobalLists(20)
                ]
                axios.all(this.getGlobalList).then(axios.spread((res)=>{}));
            }
        },
        components:{
            "v-latesTemp":latesTemp,
            "v-global":global
        },
        mounted() {
            this.setList()
            this.setData()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>