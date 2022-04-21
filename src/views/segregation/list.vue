<template>
  <div class="container">
    <el-table :data="segregationList" border style="width:100%" siz="medium">
      <el-table-column prop="provinces" label="省" width="110" align="center" />
      <el-table-column prop="city" label="市" width="180" align="center" />
      <el-table-column prop="county" label="区县" width="180" align="center" />
      <el-table-column prop="street" label="街道" width="220" align="center" />
      <el-table-column prop="community" label="小区" width="220" align="center" />
      <el-table-column prop="startTime" label="管控开始时间" width="110" align="center" />

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {deleteSegregationById, getAllSegregation} from "@/api/segregation";
import utils from "@/utils/tui-utils";

export default {
  name: "list",
  data(){
    return{
      segregationList:[],
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    loadData(){

      getAllSegregation().then(res => {
        let data1 = res.data
        data1.map(e => {
          e.startTime =  utils.formatDate('y-m-d', e.startTime, 2)
        })
        this.segregationList = data1
      }).catch(err => {
        console.log(err)
      })
    },
    deleteById(row){
      deleteSegregationById({id:row.id}).then(res =>{
        this.$message.success('删除成功！')
        this.loadData()
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(row){
      this.$router.push({
        path: '/segregation/add',
        query: {
          id: row.id
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .header{
    height: 50px;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 10px;
  }
}
</style>
