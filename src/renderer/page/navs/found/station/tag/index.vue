<template>
    <div>
        <div class="tags" ref="wrap">
            <i class="fa fa-angle-left" aria-hidden="true" @click="left"></i>
            <div :style="{width:wrapWidth / 3 + 'px'}" class="box">
                <div class="containers" :style="{width:wrapWidth + 'px',left:leftSet+'px'}" ref="conts" @mouseenter="enter" @mouseleave="leave">
                    <ul v-for="(item,index) in pages" class="item" :style="{width:wrapWidth / 3 + 'px'}">
                        <li v-for="(group,index) in item" class="group">
                            <img :src="group.pic96x96Url" alt="">
                            <p class="name">{{group.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <i class="fa fa-angle-right" aria-hidden="true" @click="right"></i>
        </div>
        <div></div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { homePage } from '../../../../../api/homePage'
    let headerModel  = new homePage
    export default {
        name: "index",
        data(){
            return{
                list:[],
                wrapWidth:'',
                leftSet:0,
                num:3,
                isShow:false,
            }
        },
        computed: {
            pages () {
                const pages = []
                this.list.forEach((item, index) => {
                    const page = Math.floor(index / 9)
                    if (!pages[page]) {
                        pages[page] = []
                    }
                    pages[page].push(item)
                })
                return pages
            }
        },
        methods:{
            enter(){

            },
            leave(){

            },
            scrollBarWheel(e){
                let cont = this.$refs.conts
                cont.addEventListener('mousewheel',this.handleScroll,false)
                cont.addEventListener('DOMMouseScroll',this.handleScroll,false)
            },
            handleScroll(e){
                let k = e.deltaY>0?'down':'up'
                if(k === "down"){
                    this.right()
                }else{
                    this.left()
                }
                e.preventDefault()
            },
            getcate(){
                headerModel.getcate().then((res) => {
                    this.list  = res.categories
                })
            },
            right(){
                this.leftSet = Number.parseInt(this.leftSet)
                if(this.num === 1){
                    this.leftSet = this.$refs.conts.style.left
                    this.num = 1
                    return false
                }else{
                    this.num--
                    this.leftSet -= this.$refs.wrap.clientWidth
                }
            },
            left(){
                this.leftSet = Number.parseInt(this.leftSet)
                if(this.num === 3){
                    this.leftSet = this.$refs.conts.style.left
                    this.num = 3
                    return false
                }else{
                    this.num++
                    this.leftSet += this.$refs.wrap.clientWidth
                }
            }
        },
        mounted(){
            this.wrapWidth = this.$refs.wrap.clientWidth * 3
            this.scrollBarWheel()
            window.onresize = () => {
                this.wrapWidth = this.$refs.wrap.clientWidth * 3
                if(this.$refs.wrap.clientWidth === 1024){
                    this.$refs.wrap.clientWidth = 1024
                }
            }
        },
        created(){
            this.getcate()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .tags{
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        min-width: 778px;
        max-width: 1024px;
        position: relative;
        i{
            position: absolute;
            font-size: 24px;
            cursor: pointer;
            z-index: 9;
            &:nth-of-type(1){
                left: 0;
            }
            &:nth-of-type(2){
                right: 0;
                text-align: right;
            }
        }
        .box{
            overflow: hidden;
            position: relative;
            height: 60px;
            padding: 0 20px;
            .containers{
                overflow: hidden;
                position: absolute;
                transition: 1s ease;
                .item{
                    float: left;
                    .group{
                        float: left;
                        width: calc(100% / 9);
                        text-align: center;
                        img{
                            width: 40px;
                            height: 40px;
                            display: block;
                            filter: invert(30%);
                            margin: 0 auto;
                        }
                        .name{
                            font-size: 12px;
                            margin-top: 5px;
                        }
                    }
                }
            }
        }

    }
</style>