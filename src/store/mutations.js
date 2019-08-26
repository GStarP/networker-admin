import { set, toggle } from '@/utils/vuex';

export default {
  setTopBarTitle: set('topBarTitle'),
  setNavigatorShow: set('navigatorShow'),
  toggleNavigatorShow: toggle('navigatorShow'),
  setCompInfoLoading: set('compInfoLoading'),
  setRequestsLoading: set('requestsLoading')
};
