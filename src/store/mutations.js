import { set, toggle } from '@/utils/vuex';

export default {
  setTopBarTitle: set('topBarTitle'),
  toggleNavigatorShow: toggle('navigatorShow'),
  toggleCompInfoLoading: toggle('compInfoLoading')
};
