import * as types  from './mutations-types'
import vue from 'vue'
const mutations  = {
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
        state.router = router
        try {
            localStorage.setItem('router', JSON.stringify(state.router))
        }
        catch (e) {}
    },
    [types.UPDATA_ARRAY](state,array){
        state.array = array
    },
    [types.LOGIN_OUT](state){
        state.router = [
            {
                "title":"推荐",
                item:[
                    {"icon":"fa-music",path:"/navs/found","name":"发现音乐",id:1,subscribed:false},
                    {"icon":"fa-heart",path:"/navs/fm","name":"朋友",id:2,subscribed:false},
                    {"icon":"fa-clipboard",path:"/navs/moreMv","name":"视频",id:3,subscribed:false},
                ]
            }
        ]
        state.id = 'null'
        state.userInfo = {}
        try {
            localStorage.removeItem('userInfo')
            localStorage.removeItem('id')
            localStorage.setItem('router', JSON.stringify(state.router))
        }
        catch (e) {}
    },
    [types.SONG_SRC](state,playerSrc){
        state.playerSrc = playerSrc
        try {
            localStorage.setItem('playerSrc', playerSrc)
        } catch (e) {}
    },
    [types.SONG_TIME](state,playerTime){
        try {
            localStorage.setItem('playerTime', playerTime)
        } catch (e) {}
        state.playerTime = playerTime
    },
    [types.SONG_STATE](state,songstate){
        state.playerState = !songstate
    },
    [types.SONG_FALSE](state){
        state.playerState = false
    },//每次切歌的状态
    [types.SONG_THIS](state,song){
        try {
            localStorage.setItem('song', JSON.stringify(song))
        }catch (e) {}
        state.song = song
    },
    [types.SONG_INDEX_ADD](state){
        state.playerIndex ++
    },//上
    [types.SONG_INDEX_PER](state){
        state.playerIndex --
    },//下
    [types.SONG_INDEX](state,num){
        state.playerIndex = num
    }
}
export default mutations