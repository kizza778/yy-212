<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="题目编号">
        <el-input v-model="form.titleNum"></el-input>
      </el-form-item>
      <el-form-item label="题目描述">
        <el-input v-model="form.titleDes"></el-input>
      </el-form-item>
      <el-form-item
        class="dynamic"
        v-for="(item, index) in form.choices"
        :label="'选项('+(index+1)+')'"
        :key="index"
      >
        <el-input placeholder="输入选项编号" v-model="item.choice"></el-input>
        <el-input placeholder="请输入描述" v-model="item.des"></el-input>
        <el-button class="form-btn" @click.prevent="removeItem(index)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="addItem">新增选项</el-button>
      </el-form-item>
      <el-form-item
        :label="'选择关注选项'" v-show="form.choices[0].choice !== ''">
        <el-checkbox-group v-model="form.focus">
          <el-checkbox-button v-for="(choice,index) in form.choices" :label="choice.choice" :key="index">{{choice.choice}}</el-checkbox-button>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {addTitle, getTitleListById} from "@/api/punch";

export default {
  name: "add",
  data() {
    return {
      id:'',
      form: {
        titleNum: '',
        titleDes: '',
        choices: [{
          choice: '',
          des: '',
        }],
        focus: []
      }
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.loadData()
  },
  methods: {
    loadData(){
      getTitleListById({id:this.id}).then(res => {
        let data = res.data
        console.log(data)
        this.form.titleNum = data.titleNum
        this.form.titleDes = data.titleDes
        this.form.choices = data.choices
        this.form.focus = data.focus

      }).catch(err => {
        console.error(err)
      })
    },
    removeItem(index) {
      if (index !== -1) {
        this.form.choices.splice(index, 1)
      }
    },
    addItem() {
      this.form.choices.push({
        choice: '',
        des: ''
      });
    },
    submit(){
      const params = {
        id:this.id,
        titleNum:this.form.titleNum,
        titleDes:this.form.titleDes,
        choices:this.form.choices,
        focus:this.form.focus,
      }
      console.log(params)
      addTitle(params).then(res => {
        this.$message.success('添加成功')
        this.$router.push({
          path: '/punch/list'
        })
      }).catch(err =>{
        this.$message.error('添加失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic {
  .form-btn {
    float: right;
    position: relative;
    top: -40px;
  }
}
</style>
