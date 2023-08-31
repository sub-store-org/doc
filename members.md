<script setup>
import { data } from './data/members.data.js'
import { VPTeamMembers } from 'vitepress/theme'
</script>

# Our Team

Say hello to our awesome team.

<VPTeamMembers size="small" :members="data" />
