/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
require('./bootstrap');
window.Vue = require('vue');
//editor support
import 'v-markdown-editor/dist/index.css';
import Editor from 'v-markdown-editor'
Vue.use(Editor);
//support vuex
import Vuex from 'vuex'

Vue.use(Vuex);
import storeData from "./store/index"

const store = new Vuex.Store(
    storeData
);
//support moment js
import {filter} from "./filtar"
//vue router
import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);
import {routes} from "./routes";
// Vue.component('example-component', require('./components/ExampleComponent'));
Vue.component('example-component', require('./components/admin/AdminMaster').default);
Vue.component('home-main', require('./components/public/PublicMaster').default);
//V-form
import {Form, HasError, AlertError} from 'vform'

window.Form = Form;
Vue.component(HasError.name, HasError);
Vue.component(AlertError.name, AlertError);
//end v-form
//sweet alert2
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

window.Swal = Swal;
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.Toast = Toast;
//end sweet alert2
const router = new VueRouter({
    routes,//short for 'routes:routes'
    mode: 'hash'
});

const app = new Vue({
    el: '#app',
    router,
    store
});
