<template>
    <div class="event">
        <div class="encont">
            <div class="item">
                <h3 class="titles">动态</h3>
                <ul>
                    <li v-for="(list,index) in eventLsit" class="list">
                        <div class="imgavt">
                            <img v-lazy="list.user.avatarUrl" alt="">
                        </div>
                        <div class="cont">
                            <p class="nickname">{{list.user.nickname}}</p>
                            <p class="msg">{{list.jsonData.msg}}</p>
                            <div>
                                <video-player
                                        :class="[{'active': Index === index}]"
                                        @play="onPlayerPlay($event, index)"
                                        :playsinline="true"
                                        class="video-player vjs-custom-skin"
                                        :ref="`videoPlayer${index}`"
                                        :options="playerOptions[index]"/>
                            </div>
                        </div>
                    </li>
                    <v-observer @intersect="intersected"/>
                </ul>
            </div>
            <div class="me">

            </div>
        </div>
    </div>
</template>

<script>
    import { homePage } from '../../../api/homePage'
    let headerModel  = new homePage
    import observer from '../../../components/Observer'
    export default {
        name: "index",
        data () {
            return {
                eventLsit: [],
                last: '-1',
                pagesize: 5,
                playerOptions: [],
                Index: null,
            }
        },
        methods: {
            intersected(){
              console.log(1)
            },
            onPlayerPlay(e ,index){
                this.Index = index
                this.$refs['videoPlayer'+index][0].player.play()
                for (let j in this.$refs) {
                    if (j != 'videoPlayer' + index){
                        this.$refs[j][0].player.pause()
                    }
                }
            },
            _getVideoUrl(videoId) {
                headerModel.getVideoUrl(videoId).then((res) => {
                    let str = {
                        autoplay: false,
                        muted: false,
                        loop: false,
                        preload: 'auto',
                        language: 'zh-CN',
                        aspectRatio: '16:9',
                        fluid: true,
                        sources: [{
                            type: "video/mp4",
                            src: res.urls[0].url
                        }],
                        poster: '',
                        width: '335px',
                        height:'240px',
                        controlBar: {
                            timeDivider: true,
                            durationDisplay: true,
                            remainingTimeDisplay: false,
                            fullscreenToggle: true  //全屏按钮
                        }
                    }
                    this.playerOptions.push(str)
                })
            },
            _getEvent () {
                headerModel.getEvent(this.last, this.pagesize).then(res => {
                    let evs = res.event
                    for (let i in evs) {
                        this.$set(evs[i], 'jsonData',JSON.parse(evs[i].json))
                    }
                    for (let i in evs) {
                        let id =  evs[i].jsonData.video.videoId
                        this._getVideoUrl(id)
                    }
                    this.eventLsit = evs
                    this.last = res.lasttime
                })
            }
        },
        components: {
            'v-observer': observer
        },
        created() {
            this._getEvent()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .event{
        .encont{
            display: flex;

            .item{
                flex: 7;
                padding: 0 20px 0 0;
                border-right: 1px solid #323232;
                .titles{
                    color: #fff;
                    font-size: 24px;
                    padding: 15px 0 10px;
                    border-bottom: 1px solid #323232;
                }
                .list{
                    display: flex;
                    border-bottom: 1px solid #323232;
                    padding: 20px 0;
                    .imgavt{
                        width: 50px;
                        height: 50px;
                        border-radius: 50%;
                        margin-right: 15px;
                        img{
                            border-radius: 50%;
                            display: block;
                            max-width: 100%;
                        }
                    }
                    .cont{
                        flex: 1;
                        font-size: 13px;
                        .nickname{
                            color: #1F5EB0;
                        }
                        .msg{
                            color: #fff;
                            margin-top: 15px;
                            font-size: 13px;
                        }
                        .video-player{
                            width: 335px;
                            height: 240px;
                            margin-top: 20px;
                            &.active{
                                width: 600px;
                                height: 330px;
                            }
                        }
                    }
                }
            }
            .me{
                flex: 3;

            }
        }
    }
</style>