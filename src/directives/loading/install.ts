import { createApp, type Directive } from "vue"
import Loading from "./index.vue"

export const loadingDirective: Directive = {
  beforeMount(el, binding) {
    // 确保父元素有相对定位
    if (getComputedStyle(el).position === "static") {
      el.style.position = "relative"
    }

    // 创建Loading组件实例
    const loadingApp = createApp(Loading, {
      class: binding.value?.class || "",
      text: binding.value?.text || "Loading..."
    })
    
    // 创建容器div并挂载
    const loadingContainer = document.createElement("div")
    loadingContainer.id = "loading-container"
    el.loadingContainer = loadingContainer
    el.loadingContainer.style.display = "none"
    el.appendChild(loadingContainer)
    
    // 保存实例以便后续操作
    el.loadingInstance = loadingApp.mount(loadingContainer)
  },
  updated(el, binding) {
    // 更新显示状态
    if (binding.value) {
      el.loadingContainer.style.display = "flex"
    } else {
      el.loadingContainer.style.display = "none"
    }
    
    // 更新自定义文本
    if (binding.value?.text) {
      el.loadingInstance.text = binding.value.text
    }
  },
  beforeUnmount(el) {
    // 清理工作
    if (el.loadingContainer && el.contains(el.loadingContainer)) {
      el.removeChild(el.loadingContainer)
    }
  }
}