<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>就医审核</h1>
      <ul class="setting-list">
        <li class="item">
          <span class="label">就医申请人姓名</span>
          <div class="input_wrapper">
            {{ details.name }}
          </div>
        </li>
        <li class="item">
          <span class="label">年龄</span>
          <div class="input_wrapper">
            {{ details.age }}
          </div>
        </li>
        <li class="item">
          <span class="label">手机号</span>
          <div class="input_wrapper">
            {{ details.phoneNum }}
          </div>
        </li>
        <li class="item">
          <span class="label">身份证号</span>
          <div class="input_wrapper">
            {{ details.idNum }}
          </div>
        </li>
        <li class="item">
          <span class="label">申请理由</span>
          <div class="input_wrapper">
            {{ details.reason }}
          </div>
        </li>
        <li class="item">
          <span class="label">路线详情</span>
          <div class="input_wrapper">
            {{ details.way }}
          </div>
        </li>
        <li class="item">
          <span class="label">街道</span>
          <div class="input_wrapper">
            {{ details.street }}
          </div>
        </li>
        <li class="item">
          <span class="label">社区</span>
          <div class="input_wrapper">
            {{ details.community }}
          </div>
        </li>

        <li class="item">
          <span class="label">就医日期</span>
          <div class="input_wrapper">
            {{ details.doctorTime }}
          </div>
        </li>
        <li class="item">
          <span class="label">预计就医医院</span>
          <div class="input_wrapper">
            {{ details.hospital }}
          </div>
        </li>
        <li class="item">
          <span class="label">陪伴人</span>
          <div class="input_wrapper">
            {{ details.otherName }}
          </div>
        </li>
        <li class="item">
          <span class="label">关系</span>
          <div class="input_wrapper">
            {{ details.relation }}
          </div>
        </li>
        <li class="item">
          <span class="label">陪伴人身份证号</span>
          <div class="input_wrapper">
            {{ details.otherIdNum }}
          </div>
        </li>

      </ul>
      <el-dialog title="审核" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="审核人" :label-width="formLabelWidth">
            <el-input v-model="name" autocomplete="off"></el-input>

          </el-form-item>
          <el-form-item label="审核人手机号" :label-width="formLabelWidth">
            <el-input v-model="phoneNum" autocomplete="off"></el-input>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="auditAgree">确 定</el-button>
        </div>
      </el-dialog>
      <div>
        <el-button type="info" @click="dialogFormVisible = true">审核</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import {getMedicalApplyById, updateMedicalApply} from "@/api/travel";
import utils from "@/utils/tui-utils";

export default {
  name: "detail",
  data() {
    return {
      id: '',
      details: '',
      formLabelWidth: '120px',
      msg: '',
      dialogFormVisible: false,
      name: '',
      phoneNum: ''
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.loadById()
  },
  methods: {
    loadById() {
      getMedicalApplyById({id: this.id}).then(res => {
        res.data.doctorTime = utils.formatDate('y-m-d', res.data.doctorTime, 1)
        this.details = res.data

      }).catch(err => {
        console.log(err)
      })
    },
    auditAgree() {
      const params = {
        id: this.id,
        name: this.name,
        phoneNum: this.phoneNum
      }
      updateMedicalApply(params).then(res => {
        this.$message.success('成功')
        this.dialogFormVisible = false
      }).catch(err => {
        console.log(err)
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
