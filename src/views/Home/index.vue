<template>
  <div>
    <el-row>
      <!-- 左边 -->
      <el-col class="leftContent" :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <div>
              <img src="@/assets/logo.png" alt="" />
            </div>

            <div>
              <div>{{ userInfo.name }}</div>
              <div>{{ userInfo.identity }}</div>
            </div>
          </div>
          <div class="text item">
            <div class="login_cnfo">
              <p>上次登录时间:<span>{{userInfo.LastLandingSite}}</span></p>
              <p>上次登录地点:<span>{{userInfo.LastLandingTime}}</span></p>
            </div>
          </div>
        </el-card>
        <el-card class="table-card">
          <div class="search">
            <el-input v-model="searchInput" placeholder="请输入姓名查询"></el-input>
            <el-button @click="searchTableData()" style="margin-left: 10px" type="primary">搜索</el-button>
            <el-button @click="searchTableData('reset')" type="primary">重置</el-button>
          </div>
          <el-table max-height="400" :data="searchData" style="width: 100%">
            <el-table-column prop="date" label="日期">
            </el-table-column>
            <el-table-column prop="name" label="姓名">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-card>

      </el-col>
      <!-- 右边 -->
      <el-col class="rightContent" :span="16">
        <div class="orderStatistics">
          <el-card v-for="(item, index) in orderStatistics" :key="index" :body-style="{ display: 'flex', padding: 0 }">
            <i class="orderIcon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
            <div class="orderText">
              <span>{{ `￥${item.value}` }}</span>
              <span>{{ item.name }}</span>
            </div>
          </el-card>
        </div>

        <el-card class="echart-router">
          <div>
            <router-link tag="span" to="/home/echart1">折线图</router-link>
            <router-link tag="span" to="/home/echart2">柱状图</router-link>
            <router-link tag="span" to="/home/echart3">饼状图</router-link>
          </div>
          <router-view></router-view>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getTableData, getOrderData, getLineChartData } from "@/api/homeApi.js";
import { mapState} from 'vuex';
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  mounted() {
    // console.log('home ---------------------',this.userInfo)
    this.getTableData()
    this.getOrderData()
  },
  data() {
    return {
      tableData: [],//表格数据
      searchData: [],//搜索后的数据
      searchInput: "",//搜索框的值
      orderStatistics: [],//订单统计
    };
  },
  methods: {

    // 获取订单统计数据
    getOrderData() {
      getOrderData().then(res => {
        this.orderStatistics = res.data.data
      })
    },
    // 获取表格数据
    getTableData() {
      getTableData().then((res) => {
        this.tableData = res.data.data
        this.searchTableData()
      })
    },
    // 筛选表格数据
    searchTableData(reset) {
      if (reset === 'reset') {
        this.searchInput = ''
      }
      this.searchData = this.tableData.filter((item) => {
        return item.name.includes(this.searchInput)
      })
    },
  },
};
</script>

<style scoped lang="scss">
.echart-router {
  height: 575px;
  margin-top: 20px;

  div:nth-child(1) {
    display: flex;
    justify-content: space-around;
    border-bottom: #adadad 1px solid;
    height: 62px;

    span {
      font-size: 20px;
      font-weight: 300;
      cursor: pointer;
      height: 40px;
      width: 150px;
      text-align: center;
      line-height: 40px;
      border: #adadad 1px solid;
      border-radius: 5px;
      font-size: 16px;
    }
  }
}

.router-link-exact-active {
  color: #ff0000;
}

.rightContent {
  padding: 0 20px;
}

.orderStatistics {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    margin-bottom: 20px;
    width: 32%;
  }
}

.orderText {

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;

  span:nth-child(1) {
    font-size: 26px;
    font-weight: 300;
  }

  span:nth-child(2) {
    font-size: 14px;
    font-weight: 300;
    color: #999999;
  }
}

.orderIcon {
  font-size: 30px;
  width: 80px;
  height: 80px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.search {
  display: flex;
}

.table-card {
  height: 480px;
  margin-top: 20px;
}

.login_cnfo {
  p {
    font-size: 14px;
    font-weight: 300;
    margin-top: 5px;
    color: #999999;

    span {
      font-size: 14px;
      margin-left: 150px;
      color: #666;
    }
  }
}

.clearfix {
  display: flex;
  align-items: center;

  img {
    border-radius: 50%;
    background: #000;
    width: 150px;
    height: 150px;
  }

  div:nth-child(1) {
    margin-right: 50px;
  }

  div:nth-child(2) div:nth-child(1) {
    font-size: 32px;
    font-weight: 300;
  }
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}</style>