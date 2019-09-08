import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    topBarTitle: undefined, // 顶部栏标题
    navigatorShow: false, // 导航栏是否显示
    compInfoLoading: false, // 公司信息是否正在加载
    requestsLoading: false // 申请信息是否正在加载
  },
  getters,
  actions,
  mutations
});
