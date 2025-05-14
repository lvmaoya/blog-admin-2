import { getCache } from "@/utils/cache";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      redirect: "/console/dashboard",
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/login/index.vue"),
    },
    {
      path: "/console",
      name: "Console",
      component: () => import("@/views/console/index.vue"),

      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          meta: { name: "首页" },

          component: () => import("@/views/console/dashboard/index.vue"),
        },
        {
          path: "todo",
          name: "Todo",
          children:[
            {
              path: "list",
              name: "TodoList",
              meta: { name: "待办" },
    
              component: () => import("@/views/console/todo/index.vue"),
            },
            {
              path: "statistic",
              name: "TodoStatistic",
              meta: { name: "待办统计" },
    
              component: () => import("@/views/console/todo/index.vue"),
            },
          ]
        },
        {
          path: "article",
          name: "Article",
          children: [
            {
              path: "list",
              name: "ArticleList",
              meta: { name: "文章列表" },
              component: () =>
                import("@/views/console/article/articleList/index.vue"),
            },
            {
              path: "edit",
              name: "EditArticle",
              meta: { name: "文章编辑" },
              component: () =>
                import("@/views/console/article/editArticle/index.vue"),
            },
            {
              path: "comment",
              name: "ArticleComment",
              meta: { name: "文章评论" },
              component: () =>
                import("@/views/console/article/comment/index.vue"),
            },
            {
              path: "category",
              name: "ArticleCategory",
              meta: { name: "文章分类" },
              component: () =>
                import("@/views/console/article/category/index.vue"),
            }
          ]
        },
        {
          path: "file",
          name: "File",
          children: [
            {
              path: "list",
              name: "FileList",
              meta: { name: "文件" },
              component: () => import("@/views/console/file/index.vue"),
            },
          ]
        },

      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "ErrorPage",
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
          name: "Dashboard",
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
