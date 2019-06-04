<template>
    <div class="privatecontent">
        <h2 class="title">{{list.name}}</h2>
        <ul class="private-cont">
            <li v-for="(item,index) in list.result" class="item">
                <div class="container">
                    <i class="fa fa-video-camera" aria-hidden="true"></i>
                    <img :src="item.sPicUrl" alt="">
                    <p class="name">{{item.name}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from '../../../../../api/homePage'
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[]
            }
        },
        methods:{
            getPrivatecontent(){
                headerModel.getPrivatecontent().then((res) => {
                    this.list = res
                })
            }
        },
        created() {
            this.getPrivatecontent()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .privatecontent{
        .title{
            font-size: 15px;
            color: #fff;
            border-bottom: 1px solid #4a4a4a;
            padding-bottom: 10px;
        }
        .private-cont{
            align-items: center;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding-top: 5px;
            margin-bottom: 20px;
            .item{
                width: calc(100% / 3 - 12px);
                padding: 9px;
                &:nth-child(1){
                    padding-left: 0;
                }
                &:nth-child(3){
                    padding-right: 0;
                }
                .container{
                    position: relative;
                    img{
                        max-width: 100%;
                    }
                    i{
                        position: absolute;
                        color: #fff;
                        left: 15px;
                        top: 15px;
                        border: 1px solid #fff;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                        text-align: center;
                        line-height: 25px;
                        background: rgba(0,0,0,.6);
                    }
                    .name{
                        color: #fff;
                        margin-top: 5px;
                        font-size: 12px;
                        padding-bottom: 20px;
                        height: 20px;
                        line-height: 20px;
                    }
                }

            }
        }
    }

</style>