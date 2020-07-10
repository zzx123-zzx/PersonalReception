import Vue from 'vue/dist/vue.esm';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict : process.env.NODE_ENV!='production',
  state:{
    loginUser:''
  },
  mutations:{
    VuexFunction(state,n){
      state.loginUser = n;
    }
  },
  actions:{
    VuexFunction(context,n){
      context.commit('VuexFunction',n);
    }
  }
})
