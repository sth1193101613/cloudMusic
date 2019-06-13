<template>
    <div class="user-detail" style="padding: 0 0   b 50px;">
        <div class="det" v-if="user.profile">
            <div class="img">
                <img :src="user.profile.avatarUrl" alt="">
            </div>
            <div class="cont">
                <div class="c-head">
                    <span class="name">{{user.profile.nickname}}</span>
                    <img class="sex" :src="user.profile.gender === 1?man:woman" alt="">
                    <span class="level">Lv.{{user.level}}</span>
                </div>
                <div class="c-cont">

                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                uid:this.$route.query.id,
                user:{},
                man:require('../../../assets/images/man.png'),
                woman:require('../../../assets/images/woman.png')
            }
        },
        activated(){
            this._getUserDetail()
        },
        methods:{
            _getUserDetail(){
                headModel.getUserDetail(this.uid).then((res) => {
                    this.user = res
                })
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .user-detail{
        .det{
            overflow: hidden;
            display: flex;
            padding: 25px 25px 0;
            .img{
                width: 200px;
                height: 200px;
                img{
                    display: block;
                    max-width: 100%;
                }
            }
            .cont{
                flex: 1;
                margin-left: 20px;
                .c-head{
                    display: flex;
                    padding-bottom: 10px;
                    align-items: center;
                    border-bottom: 1px solid #23262C;
                    *{
                        margin: 0 5px;
                    }
                    .name{
                        color: #fff;
                        font-size: 24px;
                        font-family: 微软雅黑;
                    }
                    .level{
                        border: 1px solid #B82525;
                        color: #B82525;
                        border-radius: 20px;
                        padding: 0px 8px;
                        font-weight: 800;
                    }
                    .sex{
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }

    }
</style>