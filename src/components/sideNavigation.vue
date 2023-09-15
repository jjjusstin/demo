<template>
  <div>
    <el-menu :default-active="computedPath" class="el-menu-vertical-demo" :collapse="aa" background-color="#545c64"
      text-color="#fff" active-text-color="#ffd04b">
      <h5 class="h51">{{ aa ? '后台' : '通用后台管理系統' }}</h5>
      <el-menu-item @click="handleSelect(item.path)" v-for="item in addSlashToTopLevelPaths" :key="item.path" :index="item.path">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>

      <!-- <el-submenu
        v-for="item in menuDataChildren()"
        :key="item.label"
        :index="item.label"
      >
        <template slot="title">
          <i :class="`el-icon-${item.icon}`"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="item in item.children"
            @click="handleSelect(item.path)"
            :key="item.path"
            :index="item.path"
            >{{ item.label }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu> -->

      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">其他</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">页面1</el-menu-item>
          <el-menu-item index="1-2">页面2</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState(['routerList']),
    addSlashToTopLevelPaths() {
      return this.routerList.map(item => {
        const newItem = { ...item };
        if (newItem.path && !newItem.path.startsWith('/')) {
          newItem.path = `/${newItem.path}`;
        }
        return newItem;
      });
    },
    computedPath() {
      // 高亮 只截取最原始的路径  比如/home/echart1  截取为 /home
      let path = `/${this.$route.path.split("/")[1]}`
      // console.log(path,this.$route.path);
      return path


    },
  },
  mounted() {
    // console.log("====================", this.routerList);

  },
  props: {
    aa: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {

    };
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },



    // menuDataNoChildren() {
    //   //筛选出没有子菜单的菜单
    //   return this.menuData.filter((item) => !item.children);
    // },
    // menuDataChildren() {
    //   //筛选出有子菜单的菜单
    //   return this.menuData.filter((item) => item.children);
    // },
    // 点击跳转路由
    handleSelect(path) {
      // 如果目标路径的第一个部分与当前路径相同，不进行跳转
      if (path == `/${this.$route.path.split("/")[1]}`) {
        return;
      } else {
        this.$router.push(path);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.h51 {
  white-space: nowrap;
}

.el-menu {
  height: 100vh;
  overflow-y: visible;
  border: none;

  h5 {
    color: #fff;
    width: 100%;
    height: 48px;
    font-weight: 400;
    font-size: 16px;
    text-align: center;
    line-height: 48px;
  }
}
</style>