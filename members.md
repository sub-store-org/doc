<script setup>
import { data } from './data/members.data.js'
import { VPTeamMembers } from 'vitepress/theme'
</script>

# 团队成员

Sub-Store 项目维护者。

<VPTeamMembers size="small" :members="data" />