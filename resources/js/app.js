/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import Vuetify from 'vuetify';
import VueAuth from '@websanova/vue-auth'
import auth from './auth'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router';
import VueRouter from "vue-router";
import moment from "moment";

require('./bootstrap');

window.Vue = require('vue');
Vue.use(Vuetify);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.component('app', require('./views/App.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const vuetify = new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#2196f3',
                secondary: '#03a9f4',
                accent: '#9c27b0',
                error: '#f44336',
                warning: '#ff9800',
                info: '#009688',
                success: '#4caf50'
            },
        },
    },
});

Vue.router = router;
Vue.use(VueRouter);

// Set Vue authentication
Vue.use(VueAxios, axios);
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`;
Vue.use(VueAuth, auth);

Vue.mixin({
    methods: {
        authed() {
            return this.$auth.check();
        },
        required() {
            return value => !!value || '';
        },
        isAdmin() {
            return this.$auth.user().role == 2;
        },
        log(any, any2) {
            console.log(any, any2);
        },
        formatDate(time) {
            return moment(time).format('MMMM Do, YYYY');
        },
        formatTimeRelative(time) {
            return moment(time).calendar();
        },
        formatDateSpecific(time) {
            return moment(time).format('MMMM Do YYYY, h:mm a');
        }
    }
});

const app = new Vue({
    el: '#app',
    vuetify,
    router,
});
