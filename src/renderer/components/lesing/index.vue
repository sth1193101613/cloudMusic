<template>
    <div class="warapp">
        <div class="progress-wrapper">
            <div class="progress" @mousedown="mousedownHandler" @mouseover="mouseoverHandler" @mousemove="mousemoveHandler" @mouseup="mouseupHandler">
                <div class="left" :style="leftStyle">
                    <div class="ball"></div>
                </div>
                <slot></slot>
            </div>
        </div>
        <div class="btn"></div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                pValue: this.value,
                pMax: this.max,
                pMin: this.min,
                leftStyle: {
                    'width': this.progressPercent + '%',
                },
                isMouseDownOnBall: false,
                isMouseDownOnBody: false,
                outProgressClientX: 0,
                isCurrentProgress: false,
            }
        },
        computed: {
            progressPercent(){
                return (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100;
            },
            progressElement(){
                return this.$el.getElementsByClassName('progress')[0];
            },
        },
        methods: {
            mousedownHandler(e){
                if(e.which === 1){
                    this.isMouseDownOnBall = true;
                    this.isCurrentProgress = true;
                }
            },
            mousemoveHandler(e){
                if(this.isMouseDownOnBall && this.isCurrentProgress){
                    let offsetX = e.clientX - this.outProgressClientX;
                    if(offsetX > 0){
                        if(e.clientX < this.progressElement.clientWidth + this.$el.offsetLeft){
                            let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                            let percent = decimal * 100;
                            this.leftStyle.width = Math.ceil(percent) + '%';
                            this.$emit('pbar-drag', Math.ceil(percent))
                        }else{
                            this.leftStyle.width = '100%';
                            this.$emit('pbar-drag', 100);
                        }
                    }else if(offsetX < 0){
                        if(e.clientX > this.$el.offsetLeft){
                            let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                            let percent = decimal * 100;
                            this.leftStyle.width = Math.ceil(percent) + '%';
                            this.$emit('pbar-drag', Math.ceil(percent))
                        }else{
                            this.leftStyle.width = '0%';
                            this.$emit('pbar-drag', 0);
                        }
                    }
                }
            },
            mouseupHandler(e){
                if(this.isMouseDownOnBall && this.isCurrentProgress){
                    let decimal = (e.clientX - this.$el.offsetLeft) / this.progressElement.clientWidth;
                    let percent = decimal * 100;
                    this.leftStyle.width = percent + '%';
                    this.$emit('pbar-seek', Math.ceil(percent));
                    this.isMouseDownOnBall = false;
                    this.isCurrentProgress = false;
                }
            },
            mouseoverHandler(e){
                if(e.which === 0){
                    this.isMouseDownOnBall = false;
                }
            },
            mouseoutHandler(e){
                if(e.which === 1 && this.isCurrentProgress){
                    this.outProgressClientX = e.clientX;
                    this.isMouseDownOnBody = true;
                }
            },
        },
        watch: {
            progressPercent(cur, old){
                this.leftStyle.width = cur + '%';
            }
        },
        mounted(){
            if(this.leftStyle.width>=100){
                this.leftStyle.width = 100 + '%'
            }else{
                this.leftStyle.width = (this.pValue - this.pMin) / (this.pMax - this.pMin) * 100 + '%';
            }
        },
        props: {
            max: {
                type: Number,
                default: 100,
            },
            min: {
                type: Number,
                default: 0,
            },
            value: {
                type: Number,
                default: 36,
            },
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .warapp{
        display: flex;
        align-items: center;
        flex: 1;
        .progress-wrapper{
            flex: 1;
            .progress{
                width:100%;
                height: 4px;
                background-color: #171719;
                cursor: pointer;
            }
            .left{
                height: 100%;
                width: 30%;
                background-color: #B82525;
                position: relative;
            }
            .ball{
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: #fff;
                position: absolute;
                right: -10px;
                top: -3px;
                &:before{
                    content: "";
                    position: absolute;
                    right: 4px;
                    width: 4px;
                    height: 4px;
                    background: #B82525;
                    border-radius: 50%;
                    top: 4px;
                }
            }
        }
        .btn{
            flex: 1;
        }
    }




</style>