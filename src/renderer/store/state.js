const state = {
    id:'',
    userInfo:{},
    color:{},
    array:[{name:"推荐歌单",com:"v-personalized"},{com:"v-privatecontent",name:"独家放送"},{com:"v-newsong",name:"最新音乐"},{com:"v-mv",name:"推荐MV"},{com:"v-station",name:"主播电台"}],
    tag:'',
    playerState:false, //播放状态
    playerList:[], //播放列表
    playerIndex:0, //播放索引,
    playerTime:0, //播放时间
    playerSrc:'' //播放地址
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