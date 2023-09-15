import Vue from 'vue';
import $store from '../store'

// 创建一个自定义指令用于按钮权限控制
// 需要用到的地方直接使用v-permission="按钮权限标识"即可
Vue.directive("permission",{
    inserted(el, binding) {
      // 获取按钮权限
      const { value } = binding
      // 获取用户按钮权限
      const btnPermissions = $store.state.userInfo.permissions
      // 判断用户是否拥有该按钮权限
      if (btnPermissions.indexOf(value) === -1) {
        // 没有该按钮权限则移除该按钮
        el.parentNode.removeChild(el)
      }
    }
})