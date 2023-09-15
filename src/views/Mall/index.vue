<template>
  <div>
    商城<button class="butt" v-permission="'SuperAdmin'">权限</button>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang='scss' scoped>
// 设置按钮的文字大小
.butt{
  width: 500px;
  height: 500px;
  font-size: 200px;
}
</style>