<template>
  <div>
    <el-form ref="form" :model="form" label-width="10%">
      <el-form-item label="省份">
        <el-input v-model="form.provinces"></el-input>
      </el-form-item>
      <el-form-item label="市">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="区（县）">
        <el-input v-model="form.county"></el-input>
      </el-form-item>
      <el-form-item label="街道">
        <el-input v-model="form.street"></el-input>
      </el-form-item>
      <el-form-item label="小区">
        <el-input v-model="form.community"></el-input>
      </el-form-item>
      <el-form-item label="管控开始时间">
        <el-date-picker
          v-model="form.startTime"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="1-14天隔离政策">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入离开当地1-14天隔离政策"
          v-model="form.firstStage">
        </el-input>

      </el-form-item>
      <el-form-item label="14-28天隔离政策">
        <el-input
          type="textarea"
          :rows="10"
          placeholder="请输入离开当地14-28天隔离政策"
          v-model="form.secondStage">
        </el-input>

      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary">提交</el-button>

      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import {addSegregation, getSegregationById} from "@/api/segregation";

export default {
  name: "add",
  data() {
    return {
      form: {
        id: '',
        provinces: '',
        city: '',
        county: '',
        street: '',
        community: '',
        startTime: '',
        firstStage: '',
        secondStage: ''
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      }
    }
  },
  mounted() {
      this.form.id = this.$route.query.id
      this.loadData()
  },
  methods: {
    loadData() {
      getSegregationById({id: this.form.id}).then(res => {
        if (res.data !== null){
          this.form = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      const form = {
        id: this.form.id,
        provinces: this.form.provinces,
        city: this.form.city,
        county: this.form.county,
        street: this.form.street,
        community: this.form.community,
        startTime: this.form.startTime,
        firstStage: this.form.firstStage,
        secondStage: this.form.secondStage
      }
      addSegregation(form).then(res => {
        this.$message.success('添加成功')
        this.$router.push({
          path: '/segregation/list'
        })
      }).catch(err => {
        this.$message.error('添加失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
