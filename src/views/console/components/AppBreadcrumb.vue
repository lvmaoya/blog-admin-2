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

const breadcrumbs = computed(() => {
    const crumbs = [];
    route.matched.forEach((match) => {
        crumbs.push({
            name: match.name,
            path: match.path,
        });
    });
    return crumbs;
});
</script>