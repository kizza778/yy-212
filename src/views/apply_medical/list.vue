<template>
  <div class="container">
    <el-select v-model="status" placeholder="请选择">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="loadData">搜索</el-button>
    <el-table :data="dataList" border style="width:100%" siz="medium">
      <el-table-column prop="name" label="姓名" width="80" align="center"/>
      <el-table-column prop="age" label="年龄" width="180" align="center"/>

      <el-table-column prop="phoneNum" label="手机号" width="180" align="center"/>

      <el-table-column prop="street" label="街道" width="220" align="center"/>
      <el-table-column prop="community" label="(社区)小区" width="220" align="center"/>
      <el-table-column prop="hospital" label="预计前往就诊医院" width="180" align="center"/>

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleDetails(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getMedicalApplyByStatus} from "@/api/travel";
import utils from "@/utils/tui-utils";

export default {
  name: "list",
  data() {
    return {
      options: [{
        value: '0',
        label: '待审核'
      }, {
        value: '1',
        label: '已审核'
      }],
      status: '',
      dataList: [],
    }
  },
  mounted() {
    // this.loadData()
  },
  methods: {
    loadData() {
      getMedicalApplyByStatus({status: this.status}).then(res => {
        this.dataList = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleDetails(row){
      this.$router.push({
        path: '/applyMedical/detail',
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
