import * as types  from './mutations-types'
import vue from 'vue'
const mutations  ={
    [types.SET_ID](state,id){
        state.id = id
        try {
            localStorage.setItem('id', id)
        } catch (e) {}
    },
    [types.SET_USERINFO](state,info){
        try {
            localStorage.setItem('userInfo', JSON.stringify(info))
        }
        catch (e) {}
        state.userInfo = info
    },
    [types.SET_COLOR](state,color){
        try {
            localStorage.setItem('color', JSON.stringify(color))
        }
        catch (e) {}
        state.color = color
    },
    [types.PLAY_LIST](state,playlist){
        let router = state.router
        let arr = [
            {
                title: '创建的歌单',
                item:[]
            },
            {
                title: '收藏的歌单',
                item:[]
            }
        ]
        for(let i in playlist){
            if(playlist[i].subscribed){
                arr[1].item.push(playlist[i])
            }else{
                arr[0].item.push(playlist[i])
            }
            vue.set(playlist[i],'icon','fa-music')
            vue.set(playlist[i],'path','/navs/myMusic')
        }
        router = router.concat(arr)
        try {
            localStorage.setItem('router', JSON.stringify(router))
        }
        catch (e) {}
    },
    [types.UPDATA_ARRAY](state,array){
        state.array = array
    },
    [types.LOGIN_OUT](state,out){
        state.userInfo = {}
        state.id = ''
        localStorage.clear();
    },
    [types.SONG_SRC](state,playerSrc){
        state.playerSrc = playerSrc
    },
    [types.SONG_TIME](state,playerTime){
        state.playerTime = playerTime
    },
    [types.SONG_DETAILID](state,detailId){
        try {
            localStorage.setItem('SongDetailId', detailId)
        } catch (e) {}
        state.SongDetailId = detailId
    },
    [types.SONG_STATE](state,songstate){
        state.playerState = !songstate
    }
}
export default mutations