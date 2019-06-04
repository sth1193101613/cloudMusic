<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item  v-for="(list,index) in djRadios" class="swiper">
                <img :src="list.picUrl" alt="">
            </el-carousel-item>
        </el-carousel>

    </div>
</template>

<script>
    import { homePage } from '../../../../../api/homePage'
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return {
                djRadios: []
            }
        },
        methods:{
            getSorganisation(){
                headerModel.getSorganisation().then((res) =>{
                    this.djRadios = res.djRadios
                })
            }

        },
        created(){
            this.getSorganisation()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .banner{
        margin: 20px auto;
        .el-carousel__mask{
            background: transparent;
        }
        .el-carousel__item, .el-carousel__mask{
            left: -75px;
        }
        .el-carousel__item--card{
            width: 70%;
        }
        img{
            max-width: 100%;
        }
    }


</style>