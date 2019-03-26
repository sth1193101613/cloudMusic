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
}