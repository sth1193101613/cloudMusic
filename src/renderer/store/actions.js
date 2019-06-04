import instance from '../axios'
import * as types from './mutations-types'

export default  {
    getLoginId({commit}, user){
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
    loginOut({commit}){
        instance.post('/logout').then((res) => {
            commit(types.LOGIN_OUT,res)
        })
    },
    getSongUrl({commit},id){
        instance.post('/song/url',{
            id
        }).then((res) => {
            commit(types.SONG_SRC,res.data[0].url)
        })
    }
}