<template>
  <div>
    <el-dialog :visible.sync="currentShow"></el-dialog>
  </div>
</template>

<script>
export default {
  // 引用父的变量
  props: ['show'],
  computed: {
    currentShow: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    }
  }
}
</script>
