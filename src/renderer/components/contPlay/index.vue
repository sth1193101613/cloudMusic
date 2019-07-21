<template>
    <transition
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave">
        <div class="playCont"
             ref="cdWrapper"
             v-show="fullScreen"
             @click="close">
            <div class="adimg" :style="{height:height}">
                <div class="cover" :style="{backgroundImage:  'url(' + msg.al.picUrl + ')',backgroundSize:'100% 100%',height:height}"></div>
                <div class="conts">
                    <div class="le">
                        <img :src="cz" alt="" class="cz" :class="[playerState? 'a':'b']">
                        <div class="gp" :class="[playerState? 'a':'b']" :style="{backgroundImage:  'url(' + gp + ')',backgroundSize:'100%'}">
                            <img :src="msg.al.picUrl" alt="">
                        </div>
                    </div>
                    <div class="ri">
                        <p>
                            <span>{{msg.name}}</span>
                        </p>
                        <div class="lyac">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import animations from 'create-keyframe-animation'
    import {mapState} from  'vuex'
    import {homePage} from "../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
            return{
                cz:require('../../assets/images/cz.png'),
                gp:require('../../assets/images/gp.png'),
                msg:{},
                cover:"",
                height:'',
                background:``,
                lyric:[]
            }
        },
        mounted(){
            this.height = document.documentElement.clientHeight + 'px'
        },
        props:{
            fullScreen:{
                type:Boolean
            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerState'
            ]),
        },
        watch:{
            fullScreen(val){

            },
            playerSrc(val){
                this._getSongDetail()
                this._getLyric()
            }
        },
        methods:{
            _getLyric(){
                headModel.getLyric(this.playerSrc).then((res) => {
                    console.log(res)
                    this.lyric = res.songs[0]
                })
            },
            _getSongDetail(){
                headModel.getSongDetailCont(this.playerSrc).then((res) => {
                    this.msg = res.songs[0]
                })
            },
            close(){
                this.$emit('change',false)
            },
            _getPosAndScale() {
                // 左下角图片的宽度
                const targetWidth = 40
                const width = document.documentElement.clientWidth
                const scale = targetWidth / width
                const x = -(window.innerWidth / 2)
                const y = window.innerHeight  / 2
                return {x ,y , scale}
            },
            enter(el, done) {
                const {x, y, scale} = this._getPosAndScale()
                let animation = {
                    0: {
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`
                    },
                    60: {
                        transform: `translate3d(0 ,0 , 0) scale(1.1)`
                    },
                    100: {
                        transform: `translate3d(0 ,0 , 0) scale(1)`
                    }
                }
                animations.registerAnimation({
                    name: 'move',
                    animation,
                    presets: {
                        duration: 400,
                        easing: 'linear'
                    }
                })
                animations.runAnimation(this.$refs.cdWrapper, 'move', done)
            },
            afterEnter(){
                animations.unregisterAnimation('move')
                this.$refs.cdWrapper.style.animation = ''
            },
            leave(el, done) {
                this.$refs.cdWrapper.style.transition = 'all 0.4s'
                const {x, y, scale} = this._getPosAndScale()
                this.$refs.cdWrapper.style['transform'] = `translate3d(${x}px,${y}px,0) scale(${scale})`
                this.$refs.cdWrapper.addEventListener('transitionend', () => {
                    done()
                })
            },
            afterLeave() {
                this.$refs.cdWrapper.style.transition = ''
                this.$refs.cdWrapper.style['transform'] = ''
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .playCont{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 57px;
        z-index: 10;
        background: -webkit-radial-gradient(closest-side, rgba(66,65,65,1) 0, rgba(0,0,0,1) 100%);
        background: -moz-radial-gradient(closest-side, rgba(66,65,65,1) 0, rgba(0,0,0,1) 100%);
        background: radial-gradient(closest-side, rgba(66,65,65,1) 0, rgba(0,0,0,1) 100%);
        background-position: 50% 50%;
        background-origin: padding-box;
        background-clip: border-box;
        height: 100%;
        overflow: scroll;
        .adimg{
            position: relative;
            .cover{
                opacity: .1;
                position: absolute;
                transition: .5s all;
                left: 0;
                right: 0;
                z-index: -1;
            }
            .conts{
                display: flex;
            }
            .le{
                flex: 1;
                text-align: center;
                position: relative;
                .cz{
                    transform-origin: right bottom;
                    width: 150px;
                    position: absolute;
                    top: -52px;
                    left: 85px;
                    transition: .5s all;
                    &.a{
                        transform: rotateZ(230deg);
                    }
                    &.b{
                        transform: rotateZ(200deg);
                    }
                }
                .gp{
                    position: relative;
                    top: 60px;
                    z-index: -1;
                    width: 330px;
                    height: 330px;
                    left: 100px;
                    animation-fill-mode: forwards;
                    img{
                        width: 220px;
                        height: 220px;
                        border-radius: 50%;
                        margin-top: 55px;
                    }
                    &.a{
                        animation: startRotate 25s linear infinite;
                    }
                    &.b{
                        animation-play-state:paused;
                        -webkit-animation-play-state:paused;
                    }
                }
            }
            .ri{
                flex: 1;
                .lyac{
                    height:420px ;
                    width: 400px;
                    overflow: scroll;
                }
            }
        }
        @keyframes startRotate{
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
        &::-webkit-scrollbar{
            width: 10px;
            background: #16181C;
        }
        &::-webkit-scrollbar-thumb{
            background: #2C2E32;
            width: 8px;
            border-radius: 20px;
        }
        &.v-enter-active,&.v-leave-active{
            transition: all 0.4s
        }
        &.v-enter, &.v-leave-to {
            opacity: 0
        }

    }
</style>