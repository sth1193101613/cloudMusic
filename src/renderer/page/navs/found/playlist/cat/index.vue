<template>
    <div class="cats" v-if="list.all">
        <span class="cat" @click="cl">歌单<i class="fa fa-angle-down" aria-hidden="true"></i></span>
        <ul class="hot">
            <h3>热门标签:</h3>
            <li v-for="(list,index) in hot" class="hot-item" @click="tirgeName(list)">
                {{list.name}} <i v-if="index !== 9"></i>
            </li>
        </ul>
        <div class="tabs" v-if="state">
            <h2>添加标签</h2>
          <div class="tbs" >
              <div class="btn" @click="tirgeName(list.all)">{{list.all.name}}</div>
              <v-table :table="list" @change="getName"></v-table>
          </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import table from '../table'
    export default {
        name: "index",
        data(){
            return{
                state:false
            }
        },
        props:{
            list:{
                type:Object,
                default:null
            },
            hot:{
                type:Array,
                default:null
            }
        },
        methods:{
            cl(){
               this.state = !this.state
            },
            tirgeName(name){
                this.state = false
                this.$emit('change',name.name,false)
            },
            getName(name){
                this.state = false
                this.$emit('change',name,false)
            }
        },
        components:{
            "v-table":table
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .cats{
        position: relative;
        height: 80px;

        .hot{
            position: absolute;
            top: 60px;
            display: flex;
            align-items: center;
            width: 100%;
            h3{
                color: #fff;
                font-size: 12px;
                width: 90px;
            }
            .hot-item{
                cursor: pointer;
                font-size: 12px;
                line-height: 1;
                position: relative;
                width: 12%;
                text-align: center;
                i{
                    height: 12px;
                    width: 1px;
                    background: #24322B;
                    position: absolute;
                    right: 0;
                }
            }
        }
        .tabs{
            position: relative;
            top: 60px;
            z-index: 2;
            height: 415px;
            &:before{
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #2d2d33;
                content: "";
                position: absolute;
                width: 0;
                top: -10px;
                margin-left: 20px;
            }
            h2{
                background: #25272B;
                width: 510px;
                text-align: center;
                position: absolute;
                color: #fff;
                overflow: hidden;
                font-size: 12px;
                padding: 15px;
                border-bottom: 1px solid #4a4a4a;
                z-index: 2;
            }
            .tbs{
                width: 540px;
                height: 365px;
                padding-top: 60px;
                background: #25272B;
                overflow: auto;
                &::-webkit-scrollbar{
                    width:0;
                    background: #16181C;
                }
                &::-webkit-scrollbar-thumb{
                    background: #2C2E32;
                    width: 8px;
                    border-radius: 20px;
                }
                .btn{
                    border: 1px solid #4a4a4a;
                    text-align: center;
                    width: 90%;
                    margin: 10px auto;
                    padding: 10px;
                    font-size: 12px;
                    cursor: pointer;
                }
            }
        }
    }
</style>