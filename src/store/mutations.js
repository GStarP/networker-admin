import { set, toggle } from '@/utils/vuex';

export default {
  setTopBarTitle: set('topBarTitle'),
  setNavigatorShow: set('navigatorShow'),
  toggleNavigatorShow: toggle('navigatorShow'),
  toggleCompInfoLoading: toggle('compInfoLoading'),
  toggleRequestsLoading: toggle('requestsLoading')
};
