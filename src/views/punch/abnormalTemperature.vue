<template>
  <div class="container">
    <div class="block" v-if="!showTable">
      <el-slider
        v-model="value"
        range
        show-stops
        :min="32"
        :max="40"
        :step="0.1"
        :marks="marks">
      </el-slider>
      <span>温度下限:{{value[0]}}</span>
      <span>温度上限:{{value[1]}}</span>
      <br>
      <el-button type="success" @click="loadData(value[0],value[1])">获取</el-button>
    </div>
    <div>
      <el-table  :data="dataList" border style="width:100%" siz="medium">
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
  </div>
</template>

<script>
import {getAbnormalBodyTemperature, setPunchStatus} from "@/api/punch";
import utils from "@/utils/tui-utils";

export default {
  name: "abnormalTemperature",
  data(){
    return{
      value: [35.0, 37.3],
      marks: {
        35.0: '35.0°C',
        37.3: '37.3°C',
      },
      showTable: false,
      dataList: [],
    }
  },
  mounted() {

  },
  methods:{
    loadData(min,max){
      getAbnormalBodyTemperature({min:this.value[0],max:this.value[1]}).then(res => {
        let data = res.data
        data.map(e =>{
          e.punchDay = utils.formatDate('y-m-d h:i:s', e.punchDay, 2)
        })
        this.dataList = res.data
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
