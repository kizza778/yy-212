<template>
  <div class="container">
    <el-table  :data="titleList" border style="width:100%" siz="medium">
      <el-table-column prop="titleNum" label="题目编号" width="110" align="center" />
      <el-table-column prop="titleDes" label="题目描述" width="480" align="center" />
      <el-table-column prop="createTime" label="发布时间" width="180" align="center" />
      <el-table-column prop="updateTime" label="更新时间" width="220" align="center" />

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
import utils from "@/utils/tui-utils";
import {deleteTitleListById, getAbnormalBodyTemperature, getTitleList} from "@/api/punch";
export default {
  name: "list",
  data(){
    return{
      titleList:[],
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    loadData(){
      getTitleList().then(res => {
        let data = res.data
        data.map(e => {
          e.createTime = utils.formatDate('y-m-d', e.createTime, 2)
          e.updateTime = utils.formatDate('y-m-d', e.updateTime, 2)
        })
        this.titleList = data
      })
      getAbnormalBodyTemperature({min:35,max:38}).then(res => {
        console.log(res)
      })
    },
    handleEdit(row){
      this.$router.push({
        path: '/punch/add',
        query: {
          id: row.id
        }
      })
    },
    deleteById(row){
      deleteTitleListById({id:row.id}).then(res =>{
        this.$message.success('删除成功')
        this.loadData()
      }).catch(err =>{
        this.$message.error('删除失败')
      })

    }
  }
}
</script>

<style scoped>

</style>
