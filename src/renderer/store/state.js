const state = {
    id:'',
    userInfo:{},
    color:{},
    array:[{name:"推荐歌单",com:"v-personalized"}, {com:"v-privatecontent",name:"独家放送"},{com:"v-newsong",name:"最新音乐"},{com:"v-mv",name:"推荐MV"},{com:"v-station",name:"主播电台"}],//首页位置
    router:[
        {
            "title":"推荐",
            item:[
                {"icon":"fa-music",path:"/navs/found","name":"发现音乐",id:1,subscribed:false},
                {"icon":"fa-podcast",path:"/navs/fm","name":"私人音乐",id:2,subscribed:false},
                {"icon":"fa-videoer-camera",path:"/navs/moreMv","name":"视频",id:3,subscribed:false},
            ]
        }
    ],//菜单渲染
    tag:'',
    playerState:false, //播放状态
    playerList:[], //播放列表
    playerIndex:0, //播放索引,
    playerTime:0, //播放时间
    playerSrc:'', //播放地址
    song:{},//默认缓存的歌曲
}

let playerTime = localStorage.getItem('playerTime')
if(localStorage.getItem('playerTime')) {
    state.playerTime = localStorage.getItem('playerTime')
}else{
    localStorage.setItem('playerTime',playerTime)
}

let playerSrc = localStorage.getItem('playerSrc')
if(localStorage.getItem('playerSrc')){
    state.playerSrc = localStorage.getItem('playerSrc')
}else{
    localStorage.setItem('playerSrc',playerSrc)
}

let song = JSON.parse(localStorage.getItem('song'))
if (localStorage.getItem('song')){
    state.song = JSON.parse(localStorage.getItem('song'))
} else {
    localStorage.setItem('song', JSON.stringify(song))
}

let router = JSON.parse(localStorage.getItem('router'))
if (localStorage.getItem('router') !== null){
    state.router = JSON.parse(localStorage.getItem('router'))
} else {
    localStorage.setItem('router', JSON.stringify(state.router))
}

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (localStorage.getItem('userInfo')){
    state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
} else {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

let id = localStorage.getItem('id')
if (localStorage.getItem('id')) {
    state.id = localStorage.getItem('id')
} else {
    localStorage.setItem('id', id)
}

let color = JSON.parse(localStorage.getItem('color'))
if(localStorage.getItem('color')){
    state.color =  JSON.parse(localStorage.getItem('color'))
}else{
    localStorage.setItem('color', color)
}

export default state