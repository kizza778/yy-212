<template>
<div class="container">
  <el-table v-loaing="loading" :data="articleList" border style="width:100%" siz="medium">
    <el-table-column prop="id" label="ID" width="110" align="center" />
    <el-table-column prop="title" label="标题" width="220" align="center" />
    <el-table-column label="操作" fixed="right" min-width="230">
      <template slot-scope="scope">
        <el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import {getAllArticleList} from "@/api/article";

export default {
  data() {
    return{
      loading: false,
      // 存储文章的数组
      articleList: [],
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    handleEdit(row){
      this.$router.push({
        path: '/art-manage/edit',
        query: {
          id: row.id
        }
      })
    },
    loadData() {
      this.loading = true
      getAllArticleList().then(
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
  }
}
</script>

<style>

</style>
