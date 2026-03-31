<template>
    <Breadcrumb>
        <BreadcrumbList>
            <template v-for="(crumb, index) in breadcrumbs" :key="index"
                :class="{ 'hidden md:block': index !== breadcrumbs.length - 1 }">
                <BreadcrumbItem>
                    <BreadcrumbLink v-if="index !== breadcrumbs.length - 1" :href="crumb.path">
                        {{ crumb.name }}
                    </BreadcrumbLink>
                    <BreadcrumbPage v-else>
                        {{ crumb.name }}
                    </BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" v-if="index !== breadcrumbs.length - 1"/>
            </template>
        </BreadcrumbList>
    </Breadcrumb>
</template>
<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

const route = useRoute();

const routeNameMap = {
    Console: '控制台',
    Dashboard: '首页',
    Article: '文章管理',
    ArticleList: '文章列表',
    EditArticle: '文章编辑',
    ArticleComment: '文章评论',
    ArticleCategory: '文章分类',
    Login: '登录',
    ErrorPage: '页面不存在',
};

const breadcrumbs = computed(() => {
    const crumbs = [];
    route.matched.forEach((match) => {
        const name = match.meta?.name || routeNameMap[match.name] || match.name;
        if (!name) {
            return;
        }
        crumbs.push({
            name,
            path: match.path,
        });
    });
    return crumbs;
});
</script>
