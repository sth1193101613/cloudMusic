<template>
    <div class="color">
        <ul>
            <li v-for="(list,index) in tab" :class="[{active:Index === index}]" @click="tabs(index)">
                {{list}}
            </li>
        </ul>
        <div>
            <div v-if=" Index === 0" class="colorList colorMain">
                <div v-for="(list,index) in colorList.colorMain" :style="[{background:list.color}]" @mouseenter="enter(list.color,index)"
                     @mouseleave="leave" @click="colorChange(list)" :class="[{active:handelColor === index}]">
                    <span v-if="colorIndex === index" :style="[{border:`1px solid ${list.color}`}]"></span>
                    <i class="fa fa-check check" aria-hidden="true" v-if="handelColor === list.id"></i>
                </div>
            </div>
            <div v-if="Index === 1" class="colorList">
                <div v-for="(list,index) in colorList.color" :style="[{background:list.color}]" @mouseenter="enter(list.color,index)"
                     @mouseleave="leave" @click="colorChange(list)" :class="[{active:handelColor === index}]">
                    <span v-if="colorIndex === index" :style="[{border:`1px solid ${list.color}`}]"></span>
                    <i class="fa fa-check check" aria-hidden="true" v-if="handelColor === list.id"></i>
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
                handelColor:'',
                Index:0,
                colorIndex:null,
                tab:['主题','纯色'],
                colorList:{
                    color:[{id:1,color:'#FF5C8A'},{id:2,color:'#FF7A9E'},{id:3,color:'#FE76C8'},{id:4,color:'#717FF9'},
                        {id:5,color:'#4791EB'},{id:6,color:'#39AFEA'},{id:7,color:'#2BB669'},{id:8,color:'#6ACC19'},
                        {id:9,color:'#E2AB12'},{id:10,color:'#FF8F57'},{id:11,color:'#FD726D'},{id:12,color:'#FD544E'}],
                    colorMain:[{id:13,color:'#FF5C8A'},{id:14,color:'#FF7A9E'},{id:15,color:'#FE76C8'},{id:16,color:'#717FF9'},
                        {id:17,color:'#4791EB'},{id:18,color:'#39AFEA'}]
                }
            }
        },
        methods:{
            enter(list,index){
                this.colorIndex = index
            },
            leave(){
                this.colorIndex = null
            },
            tabs(index){
                this.Index = index
            },
            colorChange(value,index){
                this.handelColor = value.id
                this.$emit('color',value.color,'#fff')
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .color{
        width: 320px;
        height: 250px;
        position: absolute;
        background: #2d2d33;
        top: 71px;
        right: 59px;
        border-radius: 5px;
        ul{
            line-height: 2;
            border-bottom: 1px solid #666;
            width: 90%;
            margin: 0 auto;
            font-size: 13px;
            text-align: left;
            padding-top: 5px;
            li{
                cursor: pointer;
                display: inline-block;
                vertical-align: middle;
                flex: 1;
                color: #666666;
                &.active{
                    color: #fff;
                    border-bottom: 2px solid #5F5F63
                }
                &:nth-child(2){
                    margin: 0 10px;
                }
            }
        }
        .colorList{
            display: flex;
            align-items: center;
            flex-direction: row;
            flex-wrap: wrap;
            margin:10px;
            div{
                width: calc((100% / 6) - 10px);
                height: 40px;
                margin: 5px;
                box-sizing: border-box;
                cursor: pointer;
                position: relative;
                span{
                    display: block;
                    height: 42px;
                    width: 42px;
                    padding: 0px;
                    margin-left: -2px;
                    margin-top: -2px;
                }
                .check{
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    color: #fff;
                    background: red;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: -5px;
                    bottom: -5px;
                    border: 2px solid #fff;
                    font-size: 12px;
                }
            }
            &.colorMain{
                div{
                    width: calc((100% / 3) - 10px);
                    height: 90px;
                    span{
                        height: 92px;
                        width: 92px;
                    }
                }
            }
        }
    }

</style>