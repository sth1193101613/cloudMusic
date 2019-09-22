<template>
    <transition
            @enter="enter"
            @after-enter="afterEnter"
            @leave="leave"
            @after-leave="afterLeave">
        <div class="playCont"
             ref="cdWrapper"
             v-show="fullScreen">
            <div class="adimg">
                <div class="icons" @click="close"><img src="../../assets/images/big.png" alt=""></div>
                <div class="cover" :style="{backgroundImage:  'url(' + song.url + ')',backgroundSize:'100% 100%',height:height,filter: 'blur(10px)'}"></div>
                <div class="conts">
                    <div class="le">
                        <img :src="cz" alt="" class="cz" :class="[playerState? 'a':'b']">
                        <div class="gp"
                             :style="[{backgroundImage:  'url(' + gp + ')',backgroundSize:'100%',transform: 'rotate('+rotate+'deg)'}]">
                            <img :src="song.url" alt="">
                        </div>
                    </div>
                    <div class="ri">
                        <p class="info">
                            <span>{{song.name}}</span>
                            <span>{{song.art}}</span>
                        </p>
                        <div class="parent">
                            <v-scroll :ops="ops" class="lyac" v-if="currentLyric" ref="vs">
                                <div class="lyacCher">
                                    <p v-for="(list,index) in currentLyric.lines" :class="{'current':currentLineNum === index}"  >
                                        {{list.txt}}
                                    </p>
                                </div>
                            </v-scroll>
                        </div>
                    </div>
                </div>
            </div>
            <div  class="commonCont">
                <v-comment style="flex: 1;" :hotList="hotList" :nweList="nweList" :total="total"/>

                <ul class="simi">
                    <h3 class="simit">相似歌曲</h3>
                    <li v-for="(list,index) in simi" class="simiList" @click="getId(list)">
                        <div class="simsimg">
                            <img :src="list.album.picUrl" alt="">
                        </div>
                        <div class="simscont">
                            <p class="contname">{{list.name}}</p>
                            <p class="albname">{{list.album.artists[0].name}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </transition>
</template>

<script>
    import animations from 'create-keyframe-animation'
    import {mapState,mapActions,mapMutations} from  'vuex'
    import {homePage} from "../../api/homePage";
    import Lyric from '../../../../lyric'
    import Bus from '../../Bus'
    import scroll from 'vuescroll';
    import comment from '../comment'
    let headModel = new homePage
    export default {
        name: "index",
        components: {
            "v-scroll":scroll,
            "v-comment":comment
        },
        data(){
            return{
                ops:{
                    vuescroll: {
                        mode: 'native',
                        speed: 300,
                    },
                    scrollPanel: {
                        easing:'easeInOutQuad',
                        speed:400
                    },
                    rail: {
                        background:'#2C2E32',
                        gutterOfSide:'10px',
                        opacity:1,
                        keepShow:false
                    },
                    bar: {
                        minSize:0.2,
                        opacity:1,
                        onlyShowBarOnScroll:false,
                        keepShow:true,
                        background:'#16181C'
                    }
                },
                cz:require('../../assets/images/cz.png'),
                gp:require('../../assets/images/gp.png'),
                msg:{},
                cover:"",
                height:'',
                background:``,
                lyric:'',
                currentLyric:{},
                currentLineNum:0,
                hotList:[],
                nweList:[],
                total:0,
                limit:30,
                simi:[],
                songItem:{},
                rotate: 0,
                timer:null
            }
        },
        mounted(){
            this.height = document.documentElement.clientHeight + 'px'
            this. _getLyric()
            this._getSimiSong()
            this._getHot(this.playerSrc,this.limit,0)
            Bus.$on('stop',cont => {
                if(!cont){
                    this.currentLyric.togglePlay()
                }
            })
            Bus.$on('setCurrTime',cont => {
                if(this.currentLyric){
                    this.currentLyric.seek(parseInt(cont) * 1000)
                }
            })
            Bus.$on('index',() => {
                if(this.currentLyric){
                    this.currentLyric.seek(0)
                }
            })
        },
        props:{
            fullScreen:{
                type:Boolean
            }
        },
        computed: {
            ...mapState([
                'playerSrc',
                'playerState',
                'song'
            ]),

        },
        watch:{
            playerState(val){
                val ? this.setRotate() : clearInterval(this.timer)
                if(!val){
                    if(this.currentLyric){

                        this.currentLyric.stop()
                    }
                }
            },
            playerSrc(val,old){
                if(val === old){
                    return false
                }
                if(this.currentLyric){
                    this.currentLyric.stop()
                }
                this.$nextTick(res => {
                    this._getLyric()
                })
                this.rotate = 0
                clearInterval(this.timer)
                this._getSimiSong()
                this._getHot(this.playerSrc,this.limit,0)
            }
        },
        methods:{
            ...mapActions([
                'getSongUrl'
            ]),
            ...mapMutations({
                getSongTime:'SONG_TIME',
                getSong:'SONG_THIS'
            }),
            setRotate(){
                this.timer = null
                clearInterval(this.timer)
                this.timer = setInterval(() => {
                    this.rotate === 360? this.rotate = 0 : this.rotate ++
                },30)
            },
            getId(item){
                this.songItem ={
                    name:item.name,
                    url:item.album.blurPicUrl,
                    art:item.artists[0].name
                }
                this.getSong(this.songItem)
                this.getSongUrl(item.id)
                this.getSongTime(item.bMusic.playTime)
            },
            _getSimiSong(){
                headModel.getSimiSong(this.playerSrc).then(res => {
                    this.simi = res.songs
                })
            },
            _getHot(id,limit,offset){
                headModel.getCommoent(id,limit,offset).then((res) => {
                    this.hotList = res.hotComments
                    this.nweList = res.comments
                    this.total = res.total
                })
            },
            _getLyric(){
                headModel.getLyric(this.playerSrc).then((res) => {
                    this.lyric = res.lrc.lyric
                    this.currentLyric = new Lyric (this.lyric,obj => {
                        this.currentLineNum = obj.lineNum
                        let active = 150-(obj.lineNum*32)
                        if (obj.lineNum > 5) {
                            this.$nextTick(() => {
                                this.$refs.vs.scrollTo({y: Math.abs(active)}, 400, 'easeInQuad');
                            })
                        }else{
                            this.$nextTick(() => {
                                this.$refs.vs.scrollTo({y: 0}, 500, 'easeInQuad');
                            })
                        }
                    })
                    if(this.playerState){
                        this.currentLyric.play()
                    }
                })
            },
            close(){
                this.$emit('change',false)
            },
            _getPosAndScale() {
                let targetWidth = 52
                let width = document.documentElement.clientWidth
                let scale = targetWidth / width
                let x = -(window.innerWidth / 2)
                let y = window.innerHeight  / 2
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
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .playCont{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 57px;
        z-index: 2;
        background: #000;
        background-position: 50% 50%;
        background-origin: padding-box;
        background-clip: border-box;
        height: 100%;
        overflow: scroll;
        .commonCont{
            padding: 20px 60px 100px;
            display: flex;
            max-width: 1024px;
            margin: 0 auto;
            .simi{
                margin-left: 50px;
                width: 200px;
                margin-top: 30px;
                .simit{
                    color: #fff;
                    border-bottom: 1px solid #292929;
                    margin-bottom: 10px;
                    padding-bottom: 10px;
                }
                .simiList{
                    display: flex;
                    align-items: center;
                    margin-bottom: 10px;
                    .simsimg{
                        width: 50px;
                        height: 50px;
                        img{
                            display: block;
                            max-width: 100%;
                            height: 100%;
                        }
                    }
                    .simscont{
                        margin-left: 15px;
                        p{
                            font-size: 13px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            line-height: 2;
                        }
                        .contname{
                            color: #fff;
                        }
                        .albname{
                            color: #cecece;

                        }
                    }
                }
            }
        }
        .adimg{
            background: radial-gradient(closest-side, #424141 0, #000000 100%);
            z-index: -1;
            position: relative;
            .icons{
                position: absolute;
                right: 30px;
                width: 20px;
                height: 20px;
                background: #3b3b3b;
                top: 45px;
                padding: 5px 10px;
            }
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
                    transform-origin: 0 0;
                    position: absolute;
                    top: -35px;
                    transition: 0.5s all;
                    &.a{
                        transform: rotateZ(25deg);
                    }
                    &.b{
                        transform: rotateZ(0deg);

                    }
                }
                .gp{
                    position: relative;
                    top: 60px;
                    z-index: -1;
                    width: 330px;
                    height: 330px;
                    left: 100px;
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
                    }
                }
            }
            .ri{
                flex: 1;
                .parent{
                    position: relative;
                    height:300px ;
                    width: 400px;
                    .lyac{
                        p{
                            color: #7A7D7F;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            height: 16px;
                            line-height: 16px;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            display: -webkit-box;
                            text-align: left;
                            margin-top: 0;
                            margin-bottom: 16px;
                            &.current{
                                color: #fff;
                            }
                        }
                    }
                }
                .info{
                    color: #fff;
                    font-size: 20px;
                    margin-top: 45px;
                    margin-bottom: 30px;
                    span{
                        display: block;
                        &:nth-child(2){
                            margin-top: 10px;
                            font-size: 14px;
                        }
                    }
                }
            }
        }


        @keyframes startRotate {
            from { transform: rotate(0) }
            to { transform: rotate(360deg) }
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