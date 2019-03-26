import * as types  from './mutations-types'
const mutations  ={
    [types.SET_ID](state,id){
        state.id = id
    },
    [types.SET_USERINFO](state,info){
        state.userInfo = info
    }
}
export default mutations