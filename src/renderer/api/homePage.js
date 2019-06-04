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
}