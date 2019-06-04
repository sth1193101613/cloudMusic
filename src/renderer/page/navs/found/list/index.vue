<template>
    <div class="songlist">
        <ul class="songs">
            <li v-for="(item,index) in tab" class="song-item" :class="[{active:index === flag}]">
                <span @click="fnIndex(index,item.components)">{{item.name}}</span>
            </li>
        </ul>
        <component :is="name" class="tabs_content"></component>
    </div>
</template>

<script>
    import newsong from './newsong'
    import newdie from './newdie'
    export default {
        name: "index",
        data(){
            return{
                list:[],
                flag:0,
                name:'tab-newsong',
                tab:[
                    {"name":"新歌速递","components":'newsong'},
                    {"name":"新碟上架","components":'newdie'},
                ]
            }
        },
        components:{
            "tab-newsong":newsong,
            "tab-newdie":newdie
        },
        methods:{
            fnIndex(index,data){
                this.flag = index;
                this.name = `tab-${data}`;
            },
            getSong(){

            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .songlist{
        .songs{
            display: flex;
            align-items: center;
            width: 220px;
            margin: 0 auto;
            .song-item{
                text-align: center;
                flex: 1;
                padding: 5px 10px;
                color: #fff;
                font-size: 12px;
                margin: 20px 0 ;
                border: 1px solid #3A3A3F;
                cursor: pointer;
                &:nth-child(1){
                    border-radius: 5px 0 0 5px ;
                }
                &:nth-child(2){
                    border-radius: 0 5px 5px 0 ;
                }
                &.active{
                    background: #3A3A3F;
                }
            }
        }

    }

</style>