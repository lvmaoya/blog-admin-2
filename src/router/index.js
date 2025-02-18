import {getCache} from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: "/console",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/detail",
      name: "detail",
      component: () => import("@/views/detail/index.vue"),
    },
    {
      path: "/console",
      name: "console",
      component: () => import("@/views/console/index.vue"),

      children: [
        {
          path: "home",
          name: "home",
          meta: { name: "首页" },

          component: () => import("@/views/console/home/index.vue"),
        },
        {
          path: "todo",
          name: "todo",
          meta: { name: "待办" },

          component: () => import("@/views/console/todo/index.vue"),
        },
        {
          path: "article",
          name: "article",
          children: [
            {
              path: "list",
              name: "articleList",
              meta: { name: "文章列表" },
              component: () =>
                import("@/views/console/article/articleList/index.vue"),
            },
            {
              path: "edit",
              name: "editArticle",
              meta: { name: "文章编辑" },

              component: () =>
                import("@/views/console/article/editArticle/index.vue"),
            },
          ]
        },
        {
          path: "file",
          name: "file",
          meta: { name: "文件" },

          component: () => import("@/views/console/file/index.vue"),
        },

      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "errorPage",
      component: () => import("@/views/notFound/index.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const token = getCache("token");
    if (!token) {
      
      next({
        path: "/login",
        replace: true
      });
      // 游客登录
    } else {
      if (to.path === "/console" || to.path === "/console/") {
        next({
          name: "home",
        });
      } else {
        next();
      }
    }
  } else {
    next();
  }
});
export default router;
