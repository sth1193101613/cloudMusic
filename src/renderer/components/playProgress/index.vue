<template>
    <div class="playerPro-container">
        <span class="currentTime">{{formats(currentTime)}}</span>
        <div class="progress-bar" ref="progressBar" @click="progressClick">
            <div class="bar-inner">
                <div class="progress" ref="progress"></div>
                <div class="progress-btn-wrapper" ref="progressBtn">
                    <div class="progress-btn"></div>
                </div>
            </div>
        </div>
        <span class="playerTime">{{format(playerTime)}}</span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "index",
        data() {
            return {
                btnWidth: '',
                touchInfo: {
                    initiated: false
                }
            }
        },
        props: {
            currentTime: {
                type: [Number, String],
                default: null
            },
            playerTime: {
                type: [Number, String],
                default: null
            },
            percent: {
                type: Number,
                default: 0
            }
        },
        watch: {
            percent(newPercent,) {
                if (newPercent > 0 && !this.touchInfo.initiated) {
                    let barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
                    let offsetWidth = barWidth * (newPercent * 1000)
                    this._setOffset(offsetWidth)
                }
            },
        },
        mounted() {
            this.btnWidth = document.getElementsByClassName('progress-btn')[0].clientWidth
        },
        methods: {
            formats(interval) {
                interval = interval | 0;
                const minute = interval / 60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            _pad(num, n = 2) {
                let len = num.toString().length;
                while (len < n) {
                    num = '0' + num;
                    len++;
                }
                return num;
            },
            format(interval) {
                let min = Math.floor((interval / 1000 / 60) << 0)
                let sec = this._pad(Math.floor((interval / 1000) % 60))
                return `${min}:${sec}`
            },
            _setOffset(offset) {
                this.$refs.progress.style.width = `${offset}px`
                this.$refs.progressBtn.style.transform = `translate3d(${offset}px, 0, 0)`
            },
            _triggerPercent() {
                let barWidth = this.$refs.progressBar.clientWidth - this.btnWidth
                let percent = this.$refs.progress.clientWidth / barWidth
                this.$emit('percentChange', percent)
            },
            progressClick(e) {
                const rect = this.$refs.progressBar.getBoundingClientRect();
                const offsetWidth = e.pageX - rect.left;
                this._setOffset(offsetWidth)
                this._triggerPercent()
            },
        },
        computed: {
            percent() {
                return this.currentTime / this.playerTime
            },
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .playerPro-container{
        display: flex;
        align-items: center;
        .currentTime,.playerTime{
            width: 35px;
            margin: 0 10px;
        }
        .progress-bar{
            flex: 1;
            height: 1px;
            .bar-inner{
                position:relative;
                height: 4px;
                background: #171719;
                .progress{
                    position:absolute;
                    height:100%;
                    background:#B82525
                }
                .progress-btn-wrapper{
                    position:absolute;
                    left: -5px;
                    top: -5px;
                    width: 5px;
                    height: 5px;
                    .progress-btn{
                        position: relative;
                        top: 0px;
                        left: 5px;
                        box-sizing: border-box;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        background: #fff;
                        &:before{
                            position: absolute;
                            content: "";
                            width: 4px;
                            height: 4px;
                            background: #B82525;
                            border-radius: 50%;
                            left: 50%;
                            margin-left: -2px;
                            top: 50%;
                            margin-top: -2px;
                        }
                    }
                }
            }
        }
    }

</style>