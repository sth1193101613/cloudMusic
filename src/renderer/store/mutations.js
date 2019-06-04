import * as types  from './mutations-types'
const mutations  ={
    [types.SET_ID](state,id){
        state.id = id
        try {
            localStorage.setItem('id', id)
        } catch (e) {}
    },
    [types.SET_USERINFO](state,info){
        state.userInfo = info
    },
    [types.SET_COLOR](state,color){
        try {
            localStorage.setItem('color', JSON.stringify(color))
        }
        catch (e) {}
        state.color = color
    },
    [types.UPDATA_ARRAY](state,array){
        state.array = array
    },
    [types.LOGIN_OUT](state,out){
        state.userInfo = {}
        state.id = ''
        localStorage.removeItem('id')
    },
    [types.SONG_SRC](state,playerSrc){
        state.playerSrc = playerSrc
    },
    [types.SONG_TIME](state,playerTime){
        state.playerTime = playerTime
    }
}
export default mutations