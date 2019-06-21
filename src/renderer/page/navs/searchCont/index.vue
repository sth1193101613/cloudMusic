<template>
    <div>

    </div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../api/homePage";
    const headerModel  = new homePage
    export default {
        name: "index",
        props:{
            name:{
                type:String
            }
        },
        methods:{
           _getSearch(){
               headerModel.getSearchList(this.name).then((res) => {

               })
           }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>