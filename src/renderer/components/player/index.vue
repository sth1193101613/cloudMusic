<template>
    <div class="player">
        <div class="playState">
            <div class="state"><img src="../../assets/images/shang.png" alt=""></div>
            <div class="state" @click="audioClick" ><img :src="state === true?player:stop" alt=""></div>
            <div class="state"><img src="../../assets/images/xia.png" alt=""></div>
        </div>
        <v-playerProgress :currentTime="currentTime" :playerTime="playerTime" :percent="percent" class="playerProgress" @percentChange="percentChange"></v-playerProgress>
        <audio :src="'https://music.163.com/song/media/outer/url?id='+playerSrc+'.mp3'" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
        <div class="sett">
            <v-progress :max="100" :value="setVolume" @pbar-seek="seek" @pbar-drag="drag" :min="0"></v-progress>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapMutations} from  'vuex'
    import playerProgress from '../../components/playProgress'
    import progress from '../../components/lesing'
    export default {
        name: "index",
        data(){
            return{
                songReady:false,
                currentTime:null,
                state:false,
                stop:require('../../assets/images/player.png'),
                player:require('../../assets/images/play.png'),
                volume:0
            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerTime',//播放总时间
                'playerState'
            ]),
            percent(){
                return parseFloat(this.currentTime / this.playerTime)
            },
            setVolume(){
                return this.volume * 100
            }
        },
        watch:{
            state(val){
                let audio = this.$refs.audio;
                this.$nextTick(() => {
                    val ? audio.play():audio.pause();
                })
            }
        },
        methods:{
            ...mapMutations({
               getSongState:'SONG_STATE'
            }),
            seek(val){
                this.$refs.audio.volume = parseFloat(val) / 100

            },
            drag(val){
                this.$refs.audio.volume = parseFloat(val) / 100
            },
            change(val){

            },
            percentChange(val){
                this.$refs.audio.currentTime = val * this.playerTime / 1000
            },
            audioClick(){
                this.$nextTick(() => {
                    this.getSongState(this.playerState)
                    this.state = this.playerState
                },20)
            },
            updateTime(e){
                this.volume = e.target.volume
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
            "v-playerProgress":playerProgress,
            "v-progress":progress
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
            width: 240px;
        }
    }
</style>