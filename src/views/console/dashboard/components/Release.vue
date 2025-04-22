<template>
    <Card class="col-span-2 h-full overflow-hidden flex flex-col">
        <CardHeader class="flex flex-row justify-between items-center">
            <div class="flex flex-col gap-y-1.5">
                <CardTitle>Commits History</CardTitle>
                <CardDescription>
                    Recent {{ commits.length }} commits in repository.
                </CardDescription>
            </div>
        </CardHeader>
        <CardContent class="flex-1 overflow-y-auto">
            <div class="space-y-4">
                <div v-for="commit in commits" :key="commit.sha" 
                    class="flex items-start space-x-4 rounded-lg border p-3 transition-all hover:bg-muted">
                    <img 
                        :src="commit.author?.avatar_url" 
                        class="h-8 w-8 rounded-full"
                        alt="avatar"
                    />
                    <div class="flex-1 space-y-1">
                        <div class="flex items-center gap-x-2">
                            <p class="text-sm font-medium">{{ commit.commit.author.name }}</p>
                            <span class="text-xs text-muted-foreground">
                                {{ new Date(commit.commit.author.date).toLocaleDateString() }}
                            </span>
                            <span class="text-xs px-2 py-0.5 bg-muted rounded-full">
                                {{ commit.repository }}
                            </span>
                        </div>
                        <p class="text-sm text-muted-foreground break-all">
                            {{ commit.commit.message }}
                        </p>
                        <a 
                            :href="commit.html_url" 
                            target="_blank"
                            class="text-xs text-blue-500 hover:underline"
                        >
                            View commit
                        </a>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { onMounted, ref } from 'vue'
import { getGithubCommits, type CommitInfo } from '@/service/github'

const commits = ref<CommitInfo[]>([])

const fetchCommits = async () => {
    try {
        commits.value = await getGithubCommits()
    } catch (error) {
        console.error('Failed to fetch commits:', error)
    }
}

onMounted(() => {
    fetchCommits()
})
</script>

<style scoped>
.break-all {
    word-break: break-all;
}
</style>