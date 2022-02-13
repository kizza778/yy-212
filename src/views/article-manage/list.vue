<template>
  <div class="container">
    <el-table v-loading="loading" :data="articleList" border style="width: 100%" size="medium">
      <el-table-column prop="id" label="ID" width="110" align="center"/>
      <el-table-column prop="title" label="标题" min-width="320" align="center" />
      <el-table-column label="操作" fixed="right" min-width="230">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getAllArticle} from "@/api/article";

export default {
  data() {
    return{
      loading: false,
      // 文章列表 对象数组
      articleList: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {

    loadData(){
      this.loading = true
      getAllArticle().then(
        res => {
          this.articleList = res.data
          this.loading = false
        },
        error => {
          console.log(error)
          this.loading = false
        }
      )
    },
    // 编辑
    handleEdit(row) {
      this.$router.push({
        path: '/art-manage/edit',
        query: {
          id: row.id
        }
      })
    },
  }
}
</script>

<style>

</style>
