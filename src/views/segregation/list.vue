<template>
  <div class="container">
    <el-button @click="openDialog">一键导入中高风险地区隔离政策</el-button>
    <el-table :data="segregationList" border style="width:100%" siz="medium">
      <el-table-column prop="provinces" label="省" width="110" align="center" />
      <el-table-column prop="city" label="市" width="180" align="center" />
      <el-table-column prop="county" label="区县" width="180" align="center" />
      <el-table-column prop="street" label="街道" width="220" align="center" />
      <el-table-column prop="community" label="小区" width="220" align="center" />
      <el-table-column prop="startTime" label="管控开始时间" width="110" align="center" />

      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="一键添加隔离政策" :visible.sync="dialogFormVisible">
      <el-form>
        <el-form-item label="离开中风险地区1-14天" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.midRiskFirstStage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="离开中风险地区14-28天" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.midRiskSecondStage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="离开高风险地区1-14天" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.highRiskFirstStage" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="离开高风险地区14-28天" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.highRiskSecondStage" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendSegregation">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {deleteSegregationById, getAllSegregation, keyToAddSegregation} from "@/api/segregation";
import utils from "@/utils/tui-utils";

export default {
  name: "list",
  data(){
    return{
      formLabelWidth: '180px',
      dialogFormVisible: false,
      form:{
        midRiskFirstStage: '',
        midRiskSecondStage: '',
        highRiskFirstStage: '',
        highRiskSecondStage: '',
      },
      segregationList:[],
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    loadData(){

      getAllSegregation().then(res => {
        let data1 = res.data
        data1.map(e => {
          e.startTime =  utils.formatDate('y-m-d', e.startTime, 2)
        })
        this.segregationList = data1
      }).catch(err => {
        console.log(err)
      })
    },
    deleteById(row){
      deleteSegregationById({id:row.id}).then(res =>{
        this.$message.success('删除成功！')
        this.loadData()
      }).catch(err => {
        console.log(err)
      })
    },
    handleEdit(row){
      this.$router.push({
        path: '/segregation/add',
        query: {
          id: row.id
        }
      })
    },
    openDialog(){
      this.dialogFormVisible=true
    },
    sendSegregation(){
      const params = {
        midRiskFirstStage: this.form.midRiskFirstStage,
        midRiskSecondStage: this.form.midRiskSecondStage,
        highRiskFirstStage: this.form.highRiskFirstStage,
        highRiskSecondStage: this.form.highRiskSecondStage
      }
      keyToAddSegregation(params).then(res => {
        this.$message.success('添加成功')
        this.dialogFormVisible = false
      }).catch(err => {
        this.$message.error('添加失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  .header{
    height: 50px;
    background: #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    padding-right: 10px;
  }
}
</style>
