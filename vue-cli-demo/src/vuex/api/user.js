const user = {
    state:{
      user:""
    },
    mutations:{
      USER_INFO(state,data){
        state.user = data
      }
    },
    actions:{
      saveUserInfo({ commit },data){
        commit('USER_INFO',data)
      }
    },
    getters:{
        getName:(state)=>state.user
        
    }
  };
  export default user