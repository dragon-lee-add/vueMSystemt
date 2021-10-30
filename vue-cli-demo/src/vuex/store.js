//引入
import Vue from 'vue'
import Vuex from 'vuex'
import user from './api/user'

//注册
Vue.use(Vuex)

 
const store = new Vuex.Store({
    modules:{
      user
    }
  });

export default store;

