import instance from '../axios'
export class homePage{
    getHot(){
        return new Promise((resolve, reject) => {
            instance.post('/search/hot').then((res) => {
                resolve(res.result)
            })
        })
    }
    getSearch(keywords){
        return new Promise((resolve, reject) => {
            instance.get('/search/suggest',{
                params:{
                    keywords:keywords
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getBanner(){
        return new Promise((resolve, reject) => {
            instance.post('/banner').then((res) => {
                resolve(res)
            })
        })
    }
    getPersonalized(){
        return new Promise((resolve, reject) => {
            instance.get('/personalized',{
                params:{
                    limit:10
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getPrivatecontent(){
        return new Promise((resolve, reject) => {
            instance.get('/personalized/privatecontent',{
                params:{
                    limit:10
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getNewsong(){
        return new Promise((resolve, reject) => {
            instance.get('/personalized/newsong',{
                params:{
                    limit:10
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getMv(){
        return new Promise((resolve, reject) => {
            instance.get('/personalized/mv',{
                params:{
                    limit:10
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getStation(){
        return new Promise((resolve, reject) => {
            instance.get('/personalized/djprogram',{
                params:{
                    limit:5
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getCatList(){
        return new Promise((resolve, reject) => {
            instance.get('/playlist/catlist').then((res) => {
                resolve(res)
            })
        })
    }
    getCatListHot(){
        return new Promise((resolve, reject) => {
            instance.get('/playlist/hot').then((res) => {
                resolve(res)
            })
        })
    }
    getplay(num,cat,offset){
        return new Promise((resolve, reject) => {
            instance.get('/top/playlist',{
                params:{
                    limit:60,
                    order:"hot",
                    woffset:num,
                    cat:cat,
                    offset:offset
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSorganisation(){
        return new Promise((resolve, reject) => {
            instance.get('/dj/recommend').then((res) => {
                resolve(res)
            })
        })
    }
    getcate(){
        return new Promise((resolve, reject) => {
            instance.get('/dj/catelist').then((res) => {
                resolve(res)
            })
        })
    }
    getgift(){
        return new Promise((resolve, reject) => {
            instance.get('/dj/paygift',{
                params:{
                    limit:4,
                }
            }).then((res) => {
                resolve(res)
            })
        })

    }
    getTwo(type){
        return new Promise((resolve, reject) => {
            instance.get('/dj/recommend/type',{
                params:{
                    limit:5,
                    type:type
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getGroup(id){
        return new Promise((resolve, reject) => {
            instance.get('/top/list',{
                params:{
                    idx:id,
                },
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSinger(cat,initial,limit=30,offset=0){
        return new Promise((resolve, reject) => {
            instance.get('/artist/list',{
                params:{
                    cat,
                    initial,
                    limit,
                    offset
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSong(type = 0){
        return new Promise((resolve, reject) => {
            instance.get('/top/song',{
                params:{
                    type
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getNewDie(offset=0,limit=40){
        return new Promise((resolve, reject) => {
            instance.get('/top/album',{
                params:{
                    offset,
                    limit
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSongDetail(id){
        return new Promise((resolve, reject) => {
            instance.get('/playlist/detail',{
                params:{
                    id,
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    commitPlayer(id,limit,offset){
        return new Promise((resolve, reject) => {
            instance.get('/comment/playlist',{
                params:{
                    id,
                    limit,
                    offset
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    commitHtoPlayer(id,type){
        return new Promise((resolve, reject) => {
            instance.get('/comment/hot',{
                params:{
                    id,
                    type
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    commentLike(type,t,cid,id){
        return new Promise((resolve, reject) => {
            instance.get('/comment/like',{
                params:{
                    type,
                    t,
                    cid,
                    id
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    subscribers(id,limit,offset){
        return new Promise((resolve, reject) => {
            instance.get('/playlist/subscribers',{
                params:{
                    id,
                    limit,
                    offset
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getUserDetail(uid){
        return new Promise((resolve, reject) => {
            instance.get('/user/detail',{
                params:{
                    uid
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getUserPlayList(uid){
        return new Promise((resolve, reject) => {
            instance.post('/user/playlist',{
                uid:uid
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSearchList(keywords,type,limit){
        return new Promise((resolve, reject) => {
            instance.get('/search',{
                params:{
                    keywords,
                    type,
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getVideoDetail(mvid){
        return new Promise((resolve, reject) => {
            instance.get('/mv/detail',{
                params:{
                    mvid
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getUrlMvs(id){
        return new Promise((resolve, reject) => {
            instance.get('/mv/url',{
                params:{
                    id
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getAllvideo(id){
        return new Promise((resolve, reject) => {
            instance.get('/related/allvideo',{
                params:{
                    id
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getMvAll(area,limit){
        return new Promise((resolve, reject) => {
            instance.get('/mv/first',{
                params:{
                    area,
                    limit
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getVideoGroup(){
        return new Promise((resolve, reject) => {
            instance.get('/top/mv').then((res) => {
                resolve(res)
            })
        })
    }
    isLike(id,like){
        return new Promise((resolve, reject) => {
            instance.get('/like',{
                params:{
                    id,
                    like
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    dailySignin(){
        return new Promise((resolve, reject) => {
            instance.get('/daily_signin',{
                params:{
                    type:1
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    likelist(id){
        return new Promise((resolve, reject) => {
            instance.get('/likelist',{
                params:{
                    uid:id
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    event(){
        return new Promise((resolve, reject) => {
            instance.get('/event',{
                params:{
                    uid:id
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getSongDetailCont(ids){
        return new Promise((resolve, reject) => {
            instance.get('/song/detail',{
                params:{
                    ids,
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
    getLyric(id){
        return new Promise((resolve, reject) => {
            instance.get('/lyric',{
                params:{
                    id,
                }
            }).then((res) => {
                resolve(res)
            })
        })
    }
}