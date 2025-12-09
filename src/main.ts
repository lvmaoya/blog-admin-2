import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@/assets/css/reset.css'
import '@/assets/css/index.css'
import App from './App.vue'
import router from "./router";
import { loadingDirective } from "@/directives/loading/install"
import VueUeditorWrap from 'vue-ueditor-wrap';


const app = createApp(App);
const pinia = createPinia()

app.use(pinia)


app.use(router);
app.use(VueUeditorWrap);
// 注册全局loading指令
app.directive("loading", loadingDirective)
app.mount('#app');
const bt = import.meta.env.VITE_BUILD_TIME
const ct = import.meta.env.VITE_LAST_COMMIT_TIME
if (bt || ct) {
  const t = ct || bt
  console.log('最后修改时间:', t)
}
