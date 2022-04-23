<template>
  <div class="container">
    <el-table  :data="abnormalList" border style="width:100%" siz="medium">
      <el-table-column label="状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.status === 1 ? 'success' : 'danger'"
            disable-transitions>{{scope.row.status === 1?'已处理':'待处理'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" width="110" align="center" />
      <el-table-column label="性别" width="110" align="center" >
        <template slot-scope="scope">
          <span>{{ scope.row.sex?'男':'女' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="体温" width="80" align="center" >
        <template slot-scope="scope">
          <span style="color: red">{{ scope.row.temperatureValue}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="punchDay" label="打卡时间" width="180" align="center" />
      <el-table-column prop="provinceAndCity" label="打卡地点" width="320" align="center" />

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">查看今日打卡详情</el-button>
          <el-button type="danger" size="mini" @click="deleteById(scope.row)">已处理</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import utils from "@/utils/tui-utils";
import {getFocusChoicesUser, setPunchStatus} from "@/api/punch";
export default {
  data() {
    return{
      abnormalList:[]
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    loadData(){
      getFocusChoicesUser().then(res => {
        let data = res.data
        data.map(e =>{
          e.punchDay = utils.formatDate('y-m-d h:i:s', e.punchDay, 2)
        })
        this.abnormalList = data
        this.$message({
          message: '获取数据成功',
          type: 'success'
        })
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(row){
      this.$router.push({
        path: '/punch/abnormalDetails',
        query: {
          id: row.id
        }
      })
    },
    deleteById(row){
      if (row.status !== 1){
        setPunchStatus({id:row.id}).then(res => {
          this.loadData()
          this.$message({
            message: '处理成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.$message({
          message: '已经处理了',
          type: 'warning'
        })
      }

    }
  }
}
</script>


<style scoped>

</style>
