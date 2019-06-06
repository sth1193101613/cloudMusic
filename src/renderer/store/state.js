const state = {
    id:'',
    userInfo:{},
    color:{},
    array:[{name:"推荐歌单",com:"v-personalized"},{com:"v-privatecontent",name:"独家放送"},{com:"v-newsong",name:"最新音乐"},{com:"v-mv",name:"推荐MV"},{com:"v-station",name:"主播电台"}],//首页位置
    router:[
        {
            "title":"推荐",
            item:[
                {"icon":"fa-music",path:"/navs/found","name":"发现音乐",id:1},
                {"icon":"fa-podcast",path:"/navs/fm","name":"私人音乐",id:2},
                {"icon":"fa-video-camera",path:"/navs/found1","name":"视频",id:3},
                {"icon":"fa-male",path:"/navs/found2","name":"朋友",id:4}
            ]
        }
    ],//菜单渲染
    SongDetailId:'',
    tag:'',
    playerState:false, //播放状态
    playerList:[], //播放列表
    playerIndex:0, //播放索引,
    playerTime:0, //播放时间
    playerSrc:'' //播放地址
}



let router = JSON.parse(localStorage.getItem('router'))
if (localStorage.getItem('router')){
    state.router = JSON.parse(localStorage.getItem('router'))
} else {
    localStorage.setItem('router', JSON.stringify(router))
}

let userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (localStorage.getItem('userInfo')){
    state.userInfo = JSON.parse(localStorage.getItem('userInfo'))
} else {
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
}

let SongDetailId = localStorage.getItem('SongDetailId')
if (localStorage.getItem('SongDetailId')) {
    state.id = localStorage.getItem('SongDetailId')
} else {
    localStorage.setItem('id', SongDetailId)
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