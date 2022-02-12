<template>
  <div class="app-container">
    <div class="setting-box">
      <h1>个人信息</h1>
      <ul class="setting-list">
        <!--li格式：span+div.wrapper+div.action-box-->
        <li class="item">
          <span class="label">头像</span>
          <div class="avatar-wrapper">
            <img :src="userInfo.avatar || defaultAvatar" class="user-avatar">
          </div>
          <div class="action--box">
            <div class="hint" style="font-size:14px;padding-bottom: 8px;padding-left: 8px;color: grey;"
            >支持jpg,png格式上传 800kb内的图片
            </div>
            <el-upload :action="path"
                       :file-list="files"
                       :multiple="false"
                       :limit="1"
                       :headers="headers"
                       :auto-upload="true"
                       :name="'file'"
                       :on-exceed="onExceed"
                       :before-upload="beforeUpload"
                       :on-success="uploadSuccess"
                       :on-error="uploadError"
                       :show-file-list="false"
            >
              <el-button
                :loading="loading"
                type="primary"
                size="mini"
                style="padding: 5px 7px;    margin-left: 10px;"
              >
                点击上传头像
              </el-button>
            </el-upload>
          </div>
        </li>
        <li class="item">
          <span class="label">姓名</span>
          <div class="input_wrapper">
            <el-input v-model="userInfo.name" disabled/>
          </div>
          <div class="action-box">
            <el-button v-if="userInfo.name" type="text" disabled style="color: #c0cccc;">
              <span> <i class="el-icon-lock"/>不可修改</span>
            </el-button>
          </div>
        </li>
        <li class="item">
          <span class="label">手机号</span>
          <div class="input-wrapper">
            <el-input
              ref="updatePhoneNum"
              v-model="form.phoneNum"
              placeholder="请输入手机号"
              @focus="phoneNumFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!visible.phoneNum" type="text" @click="phoneNumFocus">
              <span><i class="el-icon-mobile"/>修改</span>
            </el-button>
            <span v-show="visible.phoneNum">
              <el-button type="text" style="color: #999;" @click="cancelPhoneNum">取消</el-button>
              <el-button type="text" @click="savePhoneNum">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">紧急联系人</span>
          <div class="input-wrapper">
            <el-input
              ref="updateEmergencyCall"
              v-model="form.emergencyCall"
              placeholder="请输入紧急联系人号码"
              @focus="emergencyCallFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!visible.emergencyCall" type="text" @click="emergencyCallFocus">
              <span><i class="el-icon-help"/>修改</span>
            </el-button>
            <span v-show="visible.emergencyCall">
              <el-button type="text" style="color: #999;" @click="cancelEmergencyCall">取消</el-button>
              <el-button type="text" @click="saveEmergencyCall">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">生日</span>
          <div class="input-wrapper">
            <el-date-picker
              ref="birthdayInput"
              v-model="form.birthday"
              type="date"
              placeholder="请选择生日"
              :clearable="true"
              @focus="birthdayInputFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!visible.birthday" type="text" @click="birthdayInputFocus">
              <span><i class="el-icon-date"/>修改 </span>
            </el-button>
            <span v-show="visible.birthday">
              <el-button type="text" style="color: #999;" @click="cancelBirthday">取消</el-button>
              <el-button type="text" @click="saveBirthday">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">性别</span>
          <div class="input-wrapper">
            <el-select
              ref="sexInput"
              v-model="form.sex"
              placeholder="请选择性别"
              @focus="sexInputFocus"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="action-box">
            <el-button v-show="!visible.sex" type="text" @click="sexInputFocus">
              <span><i class="el-icon-female"/>修改</span>
            </el-button>
            <span v-show="visible.sex">
              <el-button type="text" style="color:#999" @click="cancelSex">取消</el-button>
              <el-button type="text" @click="saveSex">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">家庭住址</span>
          <div class="input-wrapper">
            <el-input
              ref="updateHomeAdd"
              v-model="form.homeAdd"
              placeholder="请输入家庭地址"
              @focus="homeAddFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!visible.homeAdd" type="text" @click="homeAddFocus">
              <span><i class="el-icon-s-home"/>修改</span>
            </el-button>
            <span v-show="visible.homeAdd">
              <el-button type="text" style="color: #999;" @click="cancelHomeAdd">取消</el-button>
              <el-button type="text" @click="saveHomeAdd">保存</el-button>
            </span>
          </div>
        </li>
        <li class="item">
          <span class="label">工作地址</span>
          <div class="input-wrapper">
            <el-input
              ref="updateWorkAdd"
              v-model="form.workAdd"
              placeholder="请输入工作地址"
              @focus="WorkAddFocus"
            />
          </div>
          <div class="action-box">
            <el-button v-show="!visible.workAdd" type="text" @click="workAddFocus">
              <span><i class="el-icon-s-cooperation"/>修改</span>
            </el-button>
            <span v-show="visible.workAdd">
              <el-button type="text" style="color: #999;" @click="cancelWorkAdd">取消</el-button>
              <el-button type="text" @click="saveWorkAdd">保存</el-button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getToken } from '@/utils/auth'
import { updateUser } from '@/api/user'

