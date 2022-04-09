<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>信息审核</h1>
      <ul class="setting-list">
        <li class="item">
          <span class="label">申请人姓名</span>
          <div class="input_wrapper">
            {{details.applyUsername}}
          </div>
        </li>
        <li class="item">
          <span class="label">出行人姓名</span>
          <div class="input_wrapper">
            {{details.name}}
          </div>
        </li>
        <li class="item">
          <span class="label">手机号</span>
          <div class="input_wrapper">
            {{details.phoneNum}}
          </div>
        </li>
        <li class="item">
          <span class="label">家庭地址</span>
          <div class="input_wrapper">
            {{details.homeAdd}}
          </div>
        </li>
        <li class="item">
          <span class="label">健康码状态</span>
          <div class="input_wrapper">
            <span v-if="details.healthCodeStatus === 0" style="color: green">绿码</span>
            <span v-else-if="details.healthCodeStatus === 1" style="color: yellow">黄码</span>
            <span v-else-if="details.healthCodeStatus === 2" style="color: red">红码</span>
          </div>
        </li>
        <li class="item">
          <span class="label">申请理由</span>
          <div class="input_wrapper">
            {{details.applyReason}}
          </div>
        </li>
        <li class="item">
          <span class="label">外出目的地u</span>
          <div class="input_wrapper">
            {{details.expectedDestination}}
          </div>
        </li>
        <li class="item">
          <span class="label">路线详情</span>
          <div class="input_wrapper">
            {{details.travelInformation}}
          </div>
        </li>
        <li class="item">
          <span class="label">预计外出时间</span>
          <div class="input_wrapper">
            {{details.expectedOutTime}}
          </div>
        </li>
        <li class="item">
          <span class="label">预计返回时间</span>
          <div class="input_wrapper">
            {{details.expectedReturnTime}}
          </div>
        </li>

        <li class="item">
          <span class="label">健康码截图</span>
          <div class="input_wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="details.healthCodeFile"
              :preview-src-list="[details.healthCodeFile]">
            </el-image>
          </div>
        </li>
        <li class="item">
          <span class="label">行程码截图</span>
          <div class="input_wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="details.travelCardFile"
              :preview-src-list="[details.travelCardFile]">
            </el-image>
          </div>
        </li>
        <li class="item">
          <span class="label">附件列表</span>
          <div class="input_wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="details.applyFile[0]"
              :preview-src-list="details.applyFile">
            </el-image>
          </div>
        </li>

      </ul>
    </div>
    <el-button type="success" @click="agree">同意</el-button>
    <el-button type="danger" @click="disagree">拒绝</el-button>
  </div>
</template>

<script>
import {getTravelApplyInfoById, updateTravelApplyStatus} from "@/api/travel";
import utils from "@/utils/tui-utils";

export default {
  name: "details",
  data() {
    return {
      id: '',
      details: '',
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.loadById()
  },
  methods: {
    loadById() {
      const params = {
        id: this.id
      }
      getTravelApplyInfoById(params).then(res => {
        let result = res.data
        console.log(result)

        result.expectedOutTime = utils.formatDate('y-m-d h:i:s', result.expectedOutTime,2)
        result.expectedReturnTime = utils.formatDate('y-m-d h:i:s', result.expectedReturnTime,2)
        this.details = result
        console.log(result)
      }).catch(err => {
        console.error(err)
      })
    },
    agree(){
      const params={
        id: this.id,
        status: 1
      }
      updateTravelApplyStatus(params).then(res => {
        this.$message.success('审核成功')
        this.$router.push({
          path: '/pass-audit/out'
        })
      }).catch(err =>{
        this.$message.success('审核失败')

      })
    },
    disagree(){
      const params={
        id: this.id,
        status: 5
      }
      updateTravelApplyStatus(params).then(res => {
        this.$message.success('审核成功')
        this.$router.push({
          path: '/pass-audit/out'
        })
      }).catch(err =>{
        this.$message.success('审核失败')

      })
    }

  }
}
</script>

<style lang="scss" scoped>
.app-container {
  //padding-right: 10px;
  //box-sizing: border-box;
  //min-height: 100vh;
  position: relative;
  background: #eeeeee;

  .setting-box {
    //margin-top: 2vh;
    //margin-left: 50%;
    //transform: translateX(-50%);
    //max-width: 100%;
    background: 20px;
    padding: 20px;
    padding-top: 10px;
    background: white;

    h1 {
      font-weight: 700;
      font-size: 20px;
      padding: 0;
      padding-bottom: 10px;
    }

    .setting-list {
      margin: 0;
      padding: 0;
      //background: white;

      .item {
        color: #555555;
        list-style: none;
        border-top: 1px dashed #dddddd;
        padding: 20px 13px;
        line-height: 24px;
        display: flex;
        align-items: center;

        .label {
          min-width: 130px;
        }

        .avatar-wrapper {
          position: relative;
          margin-right: 10px;

          .user-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid white;
          }
        }
      }
    }
  }
}
</style>
