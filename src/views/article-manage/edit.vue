<template>
  <div id="main">
    <div>
      <el-button v-if="!cover" size="small" type="primary" icon="el-icon-upload" @click="coverUploadClick">上传封面</el-button>
      <el-button v-else type="primary" size="small" icon="el-icon-picture" @click="coverPreview">预览封面</el-button>
    </div>
    <div class="row-box">
      <div>
        <p>标题</p>
        <el-input v-model="title" placeholder="请输入文章标题"></el-input>
      </div>
      <div>
        <p>摘要</p>
        <el-input v-model="summary" placeholder="输入文章摘要" />
      </div>
    </div>
    <div>
      <el-button size="small" type="primary" @click="save(0)">发布</el-button>
      <el-button size="small" type="success" @click="save(1)">保存</el-button>
    </div>
    <mavon-editor
      ref="md"
      v-model="content"
      code-style="gradient-dark"
      style="min-height: 600px"
      :ishljs="true"
      @imgAdd="mdImgUpload"
      @change="change"
      @imgDel="mdImgDel"
      @save="save(1)"
    />
<!--    上传封面的dialog-->
    <img-upload :visible="imgUploadVisible" @dialogClose="dialogClose" @uploadSuccess="coverUploadSuccess" />

<!--    预览封面-->
    <el-dialog
      :modal="false"
      title="预览封面"
      :top="'25vh'"
      :visible.sync="coverVisible"
      width="320px"
      :before-close="coverClose"
      :lock-scroll="false"
    > <div class="cover-pre" style="text-align: center;overflow: hidden;position: relative;border-radius: 4px;">
      <img :src="cover" style="height: 100%;width: 100%;">
      <i
        class="el-icon-delete"
        style="position: absolute;bottom: 2px;right: 10px;z-index: 999;"
        @click="delCover"
      />
    </div>
    </el-dialog>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import {deleteFile, uploadImg} from "@/api/file";
import ImgUpload from "@/views/article-manage/imgUpload";
import {getArticleDetail, saveArticle} from "@/api/article";
export default {
  data(){
    return{
      id: '',
      title: '',
      summary: '',
      imgUploadVisible: false,
      coverVisible: false,
      cover: '',
      content: '',
      htmlContent: '',
    }
  },
  mounted() {
    this.id = this.$route.query.id || null
    this.loadEdit()
  },
  components:{
    ImgUpload,
    mavonEditor
  },
  methods: {
    loadEdit() {
      if (this.id){
        const params = {id:this.id}
        getArticleDetail(params).then(
          res => {
            this.title = res.data.title
            this.summary = res.data.summary
            this.cover = res.data.cover
            this.content = res.data.content
            this.htmlContent = res.data.htmlContent

          }
        )
      }
    },
    save(status){
      const data = {
        id: this.id,
        title: this.title,
        cover: this.cover,
        htmlContent: this.htmlContent,
        original: true,
        status: status,
        summary: this.summary,
        content: this.content
      }
      saveArticle(data).then(
        res => {
          this.id = res.data
          this.$message({
            message: status === 0 ? '文章发布成功': '文章保存成功',
            type:"success"
          })
        },
        error => {
          console.log(error)
        }
      )
    },
    delCover(){
      const cover = this.cover
      if (cover) {
        const params = {
          fullPath: cover
        }
        deleteFile(params).then(
          res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.coverVisible = false
            this.cover = ''
          }
        )
      }
    },
    coverClose(){
      this.coverVisible = false
    },
    coverPreview(){
      this.coverVisible = true
    },
    coverUploadSuccess(url){
      const oldCover = this.cover
      this.cover = url
      const params = {
        fullPath: oldCover
      }
      if (oldCover) {
        deleteFile(params)
      }
      this.$message({
        message: '封面上传成功',
        type: 'success'
      })
    },
    dialogClose(){
      this.imgUploadVisible = false
    },
    coverUploadClick(){
      this.imgUploadVisible = true
    },
    mdImgUpload(pos,file){
      var newData = new FormData();
      newData.append('img',file)
      uploadImg(newData).then(
        res => {
          this.$message.success('图片上传成功')
          this.$refs.md.$img2Url(pos,res.data)
        }
      )
    },
    //监控编辑器
    change(value,render) {
      this.htmlContent = render
    },
    //删除上传图片事件
    mdImgDel(file){
      if(file && file[0]){
        const params = {
          fullPath: file[0]
        }
        deleteFile(params).then(
          res => {
            if (res.code === 0) {
              this.$message.success('删除成功')
            }
          }
        ).catch(e=>{
          this.$message.error('删除失败')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
