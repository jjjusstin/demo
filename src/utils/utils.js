// 检查权限的方法
export function bind(el,binding) {
    // 获取按钮权限
    let { value } = binding
    // 获取用户按钮权限
    let btnPermissions = this.$store.state.userInfo.permissions
    console.log('utils.js checkPermission', btnPermissions)
    // 判断用户是否拥有该按钮权限
    if (btnPermissions.indexOf(value) === -1) {
      // 没有该按钮权限则移除该按钮
      el.parentNode.removeChild(el)
    }
  
}
