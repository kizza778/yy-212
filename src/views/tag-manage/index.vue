<template>
  <div class="container">
    <div
      class="header">
      <dynamic-input placeholder="输入tag名称" content="+New Tag"
                     @input="inputConfirm"/>
    </div>

    <div
      class="table_container"
      >
      <el-table
      v-loading = "loading"
      :data="tabledData"
      border
      style="width: 100%"
      >
        <el-table-column
          label="id"
          width="200"
          align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="tag名称"
          width="200px"
          align="center">
          <template slot-scope="scope">
            <span v-if="!scope.row.edit">{{scope.row.name}}</span>
            <el-input
              v-else
              v-model="tempTag.name"
              size="small"
              placeholder="请输入修改后的tag"/>
          </template>
        </el-table-column>

        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.edit"
                       type="primary"
                       size="small"
                       @click="handleEdit(scope.row)"
            >编辑</el-button>
            <span v-else>
              <el-button
              type="info"
              size="small"
              @click="scope.row.edit=false">取消</el-button>
              <el-button
              type="success"
              size="small"
              @click="saveTag">保存</el-button>
            </span>
            <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>

  </div>
</template>

<script>
import DynamicInput from '@/components/DynamicInput'
import { addTag, deleteTag } from '@/api/tag'
import {getAllTag} from '@/api/tag'
import {updateTag} from '@/api/tag'
import { title } from '@/settings'

export default {
  components: {DynamicInput},
  data(){
    return{
      isOpen:false,
      loading:false,
      tabledData:[],
      tempTag:{
        id:0,
        name:''
      }
    }
  },
  mounted() {
    this.loadData()
  },
  methods:{
    handleDelete(id){
      if(this.isOpen){
        this.$message.error('请改完再执行')
        return
      }
      this.$confirm('确认要删除该标签吗？','提示',{
        confirmButtonText:'确认',
        cancelButtonText:'取消',
        showClose:false,
        type:'warning'
      }).then(()=>{
        const params = {id:row.id}
        deleteTag(params).then(
          res=>{
            this.$message.success('删除成功')
            if(row.edit === true){
              this.isOpen =false
            }
            this.loadData()
          }
        )
      }).catch(e=>e)
    },
    saveTag(){
      if(this.tempTag.name === ''){
        this.$message.error('没有内容')
        return
      }
      const params = {id:this.tempTag.id, name: this.tempTag.name}
      updateTag(params).then(
        res=>{
          this.$message.success('更新tag成功')
          this.isOpen=false
          this.loadData()
        }
      )
    },
    handleEdit(row){
      this.tempTag.name = row.name
      this.tempTag.id = row.id
      row.edit= true
    },
    inputConfirm(val) {
      if(!val){
        this.$message.error('标签名称不能为空')
        return
      }
      const params={tagName:val}
      addTag(params).then(
        res=>{
          this.$message.success('新增tag成功！')
          //刷新页面
          this.loadData()
        }
      )
    },
    loadData(){
      this.loading=true
      getAllTag().then(
        res =>{
          const recodes = res.data
          recodes.forEach(r=>{r.edit = false})
          console.log(recodes)

          this.tabledData = recodes
          this.loading = false
      },error=>{
          this.loading = false
        }
      )
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
