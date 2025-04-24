import axios from 'axios'

export interface CommitInfo {
    sha: string
    commit: {
        author: {
            name: string
            date: string
        }
        message: string
    }
    html_url: string
    author: {
        avatar_url: string
    }
    repository?: string  // 添加仓库名称字段
}

const repos = [
    'blog-admin-2',
    'blog-server-java',
    'nuxt-web'
]

export const getGithubCommits = async (): Promise<CommitInfo[]> => {
    try {
        const promises = repos.map(repo => 
            axios.get(`https://api.github.com/repos/lvmaoya/${repo}/commits`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                },
                withCredentials: false
            })
        )

        const responses = await Promise.all(promises)
        
        // 合并所有提交记录并添加仓库信息
        const allCommits = responses.flatMap((response, index) => 
            response.data.map(commit => ({
                ...commit,
                repository: repos[index]
            }))
        )

        // 按时间排序
        return allCommits.sort((a, b) => 
            new Date(b.commit.author.date).getTime() - new Date(a.commit.author.date).getTime()
        )
    } catch (error) {
        console.error('获取提交记录失败:', error)
        return []
    }
}