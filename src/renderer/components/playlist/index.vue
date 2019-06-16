<template>
    <div class="listmusic">
        <img :src="img" alt="" @click="_getAll">
        <ul>
            <li v-for="(item,index) in list">

            </li>
        </ul>
    </div>
</template>

<script>
    import {getAllData} from '../../util'
    export default {
        name: "index",
        data(){
            return{
                img:require('../../assets/images/musiclist.png'),
                list:[]
            }
        },
        methods:{
            _getAll(){
                getAllData().then((res) => {
                    console.log(res)
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .listmusic{
        width: 30px;
        height: 30px;
        margin-right: 20px;
        cursor: pointer;
        img{
            width: 100%;
            display: block;
        }
    }
</style>