<!--父组件中引入子组件-->
<template>
  <div>
    <!--点击时赋值-->
    <a href="javascript:;" @click="show = true">点击1</a>
    <t-dialog1 :show.sync="show"></t-dialog1>
    <br>
    <a href="javascript:;" @click="$store.state.xian = true">点击2</a>
    <t-dialog2></t-dialog2>
  </div>
</template>

<script>
import dialog1 from '@/components/Dialog1'
import dialog2 from '@/components/Dialog2'
export default {
  data () {
    return {
      show: false
    }
  },
  components: {
    't-dialog1': dialog1,
    't-dialog2': dialog2
  }
}
</script>
