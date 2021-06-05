// import Store from  './store'
export default{
  changeTheme(path){
    let action={
      type:'CHANGE_THEME',
      params:path
    }

    return action
  },
  changeMedol(params){
    let action={
      type:'CHANGE_MEDOL',
      params:params
    }

    return action
  },
  defaultOpenKey(params){
    let action={
      type:'DEFAULT_OPENKEY',
      params:params
    }
    return action
  },
  defaultSelectedKey(params){
    let action={
      type:'DEFAULT_SELECTEDKEY',
      params:params
    }

    return action
  },
  userInfo(params){
    let action={
      type:'userInfo',
      params:params
    }

    return action
  },
  authRouterList(params){
    let action={
      type:'authRouterList',
      params:params
    }

    return action
  }

}