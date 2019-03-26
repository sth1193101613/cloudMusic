<template>
    <div class="banner">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item  v-for="(list,index) in banner" class="swiper">
                <img :src="list.imageUrl" alt="">
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
                banner: []
            }
        },
        methods:{
            getBannerList(){
                headerModel.getBanner().then((res) => {
                    this.banner = res.banners
                })
            }

        },

        created(){
            this.getBannerList()
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