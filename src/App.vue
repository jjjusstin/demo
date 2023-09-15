<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
created(){
    this.$store.commit('addrouter',this.$router)//动态添加路由
  },
}
</script>
<style lang="scss">
#app {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
 
}
*{
  margin: 0;
  padding: 0;
}

</style>
