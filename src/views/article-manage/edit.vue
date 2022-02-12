<template>
  <div>
    <mavon-editor
      ref="md"
      v-model="content"
      code-style="gradient-dark"
      style="min-height: 600px"
      :ishljs="true"
      @imgAdd="mdImgUpload"
      @change="change"
      @imgDel="mdImgDel"
    />
  </div>
</template>

<script>
import { mavonEditor} from 'mavon-editor'
import {deleteFile, uploadImg} from "@/api/file";
export default {
  data() {
    return {
      content: '',
      htmlContent: '',
    }
  },
  methods: {
    mdImgDel(file){
      console.log(file)
      if (file && file[0]){
        const params = {
          fullPath:file[0]
        }
        deleteFile(params).then(
          res => {
            this.$message.success('删除成功')
          }
        ).catch( e => {
          this.$message.error('删除失败')
        })
      }
    },
    change(value,render) {
      this.htmlContent = render
    },
    mdImgUpload(pos,file){
      var newData = new FormData();
      newData.append('img',file)
      uploadImg(newData).then(
        res => {
          this.$message.success('上传成功')
          this.$refs.md.$img2Url(pos,res.data)
        }
      )
    }
  },
  components: {
    mavonEditor
  }
}
</script>

<style>

</style>
