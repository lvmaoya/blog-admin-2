import { createApp } from 'vue'
import '@/assets/css/reset.css'
import '@/assets/css/index.css'
import App from './App.vue'
import router from "./router";
import { loadingDirective } from "@/directives/loading/install"
import VueUeditorWrap from 'vue-ueditor-wrap';


const app = createApp(App);



app.use(router);
app.use(VueUeditorWrap);
// 注册全局loading指令
app.directive("loading", loadingDirective)
app.mount('#app');
