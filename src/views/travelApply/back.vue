<template>
  <div class="container">
    <div>
      <el-table v-loading="loading"
                :data="tableData" border style="width: 100%">
        <el-table-column
          label="申请人姓名"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.applyUsername}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="健康码状态"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.healthCodeStatus === 0" style="color: green">绿码</span>
            <span v-else-if="scope.row.healthCodeStatus === 1" style="color: yellow">黄码</span>
            <span v-else-if="scope.row.healthCodeStatus === 2" style="color: red">红码</span>

          </template>
        </el-table-column>
        <el-table-column
          label="申请出行时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expectedOutTime}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="预计返回时间"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.expectedReturnTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" min-width="230">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetails(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getAllWaitBackApprovalApply, getAllWaitOutApprovalApply} from "@/api/travel";
import utils from '@/utils/tui-utils'
export default {
  name: "out",
  data(){
    return {
      loading: false,
      tableData: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    loadData(){
      this.loading = true
      getAllWaitBackApprovalApply().then(
        res => {
          let result = res.data
          result.map(r => {
            r.expectedOutTime = utils.formatDate('y-m-d h:i:s', r.expectedOutTime,2)
            r.expectedReturnTime = utils.formatDate('y-m-d h:i:s', r.expectedReturnTime,2)
          })
          this.tableData = result

          console.log(this.tableData)
          this.loading = false
        }
      ).catch(err =>{
        this.loading = false
      })
    },
    handleDetails(row){
      this.$router.push({
        path: '/pass-audit/details',
        query: {
          id: row.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
