<template>
    <div class="player">
        <div class="playState" @click="audioClick">
            <span>{{formats(currentTime)}}</span>
            <span>1</span>
            <span>{{format(playerTime)}}</span>
        </div>
        <el-progress :percentage="rangeValue"></el-progress>
        <audio :src="playerSrc" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from  'vuex'
    export default {
        name: "index",
        data(){
            return{
                songReady:false,
                currentTime:null,
                rangeValue:0,
                startTime:'00',
            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerTime'
            ]),
        },
        watch:{
            playing(newPlaying){
                let audio = this.$refs.audio;
                this.$nextTick(() => {
                    newPlaying ? audio.play():audio.pause();
                })
            }
        },
        methods:{
            formats(interval){
                interval = interval | 0;
                const minute = interval/60 | 0;
                const second = this._pad(interval % 60);
                return `${minute}:${second}`;
            },
            _pad(num,n=2){
                let len = num.toString().length;
                while(len<n){
                    num = '0' + num;
                    len ++;
                }
                return num;
            },
            format(interval){
                let  min = Math.floor((interval/1000/60) << 0)
                let  sec = Math.floor((interval/1000) % 60)
                return `${min}:${sec}`
            },
            audioClick(){
                this.$nextTick(() => {
                    let audio = this.$refs.audio
                    audio.play();
                },20)
            },
            updateTime(e){
                this.currentTime = e.target.currentTime;    // 获取当前播放时间段
                // this.rangeValue = parseInt(this.currentTime)
            },
            ready(){
                this.songReady = true;
            },
            error(){
                this.songReady = true;
            },
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .player{
        display: flex;
        align-items: center;
        position: fixed;
        height: 50px;
        background: #222225;
        z-index: 1002;
        bottom: 0;
        left: 0;
        right: 0;
        .playState{

        }
    }
</style>