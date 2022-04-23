<template xmlns="http://www.w3.org/1999/html">
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
        <li class="item">
          <span class="label">时间列表</span>
          <el-timeline>
              <el-timeline-item v-for="(item,index) in operateList" :key="index" placement="top">
                <el-card>
                  <h4>操作: {{item.operate}}</h4>
                  <p>操作描述: {{item.operateDes}}</p>
                  <p>发起时间: {{item.operateTime}}</p>
                  <p>操作人: {{item.operator}}</p>
                </el-card>
              </el-timeline-item>
          </el-timeline>
        </li>
      </ul>
    </div>
    <el-dialog title="发送反馈信息" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="反馈信息" :label-width="formLabelWidth">
          <el-input v-model="msg" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage">确 定</el-button>
      </div>
    </el-dialog>
    <div class="setting-box" v-if="diseaseInfo !== ''">
      <h1>疾病记录</h1>
      <ul class="setting-list">
        <li class="item">
          <span class="label">姓名</span>
          <div class="input_wrapper">
            {{diseaseInfo.name}}
          </div>
        </li>
        <li class="item">
          <span class="label">年纪</span>
          <div class="input_wrapper">
            {{diseaseInfo.age}}
          </div>
        </li>
        <li class="item">
          <span class="label">联系电话</span>
          <div class="input_wrapper">
            {{diseaseInfo.phoneNum}}
          </div>
        </li>
        <li class="item">
          <span class="label">家庭住址</span>
          <div class="input_wrapper">
            {{diseaseInfo.homeAdd}}
          </div>
        </li>
        <li class="item">
          <span class="label">诊断建议</span>
          <div class="input_wrapper">
            {{diseaseInfo.diagnosticAdvice}}
          </div>
        </li>
        <li class="item">
          <span class="label">健康状态</span>
          <div class="input_wrapper">
            {{diseaseInfo.healthStatus?'存在疾病':'健康'}}
          </div>
        </li>
        <li class="item">
          <span class="label">是否需要常去医院</span>
          <div class="input_wrapper">
            {{diseaseInfo.isOftenHospital?'否':'是'}}
          </div>
        </li>
        <li class="item">
          <span class="label">疾病名</span>
          <div class="input_wrapper">
            {{diseaseInfo.nameOfDisease}}
          </div>
        </li>
        <li class="item">
          <span class="label">常去医院</span>
          <div class="input_wrapper">
            {{diseaseInfo.oftenHospital}}
          </div>
        </li>
        <li class="item">
          <span class="label">附件列表</span>
          <div class="input_wrapper">
            <el-image
              style="width: 100px; height: 100px"
              :src="diseaseInfo.credential[0]"
              :preview-src-list="diseaseInfo.credential">
            </el-image>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="!isOther">
      <el-button type="info" @click="dialogFormVisible = true">发送反馈消息</el-button>
      <el-button type="success" @click="agree">同意</el-button>
      <el-button type="danger" @click="disagree">拒绝</el-button>
    </div>

  </div>
</template>

<script>
import {
  getDiseaseInfoByUserId,
  getTravelApplyInfoById,
  getTravelOperate,
  sendMessageToUser,
  updateTravelApplyStatus
} from "@/api/travel";
import utils from "@/utils/tui-utils";

export default {
  name: "details",
  data() {
    return {
      formLabelWidth: '120px',
      msg:'',
      dialogFormVisible: false,
      isOther: false,
      id: '',
      details: '',
      operateList:[],
      diseaseInfo: ''
    };
  },
  mounted() {
    this.id = this.$route.query.id
    this.isOther = this.$route.query.isOther
    this.loadById()
    this.getOperate()
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
        this.getDiseaseInfo()
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
    },
    sendMessage(){
      const params = {
        userId: this.details.userId,
        msg: this.msg
      }
      this.dialogFormVisible = false
      sendMessageToUser(params).then(res => {
          this.$message({
            message: '消息发送成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
      })
    },
    getOperate(){
      getTravelOperate({id:this.id}).then(res => {
        let d = res.data
        d.map(e => {
          e.operateTime = utils.formatDate('y-m-d h:i:s', e.operateTime,2)
        })
        this.operateList = d
        console.log(this.operateList)
      }).catch(err => {
        console.log(err)
      })
    },
    getDiseaseInfo(){
      getDiseaseInfoByUserId({id:this.details.userId}).then(res => {
        this.diseaseInfo = res.data
      }).catch(err => {
        console.error(err)
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
        width: 100%;

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
