<template>
    <div class="player">
        <div class="playState">
            <div class="state"><img src="../../assets/images/shang.png" alt=""></div>
            <div class="state" @click="audioClick" ><img src="../../assets/images/player.png" alt=""></div>
            <div class="state"><img src="../../assets/images/xia.png" alt=""></div>
        </div>
        <v-playerProgress :currentTime="currentTime" :playerTime="playerTime" :percent="percent" class="playerProgress" @percentChange="percentChange"></v-playerProgress>
        <audio :src="playerSrc" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
        <div class="sett">

        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState} from  'vuex'
    import playerProgress from '../../components/playProgress'
    export default {
        name: "index",
        data(){
            return{
                songReady:false,
                currentTime:null,

            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerTime'//播放总时间
            ]),
            percent(){
                return parseFloat(this.currentTime / this.playerTime)
            },
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
            percentChange(val){
                let nowPlayerTime = val * this.playerTime / 1000
                this.$refs.audio.currentTime = nowPlayerTime
            },
            audioClick(){
                this.$nextTick(() => {
                    let audio = this.$refs.audio
                    audio.play();
                },20)
            },
            updateTime(e){
                this.currentTime = e.target.currentTime; //当前播放时间
            },
            ready(){
                this.songReady = true;
            },
            error(){
                this.songReady = true;
            },
        },
        components:{
            "v-playerProgress":playerProgress
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
            width: 160px;
            display: flex;
            margin: 0 20px;
            .state{
                flex: 1;
                text-align: center;
                img{
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .playerProgress{
            flex: 1;
        }
        .sett{
            width: 180px;
        }
    }
</style>