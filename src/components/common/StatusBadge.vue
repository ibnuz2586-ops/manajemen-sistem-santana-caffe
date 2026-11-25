<script setup>
defineProps({ status: { type: String, required: true }, type: { type: String, default: 'info' } })
</script>
<template><span :class="['badge', `badge-${type}`]">{{ status }}</span></template>
<style scoped>
.badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; white-space: nowrap; }
.badge-success { background: var(--color-success-bg); color: var(--color-success); }
.badge-warning { background: var(--color-warning-bg); color: var(--color-warning); }
.badge-danger { background: var(--color-danger-bg); color: var(--color-danger); }
.badge-info { background: var(--color-secondary-light); color: var(--color-primary); }
</style>
