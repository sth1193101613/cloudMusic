<template>
    <div class="mvs">
        <div class="mvs-conts">
            <div class="mvs-left">
                <div class="title">
                    <i class="el-icon-arrow-left"></i><span class="name">{{detail.name ? detail.name : detail.title}}</span><span class="artname">{{detail.artistName}}</span>
                </div>
                <video-player
                        class="video-player vjs-custom-skin"
                        ref="videoPlayer"
                        :playsinline="true"
                        :options="playerOptions"/>
            </div>
            <div class="mvs-right">
                <v-all :all="all" :detail="detail"/>
            </div>
        </div>
        <v-comment :hotList="hotList" :nweList="nweList" :total="total"/>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    const headerModel  = new homePage
    import comment from '../../../components/comment'
    import all from './all'
    export default {
        name: "index",
        data() {
            return {
                playerOptions: {
                    autoplay: true,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    language: 'zh-CN',
                    aspectRatio: '16:9',
                    fluid: true,
                    sources: [{
                        type: "",
                        src: ""
                    }],
                    poster: '',
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试',
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                detail: {},
                videoId: this.$route.query.id,
                url: '',
                all: [],
                hotList: [],
                nweList: [],
                total: 0
            }
        },
        methods: {
            _getMvDetail() {
                return new Promise((resolve, reject) => {
                    headerModel.getMvDetail(this.videoId).then((res) => {
                        resolve(res.data)
                    },)
                })
            },
            _getVideoUrl() {
                headerModel.getVideoUrl(this.videoId).then((res) => {
                    this.url = res.urls[0].url
                    this.playerOptions.sources[0].src = this.url
                })
            },
            _getVideoDetail(){
                headerModel.getVideoDetail(this.videoId).then((res) => {
                    this.detail = res.data
                })
            },
            _getMvUrl(id) {
                return new Promise((resolve, reject) => {
                    headerModel.getUrlMvs(id).then((res) => {
                        resolve(res.data)
                    })
                })
            },
            _getAllvideo() {
                return new Promise((resolve, reject) => {
                    headerModel.getAllvideo(this.videoId).then((res) => {
                        resolve(res.data)
                    })
                })
            },
            _getVideoComment(){
                headerModel.getVideoComment(this.videoId).then((res) => {
                    this.hotList = res.hotComments
                    this.nweList = res.comments
                    this.total = res.total
                })
            },
            _getMvComment(){
                headerModel.getMvComment(this.videoId).then((res) => {
                    this.hotList = res.hotComments
                    this.nweList = res.comments
                    this.total = res.total
                })
            },
            async getResult() {
                let state = this.$route.query.state
                let id = state === 1 ? await this._getMvDetail() : this._getVideoUrl()
                this.all = await this._getAllvideo()
                if (state === 1) {
                    this._getMvComment()
                    this.detail = id
                    this.playerOptions.poster = id.cover
                    let url = await this._getMvUrl(id.id)
                    this.playerOptions.sources[0].src = url.url
                } else {
                    this._getVideoComment()
                    this._getVideoDetail()
                }
            },
        },
        components: {
            'v-all': all,
            'v-comment': comment
        },
        created() {
            this.getResult()
        }

    }
</script>

<style lang="less" rel="stylesheet/less">
    @import "../../../assets/css/common";
    .video-js{
        .vjs-big-play-button{
            border-radius: 50%;
            width: 2em;
        }
        .vjs-play-progress{
            background-color: #B82525 !important;
        }
    }
    .mvs{
        overflow: auto;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 3;
        margin-left: 0 !important;
        padding: 20px 25px !important;
        .mvs-conts{
            display: flex;
            .mvs-left{
                flex: 1;
                .title{
                    display: flex;
                    align-items: baseline;
                    padding-bottom: 10px;
                    i{
                        color: #fff;
                        font-size: 18px;
                        margin-right: 3px;
                    }
                    span{
                        color: #fff;
                    }

                    .artname{
                        font-size: 14px;
                        color: #c4c4c4;
                        margin-left: 20px;
                    }
                    .name{
                        font-size: 20px;
                    }
                }
            }
            .mvs-right{
                width: 270px;
            }
        }
    }
</style>