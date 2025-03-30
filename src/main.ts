import { createApp } from 'vue'
import '@/assets/css/reset.css'
import '@/assets/css/index.css'
import App from './App.vue'
import router from "./router";
import { loadingDirective } from "@/directives/loading/install"


const app = createApp(App);



app.use(router);
// 注册全局loading指令
app.directive("loading", loadingDirective)
app.mount('#app');
