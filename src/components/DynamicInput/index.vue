

<template>
  <div class="input-wrapper">
    <el-input
      v-if="InputVisible"
      v-model="inputValue"
      :placeholder="placeholder"
      :style="'width'+width"
      size="small"
      @keyup.enter.native="inputConfirm"
      @blur="InputVisible=false;inputValue=''"
    >
      <i
        slot="suffix"
        class="el-icon-close"
        title="关闭"
        @click="InputVisible=false;inputValue=''"
      ></i>
    </el-input>
    <el-button
      v-else
      type="primary"
      size="small"
      @click="InputVisible=true"
    >
      {{content}}
    </el-button>
  </div>
</template>

<script>
export default {
  name:'DynamicInput',
  props:{
    placeholder:{
      type:String,
      default:'输入内容',
    },
    content:{
      type:String,
      default: '+Add',
    },
    width:{
      type:String,
      default:'120px',
    }
  },
  data(){
    return {
      inputValue:'',
      InputVisible:false
    }
  },
  methods:{
    inputConfirm(){
      this.$emit('input',this.inputValue)
      this.inputValue=''
      this.InputVisible=false
    }
  }

}


</script>
<style>

</style>

