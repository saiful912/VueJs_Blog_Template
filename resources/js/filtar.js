import moment from 'moment';
import Vue from 'vue';

Vue.filter('timeformat', (arg) => {
    return moment(arg).format("MM Do YYYY")
});
Vue.filter('sortlenght', function (text, lenght, suffix) {
    return text.substring(0, lenght) + suffix;
});