<template>
    <div>1</div>
</template>

<script type="text/ecmascript-6">
    import {homePage} from "../../../../api/homePage";
    let headModel = new homePage
    export default {
        name: "index",

        methods:{
            _getVideoGroup(){
                headModel.getVideoGroup().then((res) => {

                })
            }
        },
        mounted(){
            this._getVideoGroup()
        }
    }
</script>

<style lang="less" rel="stylesheet/less">

</style>