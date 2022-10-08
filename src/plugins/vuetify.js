import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont:  'mdi' //|| 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
  theme: {

    dark: true,
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: '#FD3592',
        secondary: '#483C6B',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
});
