<template>
    <div class="albums">
        <ul class="albums-ul">
            <li v-for="(alm,index) in albums" class="albums-item">
              <div class="cont">
                  <img :src="alm.picUrl" alt="">
                  <a href="#" class="back"></a>
              </div>
                <p class="comp">{{alm.company}}</p>
                <p class="name">{{alm.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",
        data(){
          return{
              albums:[]
          }
        },
        methods:{
            getAlbum(offset,limit){
                headModel.getNewDie(offset,limit).then((res) => {
                    for(let i in res.albums){
                        let albums = res.albums[i]
                        this.albums.push(albums)
                    }
                })
            }
        },
        created() {
            this.getAlbum(0,40)
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .albums{
       .albums-ul{
           display: flex;
           align-items: center;
           flex-wrap: wrap;
           .albums-item{
               width: calc((100% / 4) - 24px);
               padding: 6px;
               margin: 6px;
               height: 178px;
               .cont{
                   width: 130px;
                   height: 130px;
                   position: relative;
                   .back{
                       display: block;
                       width: 153px;
                       height: 130px;
                       position: absolute;
                       left: 0;
                       right: 0;
                       background: url("../../../../../assets/coverall.png") no-repeat 0px -845px;
                   }
               }
               .comp{
                   color: #fff;
                   font-size: 12px;
                   margin: 5px 0;
               }
               .name{
                   font-size: 12px;
               }
               img{
                   position: absolute;
                   max-width: 100%;
                   display: block;
                   width: 140px;
                   height: 100%;
               }
           }
       }
    }
</style>