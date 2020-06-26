import Vue from 'vue'
import App from './App'
import navigationBar from "@/components/navigationBar.vue"
Vue.component('navigationBar',navigationBar)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
