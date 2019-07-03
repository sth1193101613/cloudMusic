<template>
    <div class="player">
        <div class="playState">
            <div class="state"><img src="../../assets/images/shang.png" alt="" @click="reduce"></div>
            <div class="state" @click="audioClick" ><img :src="state === true?player:stop" alt=""></div>
            <div class="state"><img src="../../assets/images/xia.png" alt="" @click="add"></div>
        </div>
        <v-playerProgress :currentTime="currentTime" :playerTime="playerTime" :percent="percent" class="playerProgress" @percentChange="percentChange"></v-playerProgress>
        <audio :src="'https://music.163.com/song/media/outer/url?id='+playerSrc+'.mp3'" @ended="ended" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
        <div class="sett">
            <v-progress :max="100" :value="setVolume" @pbar-seek="seek" @pbar-drag="drag" :min="0"></v-progress>
            <v-playList></v-playList>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {mapState,mapMutations,mapGetters,mapActions} from  'vuex'
    import playerProgress from '../../components/playProgress'
    import progress from '../../components/lesing'
    import playList from '../../components/playlist'
    import {getAllData} from '../../util'
    export default {
        name: "index",
        data(){
            return{
                songReady:false,
                currentTime:null,
                state:false,
                stop:require('../../assets/images/player.png'),
                player:require('../../assets/images/play.png'),
                volume:0.36,
                list:[],
                index:0
            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerTime',//播放总时间
                'playerState',
            ]),
            ...mapGetters([
                'playerIndexSet'
            ]),
            percent(){
                return parseFloat(this.currentTime / this.playerTime)
            },
            setVolume(){
                let num = Number(parseFloat(this.volume * 100).toFixed(2))
                if(num>=100){
                    return 100
                }else{
                    return Number(parseFloat(this.volume * 100).toFixed(2))
                }
            }
        },
        watch:{
            playerSrc(val){
                this.state = false
                this.setState(false)
                this.audioClick()
            },
            state(val){
                let audio = this.$refs.audio;
                this.$nextTick(() => {
                    val ? audio.play():audio.pause();
                })
            }
        },
        created(){
            this._getAll()
        },
        methods:{
            ...mapActions([
                'getSongUrl'
            ]),
            ...mapMutations({
                getSongState:'SONG_STATE',
                setState:'SONG_FALSE',
                addSong:'SONG_INDEX_ADD',
                preSong:'SONG_INDEX_PER',
                playSrc:'SONG_SRC',
                playIndex:'SONG_INDEX',
                getSongTime:'SONG_TIME',
                getSong:'SONG_THIS'
            }),
            ended(e){
                if(e.isTrusted){
                    this.add()
                }
            },
            getName(item){
                this.songItem ={
                    name:item.name,
                    url:item.pic,
                    art:item.auth
                }
                this.getSong(this.songItem)
                this.getSongUrl(item.songId)
                this.getSongTime(item.time)
            },
            reduce(){
                this.preSong()
                if(this.playerIndexSet === -1){
                    this.playIndex(this.list.length-1)
                }
                this.playSrc(this.list[this.playerIndexSet].songId)
                this.getName(this.list[this.playerIndexSet])
                this.$refs.audio.play()
            },
            add(){
                this.addSong()
                if(this.playerIndexSet > this.list.length-1){
                    this.playIndex(0)
                }
                this.playSrc(this.list[this.playerIndexSet].songId)
                this.getName(this.list[this.playerIndexSet])
                this.$refs.audio.load();
                setTimeout(res=> {
                    this.$refs.audio.play();
                }, 200);
            },
            _getAll(){
                getAllData().then((res) => {
                    this.list = res
                })
            },
            seek(val){
                if(val>=100){
                    this.volume =1
                }else{
                    this.volume = Number(parseFloat(val / 100).toFixed(2))
                }
                this.$refs.audio.volume = this.volume
            },
            drag(val){
                if(val<0){
                    this.volume = 0
                }else{
                    this.volume = Number(parseFloat(val / 100).toFixed(2))
                }
                this.$refs.audio.volume = this.volume

            },
            percentChange(val){
                this.$refs.audio.currentTime = val * this.playerTime / 1000
            },
            audioClick(){
                this.$nextTick(() => {
                    this.getSongState(this.playerState)
                    this.state = this.playerState
                    this.$refs.audio.volume = this.volume
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
            "v-playerProgress":playerProgress,
            "v-progress":progress,
            "v-playList":playList
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
            display: flex;
            align-items: center;
        }
    }
</style>