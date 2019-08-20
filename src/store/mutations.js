import { set, toggle } from '@/utils/vuex';

export default {
  setTopBarTitle: set('topBarTitle'),
  toggleNavigatorShow: toggle('navigatorShow'),
  setNavigatorShow: set('navigatorShow'),
  toggleCompInfoLoading: toggle('compInfoLoading')
};
