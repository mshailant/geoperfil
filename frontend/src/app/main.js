// Polyfills
import 'es6-promise/auto'
import 'babel-polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import App from './App';
import store from '../store/index';
import router from '../router/index';
import VuesticPlugin from 'vuestic-ui/src/components/vuestic-plugin';
import VueClipboard from 'vue-clipboard2';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import Toasted from '../components/toast/CustomToast';
import '../i18n/index';
import { ColorThemePlugin } from 'vuestic-ui/src/services/ColorThemePlugin'
import VueCookies from 'vue-cookies'

// Dialogs
import VModal from 'vue-js-modal'
Vue.use(VModal, { clickToClose: false })

// VUE CONFIGURATIONS...
// global configuration for axios.
const port = 3333;
axios.defaults.baseURL = location.protocol + '//' + location.hostname + ':' + port;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'true';

// VUE IMPORTS...
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(VuesticPlugin);
Vue.use(VueClipboard);
Vue.mixin(Toasted);
Vue.use(ColorThemePlugin);
Vue.use(VueCookies);

// set default config
VueCookies.config('2h');

// ROUTER...
router.beforeEach((to, from, next) => {
    let hasToken = !!VueCookies.get('token');

    if (to.name == 'login' && hasToken) {
        return next({ name: 'dashboard' });
    }

    if ((to.name != 'login' && to.name != 'signup' && to.name != 'recover-password') && !hasToken) {
        return next({ name: 'login' });
    } else {
        store.commit('setLoading', true)
        return next()
    }
});

router.afterEach((to, from) => {
    store.commit('setLoading', false)
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
});
