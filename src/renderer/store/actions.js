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
    }
}