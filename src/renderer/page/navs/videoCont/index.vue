<template>
    <div class="mvs">
        <div class="mvs-left">
            <div class="title">
                <i class="el-icon-arrow-left"></i><span class="name">{{detail.name}}</span><span class="artname">{{detail.artistName}}</span>
            </div>
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           @ended="onPlayerEnded($event)"
                           :options="playerOptions"
            ></video-player>
        </div>
        <div class="mvs-right">
            <v-all :all="all" :detail="detail"></v-all>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    const headerModel  = new homePage
    import all from './all'
    export default {
        name: "index",
        data(){
            return{
                playerOptions : {
                    autoplay: true, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: "" //url地址
                    }],
                    poster:'',
                    width: document.documentElement.clientWidth,
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                },
                detail:{},
                videoId:this.$route.query.id,
                url:'',
                all:[],
            }
        },
        methods:{
            _getVideoDetail(){
                return new Promise((resolve, reject) => {
                    headerModel.getVideoDetail(this.videoId).then((res) => {
                        resolve(res.data)
                    })
                })
            },
            _getMvUrl(id){
                return new Promise((resolve, reject) => {
                    headerModel.getUrlMvs(id).then((res) => {
                        resolve(res.data)
                    })
                })
            },
            _getAllvideo(){
                return new Promise((resolve, reject) => {
                    headerModel.getAllvideo(this.videoId).then((res) => {
                        resolve(res.data)
                    })
                })
            },
            async getResult(){
                let id = await this._getVideoDetail();
                this.all = await this._getAllvideo()
                this.detail = id
                this.playerOptions.poster= id.cover
                let url = await this._getMvUrl(id.id);
                this.url = url.url
                this.playerOptions.sources[0].src = this.url
            }
        },
        components:{
            "v-all":all,
        },
        created(){
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
</style>