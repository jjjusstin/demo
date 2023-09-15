<template>
  <div>
    <div class="header-container">
      <div class="left-container">
        <el-button
          @click="changeCollapse()"
          icon="el-icon-menu">
        </el-button>
        <span>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item
              v-for="item in breadcrumbList()"
              :key="item.path"
              >{{ item.meta.title }}</el-breadcrumb-item>
            <!-- <el-breadcrumb-item
              v-for="item in breadcrumbList()"
              :key="item.path"
              :to="{ path: item.path }"
              >{{ item.meta.title }}</el-breadcrumb-item> -->
          </el-breadcrumb>
        </span>
      </div>
      <div class="right-container">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img class="userImg" src="../assets/logo.png" alt="" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="geren">个人中心</el-dropdown-item>
            <el-dropdown-item command="tuichu">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { clearDynamicRoutes } from '../router/index.js';
export default {
  mounted() {
    // console.log(this.breadcrumbList());
  },
  data() {
    return {};
  },
  methods: {
    // 面包屑数据
    breadcrumbList() {
      return this.$route.matched;
    },
    // 收起放开侧边栏
    changeCollapse() {
      this.$emit("changeCollapse");
    },
    // 点击头像回调
    handleCommand(command){
      if(command=='tuichu'){  
        localStorage.removeItem('token')
        this.$store.commit('clearPersistedData')
        clearDynamicRoutes()
        this.$router.push('/login')      
        this.$message({
          message: '退出成功',
          type: 'success',
          offset: 65
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.left-container {
  display: flex;
  align-items: center;
  span {
    margin-left: 10px;
  }
  ::v-deep .el-breadcrumb__inner.is-link {
    color: #666;
  }
  ::v-deep .el-breadcrumb__item:last-child .el-breadcrumb__inner {
    color: #fff;
  }
}
.header-container {
  height: 60px;
  background: #333;
  padding: 0 20px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userImg {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: #fff 1px solid;
}
</style>