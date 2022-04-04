<template>
  <div class="loginContainer">
    <el-form ref="loginForm" class="loginForm" :model="loginForm" size="normal">
      <el-form-item label="" size="normal">
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item label="" size="normal">
        <el-input v-model="loginForm.phoneNum" placeholder="请输入手机号">
        </el-input>
      </el-form-item>
      <!--        写验证码-->
      <el-form-item size="normal" label="">
        <el-input v-model="loginForm.code" placeholder="请输入验证码">
          <span
            v-show="!codeCount"
            class="code-btn"
            slot="suffix"
            @click="sendCode"
          >获取验证码</span
          >
          <el-button
            v-show="codeCount"
            slot="suffix"
            type="primary"
            size="mini"
            disabled
          >
            {{codeCount}}s
          </el-button>
        </el-input>
      </el-form-item>

      <el-form-item
        label="" size="normal"
      >
        <el-button
          type="primary"
          size="default"
          :loading="loading"
          @click="codeLogin"
          style="width:100%"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { sendCode } from '@/api/code'

export default {
  data() {
    return {
      loginForm: {
        phoneNum: "",
        code: "",
      },
      codeCount: "",
      timer:null,
      loading:false,
    };
  },
  methods: {
    sendCode() {
      const phoneNum = this.loginForm.phoneNum;
      if (phoneNum === "") {
        this.$message("请输入手机号");
        return;
      }
      const TIME_COUNT = 60;
      if(!this.timer){
        this.codeCount = TIME_COUNT;
        this.timer = setInterval(()=>{
          if(this.codeCount > 0 && this.codeCount <= TIME_COUNT){
            this.codeCount--;
          }else{
            clearInterval(this.timer);
            this.timer = null;
          }
        },1000)
      }

      const params ={
        phoneNum : phoneNum
      }
      sendCode(params).then(
        res=>{
          if(res.code === 0) {
            this.$message({
              message: '发送成功',
              type: 'success'
            })
          }else{
            this.$message({
              message:'发送失败',
              type:'errors'
            })
          }
        }
      )
    },
    codeLogin(){
      const phoneNum = this.loginForm.phoneNum
      const code = this.loginForm.code

      if(phoneNum === ''){
        this.$message('请输入手机号')
        return
      }
      if(code===''){
        this.$message('请输入验证码')
        return
      }

      const params={
        phoneNum: phoneNum,
        securityCode:code
      }

      this.loading = true;
      new Promise(async (resolve, reject)=>{
        try{
          await this.$store.dispatch('user/codeLogin',params)
          this.$router.push({path:this.redirect || '/'})
          this.loading = false
          resolve()
        }catch(error){
          this.loading=false
          console.log(error)
          reject(error)
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.loginContainer {
  height: 100%;
  display: flex;
  // 居中对齐
  align-items: center;
  justify-content: center;
  .loginForm {
    height: 300px;
    width: 350px;
    border-radius: 10px;
    // 阴影
    box-shadow: 0 0 25px #cac6c6;
    padding: 20px 35px;
    .loginTitle {
      display: flex;
      // 居中对齐
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 600;
    }
  }
}
</style>
