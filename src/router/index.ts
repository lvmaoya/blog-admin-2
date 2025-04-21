import { getCache } from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      redirect: "/console/dashboard",
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
          path: "dashboard",
          name: "dashboard",
          meta: { name: "首页" },

          component: () => import("@/views/console/dashboard/index.vue"),
        },
        {
          path: "todo",
          name: "todo",
          children:[
            {
              path: "list",
              name: "todoList",
              meta: { name: "待办" },
    
              component: () => import("@/views/console/todo/index.vue"),
            },
            {
              path: "statistic",
              name: "todoStatistic",
              meta: { name: "待办统计" },
    
              component: () => import("@/views/console/todo/index.vue"),
            },
          ]
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
            {
              path: "comment",
              name: "articleComment",
              meta: { name: "文章评论" },
              component: () =>
                import("@/views/console/article/comment/index.vue"),
            },
            {
              path: "category",
              name: "articleCategory",
              meta: { name: "文章分类" },
              component: () =>
                import("@/views/console/article/category/index.vue"),
            }
          ]
        },
        {
          path: "file",
          name: "file",
          children: [
            {
              path: "list",
              name: "fileList",
              meta: { name: "文件" },
              component: () => import("@/views/console/file/index.vue"),
            },
          ]
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
      // next({
      //   path: "/login",
      //   replace: true
      // });
      next();

      // 游客登录
    } else {
      if (to.path === "/console" || to.path === "/console/") {
        next({
          name: "dashboard",
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
