<script setup>
defineProps({ isOpen: { type: Boolean, default: false }, title: { type: String, default: '' }, maxWidth: { type: String, default: '480px' } })
defineEmits(['close'])
</script>
<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box" :style="{ maxWidth }">
      <div class="modal-header"><h3>{{ title }}</h3><button type="button" class="close-btn" @click="$emit('close')">✕</button></div>
      <div class="modal-body"><slot /></div>
    </div>
  </div>
</template>
<style scoped>
.modal-backdrop { position: fixed; inset: 0; background: rgba(35, 23, 21, 0.55); display: flex; align-items: center; justify-content: center; padding: 16px; z-index: 999; }
.modal-box { background: #ffffff; width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md); overflow: hidden; }
.modal-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid var(--color-border); background: var(--color-bg); }
.close-btn { background: none; border: none; font-size: 16px; cursor: pointer; color: var(--color-text-muted); }
.modal-body { padding: 20px; max-height: 82vh; overflow-y: auto; }
</style>