export default {
  data() {
    return {
      options: [{
        value: 0,
        label: '女'
      }, {
        value: 1,
        label: '男'
      }],
      visible: {
        phoneNum: false,
        birthday: false,
        sex: false,
        homeAdd: false,
        workAdd: false,
        emergencyCall: false
      },
      loading: false,
      path: process.env.VUE_APP_BASE_API + '/api/file/updateAvatar',
      files: [],
      userInfo: '',
      form: {
        phoneNum: '',
        birthday: '',
        sex: '',
        homeAdd: '',
        workAdd: '',
        emergencyCall: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'defaultAvatar'
    ]),
    headers() {
      const val = {
        Authorization: getToken()
      }
      return val
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const userInfo = this.$store.getters.userInfo
      this.userInfo = userInfo
      this.form.phoneNum = userInfo.phoneNum
      this.form.birthday = userInfo.birthday
      this.form.sex = userInfo.sex
      this.form.emergencyCall = userInfo.emergencyCall
      this.form.workAdd = userInfo.workAdd
      this.form.homeAdd = userInfo.homeAdd
    },
    //Focus
    phoneNumFocus() {
      this.$refs.updatePhoneNum.focus()
      this.visible.phoneNum = true
    },
    emergencyCallFocus() {
      this.$refs.updateEmergencyCall.focus()
      this.visible.emergencyCall = true
    },
    homeAddFocus() {
      this.$refs.updateHomeAdd.focus()
      this.visible.homeAdd = true
    },
    workAddFocus() {
      this.$refs.updateWorkAdd.focus()
      this.visible.workAdd = true
    },
    birthdayInputFocus() {
      this.visible.birthday = true
    },
    sexInputFocus() {
      // this.$refs.sexInput.focus()
      this.visible.sex = true
    },

    updateUser(params, index) {
      return new Promise(async(resolve, reject) => {
        //更新后端接口
        await updateUser(params).then(
          res => {
            switch (index) {
              case 0:
                this.visible.phoneNum = false
                break
              case 1:
                this.visible.birthday = false
                break
              case 2:
                this.visible.sex = false
                break
              case 3:
                this.visible.homeAdd = false
                break
              case 4:
                this.visible.workAdd = false
                break
              case  5:
                this.visible.emergencyCall = false
                break
            }
            this.$message({
                type: 'success',
                message: '保存成功'
              }
            )
            resolve()
          },
          error => {
            reject(error)
          }
        )
        await this.$store.dispatch('user/getInfo')
        this.init()
      })
    },

    //cancel
    cancelBirthday() {
      this.form.birthday = this.userInfo.birthday
      this.visible.birthday = false
    },
    cancelWorkAdd() {
      this.form.workAdd = this.userInfo.workAdd
      this.visible.workAdd = false
    },
    cancelPhoneNum() {
      this.form.phoneNum = this.userInfo.phoneNum
      this.visible.phoneNum = true
    },
    cancelEmergencyCall() {
      this.form.emergencyCall = this.userInfo.emergencyCall
      this.visible.emergencyCall = true
    },
    cancelHomeAdd() {
      this.form.homeAdd = this.userInfo.homeAdd
      this.visible.homeAdd = true
    },
    cancelSex() {
      this.form.sex = this.userInfo.sex
      this.visible.sex = false
    },

    //save
    saveBirthday() {
      const data = { birthday: this.form.birthday }
      this.updateUser(data, 1)
    },
    savePhoneNum() {
      const data = { phoneNum: this.form.phoneNum }
      this.updateUser(data, 0)
    },
    saveEmergencyCall() {
      const data = { emergencyCall: this.form.emergencyCall }
      this.updateUser(data, 5)
    },
    saveHomeAdd() {
      const data = { homeAdd: this.form.homeAdd }
      this.updateUser(data, 3)
    },
    saveWorkAdd() {
      const data = { workAdd: this.form.workAdd }
      this.updateUser(data, 4)
    },
    saveSex() {
      const data = { sex: this.form.sex }
      this.updateUser(data, 2)
    },

    //上传失败
    uploadError() {
      const userInfo = this.$store.getters.userInfo
      this.$message.error('文件上传失败')
    },
    //上传成功
    uploadSuccess(res, file, filelist) {
      if (res.code !== 0) {
        this.$message.error('文件上传错误')
        return
      }
      this.loading = false
      this.$message.success('上传成功')
      this.$store.dispatch('user/getInfo').then(res => this.init())
    },
    //超出个数限制
    onExceed() {
      this.loading = false
    },
    beforeUpload(file) {
      this.loading = true
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const is800K = file.size / 1024 < 800
      if (isImg) {
        this.$message.error('文件格式不正确')
        this.loading = false
      }
      if (!is800K) {
        this.$message.error('文件大小不能超过800kb')
        this.loading = false
      }
      return isImg && is800K
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  padding-right: 10px;
  box-sizing: border-box;
  min-height: 100vh;
  position: relative;
  background: #eeeeee;

  .setting-box {
    margin-top: 2vh;
    margin-left: 50%;
    transform: translateX(-50%);
    max-width: 100%;
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
        color:#555555;
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
