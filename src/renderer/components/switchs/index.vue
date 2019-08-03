<template>
    <div class="switch">
        <p v-show="state">
            {{name}}
        </p>
        <div class="box">
        <span v-for="(item,index) in list" @click="swi(item.name,item.key)" v-if="index === Index">
            <img :src="item.icon" alt="">
        </span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import dx from '../../assets/images/dq.png'
    import sx from '../../assets/images/sx.png'
    import sj from '../../assets/images/sj.png'
    export default {
        name: "index",
        data(){
            return{
                state:false,
                Index:0,
                name:'',
                list:[
                    {name:"单曲播放",icon:dx,key:1},
                    {name:'顺序播放',icon:sx,key:2},
                    {name:'随机播放',icon:sj,key:3}
                ]
            }
        },
        watch:{
            name(val,old){
                if(val !== old){
                    setTimeout(res => {
                        this.state = false
                    },2000)
                }
            }
        },
        methods:{
            swi(name,key){
                this.name = name
                this.state = true
                this.Index === 2 ? this.Index = 0:this.Index ++
                this.$emit('setSw',key)
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .switch{
        position: relative;
        right: 20px;
        p{
            position: absolute;
            top: -40px;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            font-size: 12px;
            padding: 5px 15px;
            width: 48px;
            left: -24px;
        }
        .box{
            width: 30px;
            height: 30px;
            span{
                display: block;
                cursor: pointer;
            }
        }
    }
</style>