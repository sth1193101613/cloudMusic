<template>
    <div class="kos">
        <div v-for="(list,ind) in table.cat" class="table">
            <div class="heds">
                <span v-html="list.icon"></span>
                <span>{{list.name}}</span>
            </div>
            <div class="tag">
                <div v-for="(item,index) in list.list" class="conts" @click="addBor(item);tirgeName(item)" :class="[{act:item.name === name}]">
                    <span v-if="item.hot" class="hots">HOT</span>
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "index",
        data(){
            return{
                name:null,
            }
        },
        props:{
            table:{
                type:Object,
                default:null
            }
        },
        methods:{
            addBor(item){
                this.name = item.name
            },
            tirgeName(name){
                this.$emit('change',name.name,false)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .kos{
        width: 94%;
        margin: 0 auto;
        .table{
            display: flex;
            justify-content: flex-start;
            margin-bottom: 10px;
            &:last-child{
                margin-bottom: 0;
                padding-bottom: 20px;
            }
            .heds{
                width: 80px;
                color: #fff;
                display: flex;
                justify-content: space-evenly;
                span{
                    &:nth-child(1){
                        font-size: 25px;
                        flex: 1;
                    }
                    &:nth-child(2){
                        margin: 9px 11px;
                    }
                }
            }
            .tag{
                flex: 1;
                .conts{
                    cursor: pointer;
                    display: inline-block;
                    text-align: center;
                    border: 1px solid #3A393D;
                    width: 84px;
                    height: 35px;
                    line-height: 35px;
                    margin: 0px 0px -1px -1px;
                    position: relative;
                    &.act{
                        border: 1px solid red;
                        z-index: 1;
                    }
                    .hots{
                        position: absolute;
                        font-size: 6px;
                        color: red;
                        right: 3px;
                        top: -11px;
                    }
                }
            }
        }
    }
</style>