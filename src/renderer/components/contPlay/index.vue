<template>

    <transition
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave">
        <div class="playCont" ref="cdWrapper" v-show="fullScreen" @click="close">
            <div></div>
        </div>
    </transition>
</template>

<script>
    import animations from 'create-keyframe-animation'
    export default {
        name: "index",
        props:{
            fullScreen:{
                type:Boolean
            }
        },
        watch:{
            fullScreen(val){
                console.log(val)
            }
        },
        methods:{
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
        top: 0;
        z-index: 10;
        background: #000;
        height: 100%;
        overflow: scroll;
        &::-webkit-scrollbar{
            width: 10px;
            background: #16181C;
        }
        &::-webkit-scrollbar-thumb{
            background: #2C2E32;
            width: 8px;
            border-radius: 20px;
        }
        div{
            height: 1000px;

        }
        &.v-enter-active,&.v-leave-active{
            transition: all 0.4s
        }

        &.v-enter, &.v-leave-to {
            opacity: 0
        }

    }
</style>