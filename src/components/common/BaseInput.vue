<script setup>
defineProps({ modelValue: { type: [String, Number], default: '' }, label: { type: String, default: '' }, type: { type: String, default: 'text' }, placeholder: { type: String, default: '' }, errorMessage: { type: String, default: '' }, required: { type: Boolean, default: false }, min: { type: [String, Number], default: undefined }, disabled: { type: Boolean, default: false } })
defineEmits(['update:modelValue'])
</script>
<template>
  <div class="form-group">
    <label v-if="label" class="form-label">{{ label }} <span v-if="required" class="req">*</span></label>
    <input :type="type" :value="modelValue" :placeholder="placeholder" :min="min" :disabled="disabled" :class="['form-control', { 'is-error': errorMessage }]" @input="$emit('update:modelValue',$event.target.value)" />
    <small v-if="errorMessage" class="error-text">{{ errorMessage }}</small>
  </div>
</template>
<style scoped>
.form-group { display: flex; flex-direction: column; gap: 5px; margin-bottom: 12px; }
.form-label { font-size: 12px; font-weight: 600; color: var(--color-text); }
.req { color: var(--color-danger); }
.form-control { width: 100%; padding: 9px 12px; border: 1px solid var(--color-border); border-radius: 8px; font-family: inherit; font-size: 13px; background-color: #ffffff; color: var(--color-text); outline: none; }
.form-control:focus { border-color: var(--color-secondary); }
.form-control.is-error { border-color: var(--color-danger); }
.error-text { color: var(--color-danger); font-size: 11px; font-weight: 500; }
</style>
