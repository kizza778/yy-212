<template>
  <div class="app-container">
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button @click="loadData">搜索</el-button>
    </div>
    <div>
      <el-table  :data="travelList" border style="width:100%" siz="medium">
        <el-table-column prop="name" label="出行人姓名" width="110" align="center" />
        <el-table-column prop="expectedDestination" label="预计目的地" width="220" align="center" />
        <el-table-column prop="expectedOutTime" label="预计出行时间" width="180" align="center" />
        <el-table-column prop="expectedReturnTime" label="预计返回时间" width="180" align="center" />
        <el-table-column prop="phoneNum" label="电话号码" width="180" align="center" />
        <el-table-column prop="status" label="状态" width="180" align="center" />
        <el-table-column label="操作" fixed="right" min-width="40" align="center" >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDetails(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getAllApprovalApplyByStatus} from "@/api/travel";
import utils from "@/utils/tui-utils";

export default {
  name: "manageAllTravelList",
  data() {
    return {
      options: [{
        value: '0',
        label: '出行申请审核中'
      }, {
        value: '1',
        label: '待出行'
      }, {
        value: '2',
        label: '已出行'
      }, {
        value: '3',
        label: '已回家'
      }, {
        value: '4',
        label: '已复查'
      }, {
        value: '5',
        label: '已驳回'
      }, {
        value: '6',
        label: '已撤销'
      }, {
        value: '7',
        label: '回家申请审核中'
      }],
      value: '',
      travelList: [],
    }
  },
  mounted() {
  },
  methods: {
    loadData() {
      if (this.value === '') {
        this.$message({
          message: '请先选择',
          type: 'error'
        })
      } else {
        getAllApprovalApplyByStatus({status: this.value}).then(res => {
          let data = res.data
          data.map(e => {
            e.expectedOutTime = utils.formatDate('y-m-d h:i:s', e.expectedOutTime, 2)
            e.expectedReturnTime = utils.formatDate('y-m-d h:i:s', e.expectedReturnTime, 2)

          })
          this.travelList = res.data
          this.$message({
            message: '成功获取数据',
            type: 'success'
          })
        })

      }
    },
    handleDetails(row){
      this.$router.push({
        path: '/pass-audit/details',
        query: {
          id: row.id,
          isOther: true
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
