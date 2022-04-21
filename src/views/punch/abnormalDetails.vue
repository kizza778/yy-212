<template>
  <div>
    <el-descriptions title="用户信息"  direction="vertical" :column="3" border>
    <el-descriptions-item label="用户名">{{abnormalDetails.userName}}</el-descriptions-item>
    <el-descriptions-item label="手机号">{{abnormalDetails.phoneNum}}</el-descriptions-item>
    <el-descriptions-item label="居住地">{{abnormalDetails.homeAdd}}</el-descriptions-item>
    <el-descriptions-item label="打卡地点">{{abnormalDetails.provinceAndCity}}</el-descriptions-item>
    <el-descriptions-item label="打卡时间">{{abnormalDetails.punchDay}}</el-descriptions-item>
    <el-descriptions-item label="上报体温">{{abnormalDetails.temperatureValue}}</el-descriptions-item>
    </el-descriptions>
    <div v-for="(item,index) in abnormalDetails.showPunchListVOList" :key="index" class="item">
      <template>{{item.titleDes}}</template>
        <div  v-for="(item1,index1) in item.choices" :key="index1" >
          <template>
            <span style="color: red" v-if="item1.isChoice === true && item1.isFocus === true">{{item1.choice+'-'+item1.des}}</span>
            <span style="color: green" v-else-if="item1.isChoice === true">{{item1.choice+'-'+item1.des}}</span>
            <span v-else>{{item1.choice+'-'+item1.des}}</span>


          </template>
        </div>


    </div>
  </div>
</template>

<script>
import {getAbnormalDetailsById} from "@/api/punch";
import utils from "@/utils/tui-utils";

export default {
  name: "abnormalDetails",
  data() {
    return {
      id: '',
      abnormalDetails: '',
      checkList:['复选框 A']
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.loadData()
  },
  methods: {
    loadData() {
      getAbnormalDetailsById({id: this.id}).then(res => {
        let data = res.data
        data.punchDay = utils.formatDate('y-m-d h:i:s', data.punchDay, 2)
        this.abnormalDetails = data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.item {
  margin: 20px;
  overflow: hidden;
}


</style>
