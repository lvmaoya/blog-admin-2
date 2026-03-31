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
      next({
        path: "/login",
        query: { redirect: to.fullPath },
        replace: true
      });
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
