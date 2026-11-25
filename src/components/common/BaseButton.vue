<script setup>
defineProps({ variant: { type: String, default: 'primary' }, size: { type: String, default: 'md' }, type: { type: String, default: 'button' }, disabled: { type: Boolean, default: false }, block: { type: Boolean, default: false } })
defineEmits(['click'])
</script>
<template>
  <button :type="type" :disabled="disabled" :class="['btn', `btn-${variant}`, `btn-${size}`, { 'btn-block': block }]" @click="$emit('click',$event)"><slot /></button>
</template>
<style scoped>
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 6px; font-family: inherit; font-weight: 600; border-radius: 8px; border: 1px solid transparent; cursor: pointer; transition: all 0.18s ease; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-block { width: 100%; }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.btn-md { padding: 9px 16px; font-size: 13px; }
.btn-lg { padding: 12px 20px; font-size: 14px; }
.btn-primary { background-color: var(--color-primary); color: #ffffff; }
.btn-primary:hover:not(:disabled) { background-color: var(--color-primary-hover); }
.btn-secondary { background-color: var(--color-secondary); color: #ffffff; }
.btn-danger { background-color: var(--color-danger); color: #ffffff; }
.btn-outline { background-color: #ffffff; color: var(--color-primary); border-color: var(--color-border); }
.btn-outline:hover:not(:disabled) { background-color: var(--color-secondary-light); }
</style>
