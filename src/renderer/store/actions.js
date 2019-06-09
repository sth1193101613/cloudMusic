import instance from '../axios'
import * as types from './mutations-types'

export default  {
    getLoginId({commit}, user = {}){
        instance.post('/login/cellphone',{
            phone:user.phone,
            password:user.password
        }).then((res) => {
            commit(types.SET_ID,res.account.id)
        })
    },
    getUserInfo({commit}, id){
        instance.post('/user/detail',{
            uid:id,
        }).then((res) => {
            commit(types.SET_USERINFO,res)
        })
    },
    getPlayList({commit}, uid = ''){
        instance.post('/user/playlist',{
            uid
        }).then((res) => {
            commit(types.PLAY_LIST,res.playlist)
        })
    },
    loginOut({commit}){
        instance.post('/logout').then((res) => {
            commit(types.LOGIN_OUT,res)
        })
    },
    getSongUrl({commit},id = ''){
        commit(types.SONG_SRC,id)
    }
}