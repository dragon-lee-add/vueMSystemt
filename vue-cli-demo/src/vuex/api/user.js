const user = {
    state:{
      user:"",
      password:""
    },
    mutations:{
      USER_INFO(state,data){
        state.user = data
      },
      USER_INFO_PWD(state,data){
        state.password = data
      }
    },
    actions:{
      saveUserInfo({ commit },data){
        commit('USER_INFO',data)
      },
      saveUserPwd({ commit },data){
        commit('USER_INFO_PWD',data)
      }
    },
    getters:{
        getName:(state)=>state.user,
        getPwd:(state)=>state.password
    }
  };
  export default user