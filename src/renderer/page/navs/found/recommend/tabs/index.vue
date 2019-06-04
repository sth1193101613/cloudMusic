<template>
    <div class="tabss">
        <p class="title">现在可以根据个人喜欢,自由调整栏目顺序啦~</p>
        <el-button plain @click="dialogVisible = true">调整栏目顺序</el-button>
        <el-dialog
                title="调整栏目顺序"
                :modal="false"
                :visible.sync="dialogVisible"
                width="30%">
            <SlickList  :lockToContainerEdges="true"
                        axis="y"
                        lockAxis="y"
                        lockOffset="100%"
                        :hideSortableGhost="false"
                        v-model ="list"
                        class="list"
                        @input="newArr($event)"
                        helperClass="actives">
                <SlickItem  v-for="(item,index) in list" :index="index" :key="index" class="item-list">
                    {{item.name}}
                </SlickItem >
            </SlickList>
            <div slot="footer" class="dialog-footer">
                <el-button @click="no" plain>取 消</el-button>
                <el-button @click="ok" plain>确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import { SlickList, SlickItem } from 'vue-slicksort';
    import { mapMutations } from 'vuex'
    export default {
        name: "index",
        data(){
            return{
                list:this.$store.state.array,
                dialogVisible:false,
                arr:[],
            }
        },
        methods:{
            ...mapMutations({
                getArr:'UPDATA_ARRAY'
            }),
            newArr(value){
                this.arr = value
            },
            ok(){
                this.getArr(this.arr)
                this.dialogVisible = false
            },
            no(){
                this.dialogVisible = false
            }
        },
        components: {
            SlickItem,
            SlickList,
        },
    }
</script>

<style lang="less" rel="stylesheet/less">
    .tabss{
        margin-top: 5px;
        border-top: 1px solid #2b2b2b;
        text-align: center;
        padding-bottom: 50px;
        .title{
            text-align: center;
            font-size: 12px;
            margin-top: 15px;
        }
        .el-dialog{
            background: #2D2F33;
            .el-dialog__header{
                text-align: left;
                border-bottom: 1px solid #323438;
                .el-dialog__title{
                    font-size: 12px;
                    color: #ADAFB2;
                }
            }
            .el-dialog__body{
                padding: 0;
            }
            .list{
                overflow: auto;
                .item-list{
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #323438;
                    width: 100%;
                    padding: 20px;
                    background: #2D2F33;
                    box-sizing: border-box;
                    user-select: none;
                    color: #ADAFB2;
                    font-weight: 400;
                }
            }
        }
        .el-button{
            font-size: 12px;
            background: transparent;
            margin-top: 15px;
        }
        .el-button.is-plain:focus, .el-button.is-plain:hover{
            background: transparent;
            color: #ccc;
            border-color:#ccc
        }
    }
    .actives{
        box-shadow:0 0 10px #282A2E;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 20px;
        background: #36383C;
        box-sizing: border-box;
        color: #ccc;
        font-weight: 400;
    }
</style>