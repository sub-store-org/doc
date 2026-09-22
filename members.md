<script setup>
import { onMounted, ref } from 'vue'
import { VPTeamMembers } from 'vitepress/theme'

const members = ref([])
const state = ref('loading')

onMounted(async () => {
  try {
    const res = await fetch('https://api.github.com/orgs/sub-store-org/members', {
      headers: { Accept: 'application/vnd.github+json' }
    })
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`)
    const users = await res.json()
    members.value = users.map((user) => ({
      avatar: user.avatar_url,
      name: user.name || user.login,
      title: '成员',
      links: [{ icon: 'github', link: user.html_url }]
    }))
    state.value = 'done'
  } catch {
    state.value = 'failed'
  }
})
</script>

# 团队成员

Sub-Store 项目维护者。

<VPTeamMembers v-if="state === 'done'" size="small" :members="members" />
<p v-else-if="state === 'loading'">加载中…</p>
<p v-else>成员列表加载失败，请检查网络后刷新重试。</p>
