<template>
  <div>
    <el-container>
      <el-aside width="auto"><SideNavigation :aa="CollapseData"></SideNavigation></el-aside>
      <el-container>
        <el-header><HeaderNavigation @changeCollapse="change"></HeaderNavigation></el-header>
        <el-main class="main"><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideNavigation from '@/components/sideNavigation.vue';
import HeaderNavigation from '@/components/headerNavigation.vue';
export default {
    components: {
        SideNavigation,
        HeaderNavigation
    },
    methods:{
        change(){
            this.CollapseData = !this.CollapseData;
        }
    },

    data() {
        return {
            CollapseData:false
        };
    },
};
</script>

<style lang='scss' scoped>
.el-header{
    padding: 0;
}
.main{
height: calc(100vh - 60px);
overflow: auto;
// 隐藏滚动条
-ms-overflow-style: none;
scrollbar-width: none;
&::-webkit-scrollbar {
    display: none;
}


}
</style>